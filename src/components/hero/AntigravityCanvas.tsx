// src/components/hero/AntigravityCanvas.tsx
// Ambient hero canvas featuring an interactive connecting dots (constellation) network.
// Removes geometric grid lines and features dynamic node links that connect to neighboring
// dots and reactively tether to the user's mouse cursor with theme-reactive aesthetics.

import React, { useEffect, useRef } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
}

export const AntigravityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = usePortfolioContent();
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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

    const isDark = theme === 'dark';

    // Particle density scaled by screen area
    const particleCount = Math.min(85, Math.floor((width * height) / 16000));
    const particles: Particle[] = [];

    // Curated theme-aware dot palette
    const colors = isDark
      ? [
          'rgba(34, 211, 238, ',  // Cyan
          'rgba(56, 189, 248, ',  // Sky
          'rgba(168, 85, 247, ',  // Purple
          'rgba(52, 211, 153, ',  // Emerald
        ]
      : [
          'rgba(14, 165, 233, ',  // Sky 500
          'rgba(99, 102, 241, ',  // Indigo 500
          'rgba(15, 23, 42, ',    // Slate 900
          'rgba(20, 184, 166, ',  // Teal 500
        ];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 1.5 + 1.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        baseRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const maxDistance = 145;
    const mouseDistance = 185;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move particle with smooth drift
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around boundaries
        if (p1.x < -10) p1.x = width + 10;
        if (p1.x > width + 10) p1.x = -10;
        if (p1.y < -10) p1.y = height + 10;
        if (p1.y > height + 10) p1.y = -10;

        // Mouse interaction: pulse size when near cursor
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouseDistance) {
          p1.radius = p1.baseRadius * (1 + (1 - mdist / mouseDistance) * 0.8);
        } else {
          p1.radius = p1.baseRadius;
        }

        // Render dot with subtle soft glow
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `${p1.color}0.75)` : `${p1.color}0.65)`;
        ctx.fill();

        // Connect to neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.22 : 0.16);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(15, 23, 42, ${alpha * 0.75})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        if (mdist < mouseDistance && mouse.x > 0) {
          const malpha = (1 - mdist / mouseDistance) * (isDark ? 0.38 : 0.28);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark
            ? `rgba(34, 211, 238, ${malpha})`
            : `rgba(14, 165, 233, ${malpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        background: theme === 'dark' ? '#09090b' : '#f7f6f2',
      }}
    />
  );
};
