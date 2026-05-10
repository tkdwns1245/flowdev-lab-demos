import { motion } from 'framer-motion';
import type { TargetAndTransition, Transition } from 'framer-motion';

const baseTransition: Transition = {
  duration: 1.6,
  repeat: Infinity,
  ease: 'easeInOut',
};

export default function App() {
  return (
    <main className="stage">
      <Lane
        label="Without"
        animate={{ y: [0, -130, 0] }}
        transition={{ ...baseTransition, times: [0, 0.4, 1] }}
      />
      <Lane
        label="With Anticipation"
        animate={{
          y: [0, 18, -130, 0, 0],
          scaleY: [1, 0.85, 1.18, 0.6, 1],
          scaleX: [1, 1.15, 0.88, 1.4, 1],
        }}
        transition={{ ...baseTransition, times: [0, 0.22, 0.62, 0.84, 1] }}
      />
    </main>
  );
}

interface LaneProps {
  label: string;
  animate: TargetAndTransition;
  transition: Transition;
}

function Lane({ label, animate, transition }: LaneProps) {
  return (
    <div className="lane">
      <p className="label">{label}</p>
      <div className="ground">
        <motion.span
          className="letter"
          style={{ originY: 1 }}
          animate={animate}
          transition={transition}
        >
          o
        </motion.span>
      </div>
    </div>
  );
}
