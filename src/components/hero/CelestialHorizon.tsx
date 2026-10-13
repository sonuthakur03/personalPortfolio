// src/components/hero/CelestialHorizon.tsx
// Celestial Horizon Arc & Stardust Canvas inspired by rameshwarbhagwat.me
// Features: Ambient star particle physics, glowing curved eclipse horizon arc with radial gradients and soft blurs.

import React, { useEffect, useRef } from 'react';

export const CelestialHorizon: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle interactive stardust canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate subtle twinkling stardust particles
    const starCount = Math.min(85, Math.floor(window.innerWidth / 18));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.75), // Upper 75% above horizon
      radius: Math.random() * 1.3 + 0.4,
      baseAlpha: Math.random() * 0.4 + 0.15,
      twinkleSpeed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.1,
    }));

    let clock = 0;
    const render = () => {
      clock += 0.016;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const starColor = isDark ? '255, 255, 255' : '15, 23, 42';

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height * 0.75;
        if (star.y > height * 0.75) star.y = 0;

        const twinkle = Math.sin(clock * star.twinkleSpeed * 60 + star.phase);
        const alpha = Math.max(0.08, star.baseAlpha + twinkle * 0.25);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor}, ${alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      {/* 1. Stardust Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
        aria-hidden="true"
      />

      {/* 2. Signature Arched Horizon Glow Curve (rameshwarbhagwat.me) */}
      <div className="absolute bottom-[-18px] sm:bottom-[-28px] md:bottom-[-36px] left-0 w-full h-[360px] sm:h-[460px] md:h-[520px] z-10 pointer-events-none overflow-visible">
        <svg
          className="absolute bottom-0 inset-x-0 w-full h-full z-10"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Celestial Sky Flare Radial Gradients */}
            <radialGradient id="skyGlow" cx="50%" cy="77%" r="42%">
              <stop offset="0%" stopColor="#d35400" stopOpacity="0.92" />
              <stop offset="15%" stopColor="#b23b00" stopOpacity="0.75" />
              <stop offset="35%" stopColor="#802000" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#3b0800" stopOpacity="0.16" />
              <stop offset="85%" stopColor="#120100" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="coreGlow" cx="50%" cy="77%" r="14%">
              <stop offset="0%" stopColor="#ff9100" stopOpacity="1" />
              <stop offset="20%" stopColor="#d35400" stopOpacity="0.88" />
              <stop offset="55%" stopColor="#802000" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b0800" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff3c00" stopOpacity="0" />
              <stop offset="25%" stopColor="#ff5500" stopOpacity="0.65" />
              <stop offset="45%" stopColor="#ffb088" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="55%" stopColor="#ffb088" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#ff5500" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#ff3c00" stopOpacity="0" />
            </linearGradient>

            <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.2" />
            </filter>
            <filter id="lineBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>

            <clipPath id="skyClip">
              <path d="M 0 560 Q 600 360, 1200 560 L 1200 0 L 0 0 Z" />
            </clipPath>
          </defs>

          {/* Masked Sky Gradient Field */}
          <g clipPath="url(#skyClip)">
            <rect x="0" y="0" width="1200" height="600" fill="url(#skyGlow)" />
            <rect x="0" y="0" width="1200" height="600" fill="url(#coreGlow)" />
          </g>

          {/* Outer Radiant Soft Arc */}
          <path
            d="M 0 560 Q 600 360, 1200 560"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="22"
            strokeLinecap="round"
            filter="url(#softBlur)"
            opacity="0.38"
          />

          {/* Razor-Sharp Horizon Arc */}
          <path
            d="M 0 560 Q 600 360, 1200 560"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#lineBlur)"
          />

          {/* Secondary Sub-Horizon Luminous Filament */}
          <path
            d="M 70 560 Q 600 425, 1130 560"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#lineBlur)"
            opacity="0.28"
          />
        </svg>
      </div>
    </div>
  );
};
