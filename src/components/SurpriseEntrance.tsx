import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface SurpriseEntranceProps {
  onOpen: () => void;
}

export const SurpriseEntrance: React.FC<SurpriseEntranceProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenSurprise = () => {
    if (isOpening) return;
    setIsOpening(true);

    if (soundEnabled) {
      romanticAudio.play();
    }

    // Trigger romantic confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#fbbf24', '#fbcfe8', '#e879f9'],
    });

    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        onOpen();
      }, 700);
    }, 900);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="entrance-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#14061a] via-[#240a27] to-[#0f0413] px-4 text-center select-none"
        >
          {/* Ambient radial glows */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-rose-600/10 blur-[120px] pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

          {/* Sound preference switch */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs text-rose-200/80 bg-rose-950/40 border border-rose-500/20 rounded-full hover:bg-rose-900/50 hover:text-rose-100 transition-all backdrop-blur-md"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  <span>Music enabled</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Music muted</span>
                </>
              )}
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-md w-full flex flex-col items-center relative z-10"
          >
            {/* Sparkle badge */}
            <div className="flex items-center gap-2 text-rose-300 text-xs tracking-widest uppercase font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>A Personal Birthday Surprise</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-rose-100 mb-3 tracking-wide">
              Hey, Gauravi... <span className="text-rose-400 font-sans">❤️</span>
            </h1>

            <p className="font-sans text-rose-200/80 text-base sm:text-lg mb-10 font-light max-w-xs">
              Someone has a little surprise for you.
            </p>

            {/* Interactive Envelope with Glowing Seal */}
            <motion.div
              animate={
                isOpening
                  ? { scale: 1.08, rotate: [0, -1, 1, 0] }
                  : { y: [0, -6, 0] }
              }
              transition={
                isOpening
                  ? { duration: 0.8 }
                  : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }
              className="relative w-64 sm:w-72 h-44 mb-10 cursor-pointer group"
              onClick={handleOpenSurprise}
            >
              {/* Envelope Body */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#3a1532] via-[#481c3e] to-[#2b0e27] border border-rose-300/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden">
                {/* Envelope fold shadows */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/20" />
                <div
                  className="absolute inset-0 border-t-[88px] border-t-rose-950/40 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent transition-transform duration-700 origin-top"
                  style={{
                    transform: isOpening ? 'rotateX(180deg)' : 'rotateX(0deg)',
                  }}
                />

                {/* Wax Seal */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-amber-600 shadow-[0_0_25px_rgba(251,191,36,0.6)] flex items-center justify-center border-2 border-amber-200/60"
                >
                  <Heart className="w-6 h-6 text-white fill-white drop-shadow" />
                </motion.div>

                {/* Tiny stamp corner */}
                <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest text-amber-200/60 border border-amber-400/30 px-1.5 py-0.5 rounded">
                  2 NOV
                </div>
              </div>

              {/* Glowing aura beneath envelope */}
              <div className="absolute -inset-2 bg-gradient-to-r from-rose-600/20 via-amber-400/20 to-rose-600/20 rounded-3xl blur-xl -z-10 group-hover:opacity-100 transition-opacity opacity-70" />
            </motion.div>

            {/* Action button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isOpening}
              onClick={handleOpenSurprise}
              className="relative px-8 py-3.5 rounded-full text-base font-medium text-white shadow-[0_0_30px_rgba(244,114,182,0.4)] bg-gradient-to-r from-rose-500 via-pink-600 to-rose-700 hover:from-rose-400 hover:to-pink-600 transition-all flex items-center gap-2 border border-rose-300/40"
            >
              <span>{isOpening ? 'Unwrapping Memories...' : 'Open Your Surprise 💌'}</span>
            </motion.button>

            <span className="text-xs text-rose-300/50 mt-4 tracking-wide font-light">
              Made with all my heart, just for you
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
