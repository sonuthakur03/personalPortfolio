// src/components/hero/AntigravityCanvas.tsx
// Antigravity ambient background canvas featuring subtle geometric grid lines,
// weightless floating wireframe shapes (cubes, spheres, octahedrons), glowing code nodes,
// and upward-drifting stardust particles that react smoothly to cursor movements.

import React, { useEffect, useRef } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  rotation: number;
  rotSpeed: number;
  type: 'cube' | 'octa' | 'circle' | 'dot';
  hue: number;
}

export const AntigravityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = usePortfolioContent();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

    // Generate floating antigravity shapes
    const count = Math.min(38, Math.floor((width * height) / 32000));
    const particles: Particle[] = [];

    const types: Particle['type'][] = ['cube', 'octa', 'circle', 'dot'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.25 + Math.random() * 0.45), // Always drifting upward
        size: 8 + Math.random() * 18,
        opacity: 0.15 + Math.random() * 0.35,
        baseOpacity: 0.15 + Math.random() * 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        type: types[Math.floor(Math.random() * types.length)],
        hue: isDark ? 260 + Math.random() * 40 : 200 + Math.random() * 30,
      });
    }

    // Helper: draw wireframe isometric cube
    const drawCube = (x: number, y: number, s: number, rot: number, strokeStyle: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = 1;

      const r = s * 0.65;
      const h = s * 0.55;

      ctx.beginPath();
      // Hexagon outer profile
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = r * Math.cos(angle);
        const py = h * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      // Inside Y lines to create 3D isometric cube
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, h);
      ctx.moveTo(0, 0);
      ctx.lineTo(r * Math.cos((Math.PI / 3) * 2 - Math.PI / 6), h * Math.sin((Math.PI / 3) * 2 - Math.PI / 6));
      ctx.moveTo(0, 0);
      ctx.lineTo(r * Math.cos((Math.PI / 3) * 4 - Math.PI / 6), h * Math.sin((Math.PI / 3) * 4 - Math.PI / 6));
      ctx.stroke();

      ctx.restore();
    };

    // Helper: draw wireframe octahedron
    const drawOcta = (x: number, y: number, s: number, rot: number, strokeStyle: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = 1;

      const r = s * 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(r, 0);
      ctx.lineTo(0, r);
      ctx.lineTo(-r, 0);
      ctx.closePath();
      ctx.moveTo(0, -r);
      ctx.lineTo(0, r);
      ctx.moveTo(-r, 0);
      ctx.lineTo(r, 0);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid
      const gridSize = 64;
      const gridStroke = isDark ? 'rgba(255, 255, 255, 0.025)' : 'rgba(0, 0, 0, 0.035)';
      ctx.strokeStyle = gridStroke;
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let gx = 0; gx < width; gx += gridSize) {
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
      }
      for (let gy = 0; gy < height; gy += gridSize) {
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
      }
      ctx.stroke();

      // Draw floating antigravity shapes
      particles.forEach((p) => {
        // Drift upwards
        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.rotSpeed;

        // Wrap around when moving past top
        if (p.y < -40) {
          p.y = height + 40;
          p.x = Math.random() * width;
        }
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;

        // Subtle mouse repulsion/attraction
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 1) {
          const factor = (1 - dist / 180) * 0.4;
          p.x += (dx / dist) * factor;
          p.y += (dy / dist) * factor;
        }

        const strokeColor = isDark
          ? `rgba(192, 132, 252, ${p.opacity * 0.6})`
          : `rgba(15, 23, 42, ${p.opacity * 0.35})`;

        if (p.type === 'cube') {
          drawCube(p.x, p.y, p.size, p.rotation, strokeColor);
        } else if (p.type === 'octa') {
          drawOcta(p.x, p.y, p.size, p.rotation, strokeColor);
        } else if (p.type === 'circle') {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        } else {
          // Glowing node dot
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.15, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? `rgba(56, 189, 248, ${p.opacity})` : `rgba(14, 165, 233, ${p.opacity * 0.7})`;
          ctx.shadowColor = isDark ? '#38bdf8' : '#0284c7';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }
      });

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
