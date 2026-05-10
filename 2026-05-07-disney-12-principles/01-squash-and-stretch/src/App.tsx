import { motion } from 'framer-motion';
import type { TargetAndTransition, Transition } from 'framer-motion';

const baseTransition: Transition = {
  duration: 1.4,
  repeat: Infinity,
  ease: 'easeInOut',
};

export default function App() {
  return (
    <main className="stage">
      <Lane
        label="Without"
        animate={{ y: [0, -120, 0] }}
        transition={{ ...baseTransition, times: [0, 0.5, 1] }}
      />
      <Lane
        label="With Squash & Stretch"
        animate={{
          y: [0, -120, 0, 0],
          scaleY: [1, 1.25, 0.55, 1],
          scaleX: [1, 0.85, 1.45, 1],
        }}
        transition={{ ...baseTransition, times: [0, 0.5, 0.78, 1] }}
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
