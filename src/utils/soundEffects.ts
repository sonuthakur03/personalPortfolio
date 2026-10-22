// src/utils/soundEffects.ts
// Sound effects disabled per user request (completely silent, 0 audio latency, 0 AudioContext consumption)

class SoundManager {
  constructor() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sonu_portfolio_sound_enabled', 'false');
      } catch {
        // Ignore localStorage restrictions
      }
    }
  }

  public get enabled(): boolean {
    return false;
  }

  public toggle(): boolean {
    return false;
  }

  // Silent no-op stubs preserving call-site type-safety
  public playClick(_freq?: number): void {
    void _freq;
  }
  public playHover(_freq?: number): void {
    void _freq;
  }
  public playKey(): void {}
  public playSuccess(): void {}
}

export const sounds = new SoundManager();

