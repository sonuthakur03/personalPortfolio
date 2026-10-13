// src/components/common/ScrollReveal.tsx
// Reusable scroll-triggered fade-up animation wrapper using motion/react whileInView.
// Ensures consistent, professional entrance animations across all portfolio sections.

import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before animation starts (for stagger) */
  delay?: number;
  /** Y offset to animate from (default 32px) */
  yOffset?: number;
  /** How much of element must be visible to trigger (default 0.1) */
  threshold?: number;
  /** Whether to only animate once (default true) */
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 32,
  threshold = 0.1,
  once = true,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration: 0.65,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};
