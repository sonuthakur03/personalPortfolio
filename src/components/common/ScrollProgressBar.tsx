// src/components/common/ScrollProgressBar.tsx
// Pop Brutalist Scroll Progress Bar:
// - 4px height in vivid Pop Pink (#FF6FB5)
// - Crisp bottom black border (border-b-2 border-[#111111])
// - Tactile and responsive to viewport scroll

import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[4px] z-50 pointer-events-none bg-transparent">
      <div
        className="h-full bg-[#FF6FB5] border-b-2 border-r-2 border-[#111111] transition-all duration-75 ease-out shadow-[0_2px_0_#111111]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
