// src/components/common/SplitText.tsx
// ReactBits-inspired kinetic SplitText animation using motion/react and spring physics.
// Staggers each character with smooth 3D elevation and spring settling.

import React from 'react';
import { motion } from 'motion/react';
import { springs } from '../../lib/motion-tokens';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.035,
}) => {
  const letters = Array.from(text);

  return (
    <span className={`inline-block overflow-hidden ${className}`} aria-label={text}>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 32, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            ...springs.gentle,
            delay: delay + index * stagger,
          }}
          className="inline-block transform-gpu will-change-transform"
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};
