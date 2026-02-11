import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Countdown.css';

const TARGET_DATE = new Date('2026-02-14T00:00:00');

function getTimeLeft() {
  const diff = TARGET_DATE - new Date();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const pad = (n) => String(n).padStart(2, '0');

const labels = { days: 'Días', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' };

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, staggerChildren: 0.15 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Countdown({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeLeft();
      if (!t) {
        clearInterval(interval);
        onComplete();
      } else {
        setTimeLeft(t);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (!timeLeft) return null;

  return (
    <motion.div
      className="countdown"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 className="countdown-title" variants={itemVariants}>
        Algo especial se acerca...
      </motion.h1>
      <motion.p className="countdown-subtitle" variants={itemVariants}>
        Un mensaje para alguien muy especial
      </motion.p>

      <motion.div className="countdown-timer" variants={itemVariants}>
        {Object.entries(timeLeft).map(([key, value]) => (
          <motion.div
            className="time-block"
            key={key}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <motion.span
              className="time-number"
              key={`${key}-${value}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {pad(value)}
            </motion.span>
            <span className="time-label">{labels[key]}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="skip-btn"
        variants={itemVariants}
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onComplete}
      >
        No puedo esperar...
      </motion.button>
    </motion.div>
  );
}
