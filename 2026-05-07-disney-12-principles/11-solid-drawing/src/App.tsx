import { motion } from 'framer-motion';

export default function App() {
  return (
    <main className="stage">
      <Lane label="Flat" hint="2D 평면 회전" perspective={false} />
      <Lane label="Solid" hint="perspective + rotateY" perspective={true} />
    </main>
  );
}

function Lane({ label, hint, perspective }: { label: string; hint: string; perspective: boolean }) {
  return (
    <div className="lane">
      <p className="label">
        {label}
        <span className="hint">{hint}</span>
      </p>
      <div className="stage-3d" style={{ perspective: perspective ? '600px' : 'none' }}>
        <motion.span
          className="letter"
          animate={
            perspective
              ? { rotateY: [0, 360] }
              : { rotate: [0, 360] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          o
        </motion.span>
      </div>
    </div>
  );
}
