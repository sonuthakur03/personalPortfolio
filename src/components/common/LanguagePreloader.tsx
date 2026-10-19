// src/components/common/LanguagePreloader.tsx
// Pop Brutalist Multilingual Intro Preloader:
// - Vibrant Pop Yellow (#FFE14D) canvas with bold Archivo Black display typography
// - Pop Pink (#FF6FB5) punch dot and Space Mono language badge
// - Clean brutalist curtain slide-up reveal
// - Audio cues on tick and completion

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
  const isSkip =
    typeof window !== 'undefined' &&
    (window.location.search.includes('skipLoader') ||
      sessionStorage.getItem('sonu_preloader_seen') === 'true');
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(isSkip);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleComplete = useCallback(() => {
    document.body.style.overflow = 'unset';
    sounds.playSuccess();
  }, []);

  const triggerExit = useCallback(() => {
    try {
      sessionStorage.setItem('sonu_preloader_seen', 'true');
    } catch {
      // ignore
    }
    setIsExiting(true);
    sounds.playClick(880);

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
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < GREETINGS.length) {
        setIndex(currentIndex);
      } else {
        clearInterval(interval);
        timerRef.current = setTimeout(() => {
          triggerExit();
        }, 300);
      }
    }, 260);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearInterval(interval);
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
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#090A0D] text-white pointer-events-auto select-none overflow-hidden border-b-[6px] border-[#1C1E24]"
          initial={{ y: '0%', opacity: 1 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* Center Greeting Word in Archivo Black */}
          <motion.div
            className="relative z-10 flex items-center justify-center min-h-[110px]"
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.12, ease: motionTokens.easing.easeOut }}
              >
                <h1
                  className={`font-archivoBlack uppercase tracking-tight text-white flex items-center ${
                    currentWord.isJap
                      ? 'text-4xl sm:text-6xl md:text-7xl'
                      : 'text-5xl sm:text-7xl md:text-8xl'
                  }`}
                >
                  <span>{currentWord.text}</span>
                  {/* Clean white minimal dot */}
                  <span className="inline-block w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white border-[3px] border-[#333338] ml-4 shadow-[2px_2px_0_#000]" />
                </h1>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Subtitle / Language indicator badge */}
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
                className="flex items-center gap-2 px-4 py-1.5 bg-[#14151B] text-white border-2 border-neutral-700 shadow-[3px_3px_0_#000] text-xs font-spaceMono font-bold uppercase"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
              >
                <span className="w-2 h-2 rounded-full bg-[#17A34A] border border-[#111111]" />
                <span className="tracking-wider">
                  Sonu Thakur · {currentWord.lang}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Quick skip hint */}
          <div className="absolute bottom-6 z-10 text-[11px] font-spaceMono font-bold text-neutral-400 bg-black/60 px-2.5 py-1 border border-neutral-800 uppercase tracking-wider">
            [ESC TO SKIP]
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
