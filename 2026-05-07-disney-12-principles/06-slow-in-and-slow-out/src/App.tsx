import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

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
  return (
    <div className="lane">
      <p className="label">
        {label}
        <span className="hint">{hint}</span>
      </p>
      <div className="track">
        <motion.span
          className="letter"
          animate={{ x: 180 }}
          transition={transition}
        >
          o
        </motion.span>
      </div>
    </div>
  );
}
