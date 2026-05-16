import { useAnimationFrame } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

type EaseFn = (t: number) => number;

interface Easing {
  label: string;
  hint: string;
  accent: string;
  ease: EaseFn;
}

// 표준 cubic-bezier 평가기 (CSS easing과 동일한 곡선)
function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number): EaseFn {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  const solveX = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i += 1) {
      const dx = sampleX(t) - x;
      if (Math.abs(dx) < 1e-5) return t;
      const d = sampleDX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= dx / d;
    }
    return t;
  };

  return (x: number) => sampleY(solveX(Math.min(1, Math.max(0, x))));
}

const easings: Easing[] = [
  {
    label: 'linear',
    hint: '등속 — 기계적',
    accent: '#64748b',
    ease: (t) => t,
  },
  {
    label: 'ease-in',
    hint: '천천히 출발 → 가속',
    accent: '#38bdf8',
    ease: cubicBezier(0.42, 0, 1, 1),
  },
  {
    label: 'ease-out',
    hint: '빠르게 출발 → 감속',
    accent: '#a78bfa',
    ease: cubicBezier(0, 0, 0.58, 1),
  },
  {
    label: 'ease-in-out',
    hint: '양 끝이 부드러움 (slow in & out)',
    accent: '#fbbf24',
    ease: cubicBezier(0.42, 0, 0.58, 1),
  }
];

// 잔상 점: 일정 "시간" 간격마다 찍는다 → 간격이 넓을수록 그 구간이 빠름
const GHOSTS = 13;
const DOT = 16;
const MOVE_MS = 2000; // 한 방향 이동 시간
const HOLD_MS = 900; // 끝에서 잠깐 정지 (잔상 읽을 시간)
const PERIOD = MOVE_MS + HOLD_MS;
const PAD = 10; // .track 좌우 패딩(styles.css와 일치)
// spring step 응답 최대 오버슈트 = exp(-ζπ/√(1-ζ²)), ζ=0.5 → 약 1.16배.
// 그만큼만 오른쪽에 예약하면 다른 레인의 목표선도 우측에 가깝게 통일된다.
const SPRING_PEAK = 1.2;

export default function App() {
  const [elapsed, setElapsed] = useState(0);
  useAnimationFrame((t) => setElapsed(t % PERIOD));

  // 모든 레인이 공유하는 진행도 0→1 (이동 구간에서만 증가, 끝에서 1 유지)
  const phase = Math.min(1, elapsed / MOVE_MS);

  return (
    <main className="stage">
      <header className="intro">
        <h1>Slow In and Slow Out</h1>
        <p>
          다섯 점이 <strong>같은 시간·같은 거리</strong>를 이동합니다. 잔상은 시간
          등간격 — <strong>좁으면 느리고 넓으면 빠릅니다.</strong>
        </p>
      </header>

      {easings.map((e) => (
        <Lane key={e.label} {...e} phase={phase} />
      ))}
    </main>
  );
}

function Lane({ label, hint, accent, ease, phase }: Easing & { phase: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(240);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      // 점이 움직일 수 있는 최대 가로 공간 (좌우 패딩·점 지름 제외)
      const available = el.clientWidth - DOT - PAD * 2;
      // spring이 최대 오버슈트해도 트랙 안에 머물도록 목표 거리를 나눈다
      setDistance(Math.max(60, available / SPRING_PEAK));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 시간 등간격으로 샘플링한 잔상 위치 (스페이싱 차트)
  const ghosts = useMemo(
    () =>
      Array.from({ length: GHOSTS }, (_, i) => ease(i / (GHOSTS - 1)) * distance),
    [ease, distance],
  );

  const x = ease(phase) * distance;

  return (
    <div className="lane">
      <p className="label" style={{ color: accent }}>
        {label}
        <span className="hint">{hint}</span>
      </p>
      <div className="track" ref={trackRef}>
        <span className="start-line" />
        <span
          className="goal-line"
          style={{ transform: `translateX(${distance + DOT / 2}px)` }}
        />
        {ghosts.map((gx, i) => (
          <span
            key={i}
            className="ghost"
            style={{
              transform: `translateX(${gx}px)`,
              background: accent,
              opacity: 0.16 + (i / (GHOSTS - 1)) * 0.16,
            }}
          />
        ))}
        <span
          className="dot"
          style={{
            transform: `translateX(${x}px)`,
            background: accent,
            boxShadow: `0 0 16px ${accent}`,
          }}
        />
      </div>
    </div>
  );
}