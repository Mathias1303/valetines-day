import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeartParticles from './components/HeartParticles';
import Countdown from './components/Countdown';
import Reveal from './components/Reveal';
import Celebration from './components/Celebration';
import './App.css';

// Fases: 'countdown' -> 'reveal' -> 'celebration'
export default function App() {
  const [phase, setPhase] = useState('countdown');

  const goToReveal = useCallback(() => setPhase('reveal'), []);
  const goToCelebration = useCallback(() => setPhase('celebration'), []);

  return (
    <>
      <HeartParticles />
      <div className="app">
        <AnimatePresence mode="wait">
          {phase === 'countdown' && (
            <Countdown key="countdown" onComplete={goToReveal} />
          )}
          {phase === 'reveal' && (
            <Reveal key="reveal" onAccept={goToCelebration} />
          )}
          {phase === 'celebration' && (
            <Celebration key="celebration" />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
