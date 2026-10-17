import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Flame, Sparkles, Heart, Gift } from 'lucide-react';

export const BirthdayCakeInteractive: React.FC = () => {
  const [isBlown, setIsBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    setWishMade(true);

    // Multi-stage confetti celebration
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f472b6', '#fb7185', '#fbbf24', '#fbcfe8', '#38bdf8', '#c084fc'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative text-center">
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#2a0e30]/80 to-[#18061c]/90 border border-rose-500/20 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>A Special Birthday Wish</span>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-3">
          Make a Secret Wish, Gauravi <span className="text-rose-400 font-sans">✨</span>
        </h3>

        <p className="font-sans text-rose-200/75 text-sm sm:text-base font-light max-w-md mx-auto mb-10">
          Close your eyes, think of the happiest thing your heart longs for, and tap the candle to blow it out.
        </p>

        {/* Interactive Candle Graphic */}
        <div className="flex flex-col items-center justify-center my-6">
          <div
            onClick={handleBlowCandle}
            className="cursor-pointer group relative flex flex-col items-center"
            title="Tap candle to blow it out!"
          >
            {/* Candle Flame or Smoke */}
            <div className="h-14 flex items-center justify-center">
              {!isBlown ? (
                <motion.div
                  animate={{
                    scale: [1, 1.15, 0.95, 1.05, 1],
                    y: [0, -2, 1, -1, 0],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative flex items-center justify-center"
                >
                  {/* Outer flame glow */}
                  <div className="absolute w-10 h-10 rounded-full bg-amber-400/30 blur-md animate-pulse" />
                  {/* Flame shape */}
                  <div className="w-5 h-9 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_20px_#f59e0b] group-hover:scale-125 transition-transform" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 0], y: -30, x: [0, 5, -5, 0] }}
                  transition={{ duration: 2 }}
                  className="flex flex-col items-center text-zinc-400 text-xs font-serif italic"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin mb-1" />
                  <span>Wish sent to the stars...</span>
                </motion.div>
              )}
            </div>

            {/* Candle Wick */}
            <div className="w-1 h-3 bg-zinc-800" />

            {/* Candle Body */}
            <div className="w-12 h-24 rounded-t-lg bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 shadow-lg border border-pink-200/30 flex flex-col items-center justify-between py-2 relative overflow-hidden">
              <div className="w-full h-1 bg-white/40" />
              <Heart className="w-4 h-4 text-rose-600 fill-rose-600/60" />
              <div className="w-full h-1 bg-white/40" />
            </div>

            {/* Candle Base Plate */}
            <div className="w-24 h-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 shadow-md mt-1" />
          </div>

          <button
            onClick={handleBlowCandle}
            disabled={isBlown}
            className={`mt-6 px-5 py-2 rounded-full text-xs font-medium transition-all ${
              !isBlown
                ? 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-300/40 shadow-sm'
                : 'bg-white/5 text-rose-300/60 cursor-default border border-white/5'
            }`}
          >
            {!isBlown ? 'Tap to Blow the Candle 🎂' : 'Candle Blown! Wish is Locked In 💫'}
          </button>
        </div>

        {/* Message after blowing */}
        {wishMade && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-400/30 max-w-md mx-auto"
          >
            <p className="font-serif text-lg text-rose-100 font-medium">
              May every single wish you made today come true, Gauravi.
            </p>
            <p className="text-xs text-rose-200/70 mt-1 font-light">
              You deserve all the happiness the universe has to offer, today and always.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
