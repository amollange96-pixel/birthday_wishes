import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, FastForward, Check, RotateCcw } from 'lucide-react';
import { BIRTHDAY_LETTER } from '../data/content';

export const BirthdayLetterSection: React.FC = () => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [displayedTextIndex, setDisplayedTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Combine full letter into single text or paragraphs
  const fullText = BIRTHDAY_LETTER.paragraphs.join('\n\n');

  useEffect(() => {
    if (!isLetterOpen) {
      setDisplayedTextIndex(0);
      setIsTyping(false);
      setIsFinished(false);
      return;
    }

    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      index += 2;
      if (index >= fullText.length) {
        setDisplayedTextIndex(fullText.length);
        setIsTyping(false);
        setIsFinished(true);
        clearInterval(interval);
      } else {
        setDisplayedTextIndex(index);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isLetterOpen, fullText]);

  const handleSkipTyping = () => {
    setDisplayedTextIndex(fullText.length);
    setIsTyping(false);
    setIsFinished(true);
  };

  const handleReset = () => {
    setDisplayedTextIndex(0);
    setIsFinished(false);
    setIsTyping(true);
  };

  const currentSlice = fullText.slice(0, displayedTextIndex);
  const paragraphsToRender = currentSlice.split('\n\n');

  return (
    <section id="letter" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative">
      {/* Warm ambient candle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest font-medium mb-4">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>From My Heart To Yours</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight mb-4 text-balance">
          My Birthday Letter to You
        </h2>

        <p className="font-sans text-rose-200/75 text-sm sm:text-base font-light">
          Words written straight from the heart, meant only for you to read.
        </p>
      </div>

      {/* Sealed Envelope / Unfolding Mechanism */}
      {!isLetterOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center"
        >
          <div
            onClick={() => setIsLetterOpen(true)}
            className="group cursor-pointer relative w-72 sm:w-80 h-48 sm:h-52 rounded-2xl bg-gradient-to-tr from-[#381432] via-[#4d1c42] to-[#2b0e27] border border-rose-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-[0_25px_60px_rgba(244,114,182,0.3)]"
          >
            {/* Wax Seal in center */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-amber-600 shadow-[0_0_25px_rgba(251,191,36,0.5)] flex items-center justify-center border-2 border-amber-200/60 mb-3 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-white fill-white drop-shadow" />
            </div>

            <p className="font-handwriting text-2xl text-rose-100 tracking-wide">
              For Gauravi ❤️
            </p>
            <span className="text-xs text-rose-300/70 font-light mt-1">
              Click to break the wax seal & read
            </span>

            {/* Corner Stamp */}
            <div className="absolute top-4 right-4 text-[10px] font-mono uppercase text-amber-200/60 border border-amber-400/30 px-2 py-0.5 rounded">
              CONFIDENTIAL · AMOL
            </div>
          </div>
        </motion.div>
      ) : (
        /* The Unfolded Realistic Cream Letter Paper */
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative letter-paper rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 text-zinc-900 border border-amber-300/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
        >
          {/* Top Controls: Skip / Replay */}
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-4 mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Personal Letter · 2 November</span>
            </div>

            <div className="flex items-center gap-3">
              {isTyping && (
                <button
                  onClick={handleSkipTyping}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-amber-900 bg-amber-200/60 hover:bg-amber-200 rounded-full transition-colors"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Read Full Letter</span>
                </button>
              )}
              {isFinished && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay</span>
                </button>
              )}
            </div>
          </div>

          {/* Salutation with handwritten font */}
          <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-950 font-bold mb-6 tracking-wide">
            {BIRTHDAY_LETTER.salutation}
          </h3>

          {/* Letter Body */}
          <div className="space-y-4 font-serif text-base sm:text-lg text-zinc-800 leading-relaxed min-h-[300px]">
            {paragraphsToRender.map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}

            {/* Typing cursor blink */}
            {isTyping && (
              <span className="inline-block w-1.5 h-4 bg-rose-600 animate-pulse ml-1 align-baseline" />
            )}
          </div>

          {/* Closing & Signature */}
          {displayedTextIndex > fullText.length * 0.7 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-12 pt-6 border-t border-amber-900/10 text-right"
            >
              <p className="font-serif italic text-sm text-zinc-600">
                {BIRTHDAY_LETTER.closing}
              </p>
              <p className="font-handwriting text-3xl sm:text-4xl text-rose-900 font-bold mt-1 tracking-wide">
                {BIRTHDAY_LETTER.signature}
              </p>
            </motion.div>
          )}

          {/* Gold Wax Seal Stamp in corner */}
          <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-2 text-amber-800/60 text-xs font-serif italic">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-600/40 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-amber-700 fill-amber-700/30" />
            </div>
            <span>Sealed with love</span>
          </div>
        </motion.div>
      )}
    </section>
  );
};
