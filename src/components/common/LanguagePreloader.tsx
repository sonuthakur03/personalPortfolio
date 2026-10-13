// src/components/common/LanguagePreloader.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { motionTokens } from '../../lib/motion-tokens';
import { sounds } from '../../utils/soundEffects';

interface GreetingWord {
  text: string;
  lang: string;
  isJap?: boolean;
}

const GREETINGS: GreetingWord[] = [
  { text: 'Hello', lang: 'English' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'नमस्ते', lang: 'Nepali' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: 'こんにちは', lang: 'Japanese', isJap: true },
  { text: 'Hallå', lang: 'Swedish' },
  { text: 'Guten Tag', lang: 'German' },
  { text: 'ज्वजलपा', lang: 'Newari' },
  { text: 'Namaste', lang: 'Nepali' },
];

export const LanguagePreloader: React.FC = () => {
  const isSkip = typeof window !== 'undefined' && window.location.search.includes('skipLoader');
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(isSkip);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleComplete = useCallback(() => {
    document.body.style.overflow = 'unset';
    sounds.playSuccess();
  }, []);

  const triggerExit = useCallback(() => {
    setIsExiting(true);
    sounds.playClick(880);

    // Short beat for text to fade before full curtain curve fade-up
    setTimeout(() => {
      setIsFinished(true);
    }, 200);
  }, []);

  useEffect(() => {
    if (isSkip) {
      document.body.style.overflow = 'unset';
      return;
    }

    // Lock body scroll during boot loader
    document.body.style.overflow = 'hidden';

    let currentIndex = 0;
    // Slower, comfortable reading pace (340ms per word)
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < GREETINGS.length) {
        setIndex(currentIndex);
      } else {
        clearInterval(interval);
        // Comfortable pause on final "Namaste" before upward curve fade
        timerRef.current = setTimeout(() => {
          triggerExit();
        }, 420);
      }
    }, 340);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        clearInterval(interval);
        if (timerRef.current) clearTimeout(timerRef.current);
        triggerExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [triggerExit, isSkip]);

  const currentWord = GREETINGS[index] || GREETINGS[0];

  return (
    <AnimatePresence onExitComplete={handleComplete}>
      {!isFinished && (
        <motion.div
          key="language-preloader-curtain"
          role="status"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black text-white pointer-events-auto select-none overflow-hidden"
          initial={{
            y: '0%',
            opacity: 1,
            borderBottomLeftRadius: '0vw',
            borderBottomRightRadius: '0vw',
          }}
          animate={{
            y: '0%',
            opacity: 1,
            borderBottomLeftRadius: '0vw',
            borderBottomRightRadius: '0vw',
          }}
          exit={{
            // Fades up while bottom-left and bottom-right radiuses increase to 50vw to form a circle on the bottom
            y: '-105%',
            opacity: [1, 1, 0.85, 0],
            borderBottomLeftRadius: ['0vw', '35vw', '50vw'],
            borderBottomRightRadius: ['0vw', '35vw', '50vw'],
            transition: {
              duration: 0.85,
              times: [0, 0.45, 1],
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* Center Greeting Word with smooth, relaxed transitions */}
          <motion.div
            className="relative z-10 flex items-center justify-center min-h-[90px]"
            animate={{
              opacity: isExiting ? 0 : 1,
              y: isExiting ? -30 : 0,
            }}
            transition={{ duration: 0.2, ease: motionTokens.easing.easeOut }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWord.text}
                className="flex items-center"
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                }}
                transition={{
                  duration: 0.15,
                  ease: motionTokens.easing.easeOut,
                }}
              >
                <h1
                  className={`font-display font-medium tracking-tight text-white flex items-center ${
                    currentWord.isJap
                      ? 'text-3xl sm:text-5xl md:text-6xl'
                      : 'text-4xl sm:text-6xl md:text-7xl'
                  }`}
                >
                  <span>{currentWord.text}</span>
                  {/* Clean minimal monochrome white dot */}
                  <span className="inline-block w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-white ml-3 sm:ml-4 opacity-90" />
                </h1>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Subtitle / Language indicator badge in pure monochrome */}
          <motion.div
            className="absolute bottom-16 sm:bottom-20 z-10 flex items-center"
            animate={{
              opacity: isExiting ? 0 : 1,
              y: isExiting ? -15 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWord.lang}
                className="flex items-center gap-2 text-xs font-mono text-white/40"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="tracking-widest uppercase">
                  Sonu Thakur · {currentWord.lang}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Quick skip hint */}
          <div className="absolute bottom-6 z-10 text-[10px] font-mono text-white/20 tracking-wider">
            [ESC TO SKIP]
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
