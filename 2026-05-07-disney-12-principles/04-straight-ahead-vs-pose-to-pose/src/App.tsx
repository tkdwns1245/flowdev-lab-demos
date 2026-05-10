import { motion, useTime, useTransform } from 'framer-motion';

export default function App() {
  return (
    <main className="stage">
      <PoseToPose />
      <StraightAhead />
    </main>
  );
}

function PoseToPose() {
  return (
    <div className="lane">
      <p className="label">
        Pose to Pose
        <span className="hint">keyframes 정의 → 보간</span>
      </p>
      <div className="ground">
        <motion.span
          className="letter"
          animate={{ y: [0, -100, 0, -60, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          o
        </motion.span>
      </div>
      <pre className="code">{`animate={{ y: [0, -100, 0, -60, 0] }}`}</pre>
    </div>
  );
}

function StraightAhead() {
  const time = useTime();
  const y = useTransform(time, (t) => {
    const phase = (t / 1000) % 2;
    return -Math.abs(Math.sin(phase * Math.PI * 1.5)) * 80;
  });

  return (
    <div className="lane">
      <p className="label">
        Straight Ahead
        <span className="hint">매 프레임 직접 계산</span>
      </p>
      <div className="ground">
        <motion.span className="letter" style={{ y }}>
          o
        </motion.span>
      </div>
      <pre className="code">{`y = -|sin(t * π * 1.5)| * 80`}</pre>
    </div>
  );
}
