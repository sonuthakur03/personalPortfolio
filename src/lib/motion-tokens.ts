// src/lib/motion-tokens.ts
// Motion foundation tokens and spring physics configurations

export const motionTokens = {
  duration: {
    instant: 0.1,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    hero: 0.8,
    loader: 1.0,
  },
  easing: {
    smooth: [0.25, 0.1, 0.25, 1] as const,
    snappy: [0.4, 0, 0.2, 1] as const,
    easeOut: [0, 0, 0.2, 1] as const,
    easeInOut: [0.4, 0, 0.2, 1] as const,
    circOut: [0, 0.55, 0.45, 1] as const,
    circInOut: [0.85, 0, 0.15, 1] as const,
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  scale: {
    subtle: 0.98,
    press: 0.96,
    pop: 1.04,
    dot: 1.2,
    expanded: 1.15,
  },
} as const;

export const springs = {
  snappy: { type: 'spring' as const, stiffness: 400, damping: 30 },
  gentle: { type: 'spring' as const, stiffness: 200, damping: 25 },
  bouncy: { type: 'spring' as const, stiffness: 500, damping: 15 },
  smooth: { type: 'spring' as const, stiffness: 300, damping: 28 },
  liquid: { type: 'spring' as const, stiffness: 180, damping: 22 },
} as const;
