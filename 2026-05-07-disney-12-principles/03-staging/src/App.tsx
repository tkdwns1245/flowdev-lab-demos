import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

const wiggle = {
  rotate: [0, -10, 0, 10, 0],
  y: [0, -8, 0, -8, 0],
};

const wiggleTransition: Transition = {
  duration: 2,
  repeat: Infinity,
  ease: 'easeInOut',
};

type Variant = 'cluttered' | 'spotlight' | 'negative';

export default function App() {
  return (
    <main className="stage">
      <Lane label="Cluttered" hint="시선이 떠돈다" variant="cluttered" />
      <Lane label="Spotlight" hint="빛이 시선을 모은다" variant="spotlight" />
      <Lane label="Negative space" hint="비움이 시선을 끈다" variant="negative" />
    </main>
  );
}

function Lane({ label, hint, variant }: { label: string; hint: string; variant: Variant }) {
  return (
    <div className="lane">
      <p className="label">
        {label}
        <span className="hint"> · {hint}</span>
      </p>
      <div className={`scene scene-${variant}`}>
        {variant === 'cluttered' && <ClutterDots />}
        {variant === 'spotlight' && <div className="spotlight" />}
        <motion.span
          className={`letter ${variant === 'negative' ? 'letter-offset' : ''}`}
          animate={wiggle}
          transition={wiggleTransition}
        >
          o
        </motion.span>
      </div>
    </div>
  );
}

function ClutterDots() {
  return (
    <>
      {Array.from({ length: 36 }).map((_, i) => (
        <span
          key={i}
          className="dot"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            background: ['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#a855f7'][i % 5],
            width: `${6 + (i % 4) * 3}px`,
            height: `${6 + (i % 4) * 3}px`,
          }}
        />
      ))}
    </>
  );
}
