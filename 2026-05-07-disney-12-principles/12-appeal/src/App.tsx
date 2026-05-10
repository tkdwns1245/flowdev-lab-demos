import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

const cycle = 2;

const boringTransition: Transition = {
  duration: cycle,
  repeat: Infinity,
  ease: 'linear',
};

const appealingTransition: Transition = {
  duration: cycle,
  repeat: Infinity,
  ease: 'easeInOut',
};

export default function App() {
  return (
    <main className="stage">
      <BoringLane />
      <AppealingLane />
    </main>
  );
}

function BoringLane() {
  return (
    <div className="lane">
      <p className="label">
        Boring
        <span className="hint">linear · y만 변화</span>
      </p>
      <div className="ground">
        <motion.div
          className="rig"
          animate={{ y: [0, -100, 0] }}
          transition={{ ...boringTransition, times: [0, 0.5, 1] }}
        >
          <span className="letter">o</span>
        </motion.div>
      </div>
    </div>
  );
}

function AppealingLane() {
  return (
    <div className="lane">
      <p className="label">
        Appealing
        <span className="hint">spring · squash · 별 · 그림자 · 기울임</span>
      </p>
      <div className="ground">
        <motion.div
          className="shadow"
          animate={{ scale: [1, 0.5, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ ...appealingTransition, times: [0, 0.5, 1] }}
        />
        <motion.div
          className="rig"
          style={{ originY: 1 }}
          animate={{
            y: [0, 12, -110, 0, 0],
            scaleY: [1, 0.85, 1.18, 0.6, 1],
            scaleX: [1, 1.15, 0.88, 1.4, 1],
            rotate: [0, -3, 5, -2, 0],
          }}
          transition={{ ...appealingTransition, times: [0, 0.18, 0.55, 0.82, 1] }}
        >
          <span className="letter">o</span>
          <motion.span
            className="star"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: cycle, repeat: Infinity, ease: 'linear' }}
          >
            ✦
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
