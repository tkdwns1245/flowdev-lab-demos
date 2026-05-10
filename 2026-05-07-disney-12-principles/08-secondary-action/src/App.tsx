import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

const baseTransition: Transition = {
  duration: 1.4,
  repeat: Infinity,
  ease: 'easeInOut',
};

export default function App() {
  return (
    <main className="stage">
      <Lane label="Primary only" hint="점프만" withSecondary={false} />
      <Lane label="With secondary" hint="별 회전 + 그림자 변화" withSecondary={true} />
    </main>
  );
}

function Lane({ label, hint, withSecondary }: { label: string; hint: string; withSecondary: boolean }) {
  return (
    <div className="lane">
      <p className="label">
        {label}
        <span className="hint">{hint}</span>
      </p>
      <div className="ground">
        {withSecondary && (
          <motion.div
            className="shadow"
            animate={{ scale: [1, 0.5, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ ...baseTransition, times: [0, 0.5, 1] }}
          />
        )}
        <motion.div
          className="rig"
          animate={{ y: [0, -110, 0] }}
          transition={{ ...baseTransition, times: [0, 0.5, 1] }}
        >
          <span className="letter">o</span>
          {withSecondary && (
            <motion.span
              className="star"
              animate={{ rotate: [0, 360], y: [0, -6, 0] }}
              transition={{
                rotate: { duration: 1.4, repeat: Infinity, ease: 'linear' },
                y: { ...baseTransition, times: [0, 0.5, 1] },
              }}
            >
              ✦
            </motion.span>
          )}
        </motion.div>
      </div>
    </div>
  );
}
