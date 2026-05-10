import { motion } from 'framer-motion';

export default function App() {
  return (
    <main className="stage">
      <Lane label="Without follow-through" hasTrail={false} />
      <Lane label="With follow-through" hasTrail={true} />
    </main>
  );
}

function Lane({ label, hasTrail }: { label: string; hasTrail: boolean }) {
  return (
    <div className="lane">
      <p className="label">{label}</p>
      <div className="track">
        <motion.div
          className="rig"
          animate={{ x: [-90, 90, 90, -90, -90] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.4, 0.5, 0.9, 1],
          }}
        >
          <span className="letter">b</span>
          <motion.span
            className="trail"
            animate={
              hasTrail
                ? { rotate: [-25, 25, 25, -25, -25] }
                : { rotate: [0, 0] }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.34, 1.56, 0.64, 1],
              times: [0, 0.55, 0.65, 1.0, 1],
            }}
            style={{ transformOrigin: '50% 100%' }}
          >
            ★
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
