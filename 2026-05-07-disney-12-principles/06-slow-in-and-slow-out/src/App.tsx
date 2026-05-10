import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Easing {
  label: string;
  hint: string;
  transition: Transition;
}

const easings: Easing[] = [
  {
    label: 'linear',
    hint: '기계적, 죽은 느낌',
    transition: { duration: 1.6, repeat: Infinity, repeatType: 'reverse', ease: 'linear' },
  },
  {
    label: 'ease-in-out',
    hint: '시작·끝이 부드러움',
    transition: { duration: 1.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
  },
  {
    label: 'cubic-bezier',
    hint: '(0.4, 0, 0.2, 1)',
    transition: {
      duration: 1.6,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: [0.4, 0, 0.2, 1],
    },
  },
  {
    label: 'spring',
    hint: '물리 기반, 살아있음',
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 8,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
];

const LETTER_WIDTH = 38;
const TRACK_PADDING = 16;
// spring(stiffness:80, damping:8)이 약 21% 오버슈트하므로 그만큼 여유를 둔다
const OVERSHOOT_BUFFER = 1.25;

export default function App() {
  return (
    <main className="stage">
      {easings.map((e) => (
        <Lane key={e.label} {...e} />
      ))}
    </main>
  );
}

function Lane({ label, hint, transition }: Easing) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(120);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const available = el.clientWidth - LETTER_WIDTH - TRACK_PADDING;
      setDistance(Math.max(40, available / OVERSHOOT_BUFFER));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lane">
      <p className="label">
        {label}
        <span className="hint">{hint}</span>
      </p>
      <div className="track" ref={trackRef}>
        <motion.span
          className="letter"
          animate={{ x: distance }}
          transition={transition}
        >
          o
        </motion.span>
      </div>
    </div>
  );
}
