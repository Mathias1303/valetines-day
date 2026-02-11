import { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Celebration.css';

const CONFETTI_COLORS = [
  '#f48fb1', '#ce93d8', '#e1bee7', '#f8bbd0',
  '#d1c4e9', '#b39ddb', '#f3a4bf', '#c5cae9',
];

function ConfettiPiece({ delay, color, shape }) {
  const left = `${Math.random() * 100}%`;
  const duration = Math.random() * 2.5 + 2.5;
  const rotation = Math.random() * 720;
  const drift = (Math.random() - 0.5) * 200;

  const shapeClass = shape === 0 ? 'c-rect' : shape === 1 ? 'c-circle' : 'c-ribbon';

  return (
    <motion.div
      className={`confetti-piece ${shapeClass}`}
      style={{ left, background: color }}
      initial={{ top: '-3%', opacity: 1, rotate: 0, x: 0 }}
      animate={{
        top: '105%',
        opacity: [1, 1, 0],
        rotate: rotation,
        x: drift,
      }}
      transition={{ duration, delay, ease: 'linear' }}
    />
  );
}

function GlowRing({ delay }) {
  return (
    <motion.div
      className="glow-ring"
      initial={{ width: 0, height: 0, opacity: 0.7 }}
      animate={{ width: 450, height: 450, opacity: 0 }}
      transition={{ duration: 1.6, delay, ease: 'easeOut' }}
    />
  );
}

const heartPath =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

export default function Celebration() {
  // Generar confetti
  const confetti = [];
  for (let i = 0; i < 40; i++) {
    confetti.push(
      <ConfettiPiece
        key={`c1-${i}`}
        delay={i * 0.08}
        color={CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]}
        shape={Math.floor(Math.random() * 3)}
      />
    );
  }
  // Segunda oleada
  for (let i = 0; i < 20; i++) {
    confetti.push(
      <ConfettiPiece
        key={`c2-${i}`}
        delay={1.8 + i * 0.1}
        color={CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]}
        shape={Math.floor(Math.random() * 3)}
      />
    );
  }

  return (
    <>
      {/* Confetti */}
      <div className="confetti-container">{confetti}</div>

      {/* Glow rings */}
      <div className="glow-container">
        <GlowRing delay={0} />
        <GlowRing delay={0.5} />
        <GlowRing delay={1} />
      </div>

      {/* Contenido */}
      <motion.div
        className="celebration"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
      >
        {/* Tres corazones SVG */}
        <div className="celebration-hearts">
          {[0, 1, 2].map((i) => (
            <motion.svg
              key={i}
              className={`celeb-heart ${i === 1 ? 'celeb-heart-main' : ''}`}
              viewBox="0 0 24 24"
              animate={{
                scale: [1, 1.12, 1],
                rotate: [0, i === 1 ? 0 : i === 0 ? -4 : 4, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              {i === 1 ? (
                <>
                  <defs>
                    <linearGradient id="celebGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f48fb1" />
                      <stop offset="100%" stopColor="#ce93d8" />
                    </linearGradient>
                  </defs>
                  <path d={heartPath} fill="url(#celebGrad)" />
                </>
              ) : (
                <path d={heartPath} fill="#e1bee7" />
              )}
            </motion.svg>
          ))}
        </div>

        <motion.h1
          className="celebration-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Te quiero mucho.
        </motion.h1>

        <motion.p
          className="celebration-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          Este 14 de febrero será muy especial.
        </motion.p>
      </motion.div>
    </>
  );
}
