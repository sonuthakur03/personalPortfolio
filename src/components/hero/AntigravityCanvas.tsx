// src/components/hero/AntigravityCanvas.tsx
// Pop Brutalist Interactive Canvas Backdrop:
// - Replaces blurry blobs with crisp, tactile Pop Brutalist geometric artifacts
// - Subtle 28px dot-matrix graph paper background
// - Floating brutalist stamps, stickers, and telemetry badges with spring mouse parallax
// - Vibrant Pop Brutalist colors (#FFE14D, #FF6FB5, #7DFFA6, #7C9BFF, #B9C8FF)
// - Hard 2px/3px black borders, zero-blur drop shadows (3px 3px 0 #111)
// - GPU-accelerated, pointer-events-none, z-0

import React, { useEffect } from 'react';
import { motion, useSpring } from 'motion/react';

export const AntigravityCanvas: React.FC = () => {
  // Smooth spring mouse tracking for subtle interactive parallax
  const springX = useSpring(0, { stiffness: 45, damping: 25 });
  const springY = useSpring(0, { stiffness: 45, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const normY = (e.clientY / innerHeight) * 2 - 1; // -1 to 1
      springX.set(normX * 18);
      springY.set(normY * 15);
    };

    const handleMouseLeave = () => {
      springX.set(0);
      springY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [springX, springY]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Pop Brutalist Dot-Matrix Grid Backdrop */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(#111111 2px, transparent 2px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 2. Parallax Floating Pop Artifacts Container */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative w-full h-full min-h-full"
      >
        {/* ARTIFACT 1: Floating Star Badge (Upper-Left Projects section) */}
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [-3, -1, -3],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[3%] left-[3%] hidden lg:inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFE14D] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0_#111111] font-spaceMono font-bold text-xs uppercase"
        >
          <span className="text-[#FF6FB5]">★</span>
          <span>FULL-STACK MERN</span>
        </motion.div>

        {/* ARTIFACT 2: Geometric Plus Marker (Upper-Right) */}
        <motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[8%] right-[5%] hidden md:flex items-center justify-center w-8 h-8 text-[#111111] dark:text-white/40 font-archivoBlack text-2xl"
        >
          +
        </motion.div>

        {/* ARTIFACT 3: ACID Safe Stamp (Mid-Left / Journey section) */}
        <motion.div
          animate={{
            y: [0, 16, 0],
            rotate: [4, 6, 4],
          }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[28%] left-[2%] hidden xl:inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#7DFFA6] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0_#111111] font-spaceMono font-bold text-xs uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-[#111111]" />
          <span>ACID-SAFE TRANSACTIONS</span>
        </motion.div>

        {/* ARTIFACT 4: Gemini SDK Pill (Mid-Right / Education) */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [-2, -5, -2],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-[42%] right-[3%] hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FF6FB5] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0_#111111] font-archivoBlack text-xs uppercase tracking-wider"
        >
          <span>GEMINI AI SDK</span>
          <span className="text-[10px] bg-white px-1.5 py-0.5 border border-[#111111]">PRO</span>
        </motion.div>

        {/* ARTIFACT 5: IdeaX Hackathon FinTech Winner Stamp (Lower-Left / Skills) */}
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [2, 0, 2],
          }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-[62%] left-[4%] hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFE14D] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0_#111111] font-spaceMono font-bold text-xs uppercase"
        >
          <span>🏆</span>
          <span>IDEAX HACKATHON WINNER (FINTECH)</span>
        </motion.div>

        {/* ARTIFACT 6: TU Rank 1 Stamp (Lower-Right / Certifications) */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [-4, -1, -4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[78%] right-[4%] hidden xl:inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFB38A] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0_#111111] font-spaceMono font-bold text-xs uppercase"
        >
          <span>🎓</span>
          <span>TU BCA 3.63 CGPA</span>
        </motion.div>

        {/* ARTIFACT 7: Decorative Geometric Squares (Lower Section) */}
        <motion.div
          animate={{
            rotate: [0, 45, 90, 135, 180],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[88%] left-[8%] hidden md:block w-7 h-7 border-2 border-[#111111] dark:border-white/30 bg-[#B9C8FF]/30"
        />
      </motion.div>
    </div>
  );
};
