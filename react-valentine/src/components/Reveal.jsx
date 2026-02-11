import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Reveal.css';

const LOVE_MESSAGE =
  'Desde que llegaste a mi vida, cada día es más bonito. ' +
  'Tu sonrisa hace que mis días sean más felices y tu amor me hace sentir ' +
  'la persona mas feliz del mundo.';

const NO_MESSAGES = ['¿Segura?', '¡Piénsalo bien!', '¡No me hagas esto!', '¡Dale, di que sí!'];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, staggerChildren: 0.3 },
  },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.5 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Reveal({ onAccept }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showQuestion, setShowQuestion] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [noPos, setNoPos] = useState(null);
  const [noText, setNoText] = useState('No');
  const noCount = useRef(0);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < LOVE_MESSAGE.length) {
        setDisplayedText(LOVE_MESSAGE.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowQuestion(true), 500);
        setTimeout(() => setShowButtons(true), 1300);
      }
    }, 38);
    return () => clearInterval(interval);
  }, []);

  const escapeNo = useCallback(() => {
    const maxX = window.innerWidth - 140;
    const maxY = window.innerHeight - 60;
    setNoPos({
      left: Math.random() * maxX,
      top: Math.random() * maxY,
    });
    setNoText(NO_MESSAGES[noCount.current % NO_MESSAGES.length]);
    noCount.current++;
  }, []);

  return (
    <motion.div
      className="reveal"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Corazón SVG */}
      <motion.div variants={childVariants}>
        <motion.svg
          className="heart-svg"
          viewBox="0 0 24 24"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <defs>
            <linearGradient id="rvlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f48fb1" />
              <stop offset="100%" stopColor="#ce93d8" />
            </linearGradient>
          </defs>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#rvlGrad)"
          />
        </motion.svg>
      </motion.div>

      {/* Nombre */}
      <motion.h1 className="reveal-name" variants={childVariants}>
        Dianita
      </motion.h1>

      {/* Mensaje con typewriter */}
      <motion.p className="reveal-message" variants={childVariants}>
        {displayedText}
        <span className="cursor">|</span>
      </motion.p>

      {/* Pregunta */}
      <AnimatePresence>
        {showQuestion && (
          <motion.h2
            className="reveal-question"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ¿Quieres ser mi San Valentín?
          </motion.h2>
        )}
      </AnimatePresence>

      {/* Botones */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            className="reveal-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              className="btn-yes"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAccept}
            >
              ¡Sí, quiero!
            </motion.button>

            <motion.button
              className="btn-no"
              style={
                noPos
                  ? { position: 'fixed', left: noPos.left, top: noPos.top, zIndex: 999 }
                  : {}
              }
              onMouseEnter={escapeNo}
              onClick={escapeNo}
              whileTap={{ scale: 0.9 }}
            >
              {noText}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
