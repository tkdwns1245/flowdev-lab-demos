import { motion } from 'framer-motion';

const speeds = [
  { label: '0.3s', hint: '경쾌, 가벼움', duration: 0.3 },
  { label: '0.8s', hint: '편안, 자연스러움', duration: 0.8 },
  { label: '1.5s', hint: '무거움, 묵직함', duration: 1.5 },
];

export default function App() {
  return (
    <main className="stage">
      {speeds.map((s) => (
        <Lane key={s.label} {...s} />
      ))}
    </main>
  );
}

function Lane({ label, hint, duration }: { label: string; hint: string; duration: number }) {
  return (
    <div className="lane">
      <p className="label">
        {label}
        <span className="hint">{hint}</span>
      </p>
      <div className="ground">
        <motion.span
          className="letter"
          style={{ originY: 1 }}
          animate={{
            y: [0, -100, 0, 0],
            scaleY: [1, 1.2, 0.6, 1],
            scaleX: [1, 0.9, 1.4, 1],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatDelay: 0.4,
            times: [0, 0.5, 0.8, 1],
            ease: 'easeInOut',
          }}
        >
          o
        </motion.span>
      </div>
    </div>
  );
}
