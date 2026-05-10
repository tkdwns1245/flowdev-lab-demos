import { motion, useTime, useTransform } from 'framer-motion';

export default function App() {
  return (
    <main className="stage">
      <Lane label="Linear path" hint="죽은 직선" arc={false} />
      <Lane label="Arc path" hint="살아있는 호" arc={true} />
    </main>
  );
}

function Lane({ label, hint, arc }: { label: string; hint: string; arc: boolean }) {
  const time = useTime();
  const t = useTransform(time, (ms) => ((ms / 2400) % 1));
  const x = useTransform(t, (v) => -120 + v * 240);
  const y = useTransform(t, (v) => (arc ? -Math.sin(v * Math.PI) * 90 : 0));

  return (
    <div className="lane">
      <p className="label">
        {label}
        <span className="hint">{hint}</span>
      </p>
      <div className="track">
        <svg className="path" viewBox="-130 -100 260 120" preserveAspectRatio="none">
          {arc ? (
            <path d="M -120 0 Q 0 -180 120 0" stroke="rgba(148,163,184,0.25)" strokeDasharray="4 4" fill="none" />
          ) : (
            <line x1="-120" y1="0" x2="120" y2="0" stroke="rgba(148,163,184,0.25)" strokeDasharray="4 4" />
          )}
        </svg>
        <motion.span className="dot" style={{ x, y }} />
      </div>
    </div>
  );
}
