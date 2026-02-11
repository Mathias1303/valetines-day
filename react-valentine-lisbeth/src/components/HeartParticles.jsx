import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { loadHeartShape } from '@tsparticles/shape-heart';

export default function HeartParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
    await loadHeartShape(engine);
  }, []);

  const options = {
    fullScreen: { enable: true, zIndex: 0 },
    fpsLimit: 60,
    particles: {
      number: {
        value: 25,
        density: { enable: true, area: 900 },
      },
      color: {
        value: ['#f48fb1', '#f8bbd0', '#e1bee7', '#ce93d8', '#d1c4e9', '#dbb3d4'],
      },
      shape: {
        type: 'heart',
      },
      opacity: {
        value: { min: 0.15, max: 0.4 },
        animation: {
          enable: true,
          speed: 0.6,
          sync: false,
        },
      },
      size: {
        value: { min: 4, max: 14 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: { min: 0.4, max: 1.2 },
        direction: 'top',
        outModes: {
          top: 'out',
          bottom: 'out',
          left: 'out',
          right: 'out',
        },
        drift: { min: -0.5, max: 0.5 },
      },
      rotate: {
        value: { min: 0, max: 360 },
        direction: 'random',
        animation: {
          enable: true,
          speed: 3,
          sync: false,
        },
      },
      wobble: {
        enable: true,
        distance: 15,
        speed: 3,
      },
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
    },
    detectRetina: true,
  };

  return <Particles id="heart-particles" init={particlesInit} options={options} />;
}
