import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

const baseTransition: Transition = {
  duration: 1.2,
  repeat: Infinity,
  ease: 'easeInOut',
};

export default function App() {
  return (
    <main className="stage">
      <Lane label="Subtle" hint="rotate ±8°, jump 4px" rotate={8} jump={-4} />
      <Lane label="Exaggerated" hint="rotate ±25°, jump 20px" rotate={25} jump={-20} />
    </main>
  );
}

function Lane({ label, hint, rotate, jump }: { label: string; hint: string; rotate: number; jump: number }) {
  return (
    <div className="lane">
      <p className="label">
        {label}
        <span className="hint">{hint}</span>
      </p>
      <div className="ground">
        <motion.span
          className="letter"
          animate={{
            rotate: [0, -rotate, rotate, -rotate, 0],
            y: [0, jump, jump, jump, 0],
          }}
          transition={{ ...baseTransition, times: [0, 0.25, 0.5, 0.75, 1] }}
        >
          o
        </motion.span>
      </div>
    </div>
  );
}
