import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Smile,
  Sparkles,
  HeartHandshake,
  Flame,
  Camera,
  Crown,
  ChevronRight,
} from 'lucide-react';
import { SPECIAL_REASONS } from '../data/content';
import { SpecialReason } from '../types';

export const SpecialReasonsSection: React.FC = () => {
  const [openedCards, setOpenedCards] = useState<Record<string, boolean>>({
    'reason-1': true, // Keep first open by default
  });

  const toggleCard = (id: string) => {
    setOpenedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Smile':
        return <Smile className="w-5 h-5 text-rose-300" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-300" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-300" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-pink-400" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-amber-300" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-rose-300" />;
      default:
        return <Heart className="w-5 h-5 text-rose-300" />;
    }
  };

  return (
    <section id="reasons" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background illumination */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest font-medium mb-4">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/30" />
          <span>From Amol, To You</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight mb-4 text-balance">
          Little Things That Make You So Special
        </h2>

        <p className="font-sans text-rose-200/75 text-sm sm:text-base font-light">
          Click any card to reveal what I cherish most about you.
        </p>
      </div>

      {/* Reasons Grid with 3D Tilt and Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {SPECIAL_REASONS.map((item: SpecialReason, idx: number) => {
          const isOpen = !!openedCards[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => toggleCard(item.id)}
              className="group cursor-pointer rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300 border border-rose-500/20 hover:border-rose-400/40 bg-gradient-to-br from-[#270d2d] via-[#1b0820] to-[#120616] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Subtle accent gradient behind */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Top line: Tagline & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono tracking-wider uppercase text-rose-300/60 font-light">
                      {item.tagline}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon(item.iconName)}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-rose-100 mb-3 tracking-wide">
                    {item.title}
                  </h3>

                  {/* Revealed Message */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      isOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="font-serif text-lg italic text-rose-100/90 leading-relaxed pl-3 border-l-2 border-rose-400/40">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom Toggle State Hint */}
                <div className="mt-6 pt-4 border-t border-rose-500/10 flex items-center justify-between text-xs text-rose-300/60 font-light">
                  <span>{isOpen ? 'Tap to close' : 'Tap to reveal message'}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? 'rotate-90 text-rose-300' : 'text-rose-400/50'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
