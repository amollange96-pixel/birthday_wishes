import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Compass, BookOpen } from 'lucide-react';
import { STORY_MILESTONES } from '../data/content';
import { usePhotos } from '../context/PhotoContext';
import { RomanticImage } from './RomanticImage';

export const StoryTimelineSection: React.FC = () => {
  const { photos } = usePhotos();

  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-purple-700/10 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest font-medium mb-4">
          <BookOpen className="w-3.5 h-3.5 text-rose-400" />
          <span>Chapters of Us</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight mb-4 text-balance">
          Our Story, One Beautiful Moment at a Time
        </h2>

        <p className="font-sans text-rose-200/75 text-sm sm:text-base font-light max-w-xl mx-auto">
          Every conversation, every glance, and every quiet chapter that makes what we share so dear.
        </p>
      </div>

      {/* Vertical Timeline Spine */}
      <div className="relative">
        {/* Center glowing line on desktop, left line on mobile */}
        <div className="absolute top-0 bottom-12 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-500/10 via-rose-400/30 to-amber-400/20" />

        <div className="space-y-16 md:space-y-24">
          {STORY_MILESTONES.map((item, index) => {
            const isEven = index % 2 === 0;
            const photo = photos.find((p) => p.id === item.photoId) || photos[index % photos.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Milestone Node Badge on the center line */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#2a0e2f] border-2 border-rose-400/70 shadow-[0_0_15px_rgba(244,114,182,0.5)] flex items-center justify-center z-10">
                  <Heart className="w-4 h-4 text-rose-300 fill-rose-500/40" />
                </div>

                {/* Left/Right Text Content */}
                <div className="w-full md:w-1/2 pl-14 md:pl-0 flex flex-col items-start md:text-left">
                  <div
                    className={`p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#290d2e]/90 to-[#19071c]/90 border border-rose-500/20 backdrop-blur-md shadow-xl w-full ${
                      isEven ? 'md:text-left' : 'md:text-left'
                    }`}
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-300/80 mb-1.5 block">
                      {item.dateLabel}
                    </span>

                    <h3 className="font-serif text-2xl font-normal text-rose-100 mb-3 tracking-wide">
                      {item.title}
                    </h3>

                    <p className="font-sans text-rose-200/80 text-sm leading-relaxed mb-4 font-light">
                      {item.description}
                    </p>

                    {item.quote && (
                      <p className="font-serif text-base italic text-rose-300/90 pt-3 border-t border-rose-500/10">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Left/Right Photo Card */}
                <div className="w-full md:w-1/2 pl-14 md:pl-0 flex justify-center">
                  <div className="max-w-xs sm:max-w-sm w-full p-3 rounded-2xl bg-[#faf5eb] shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-amber-200/30 transform transition-transform hover:scale-105 duration-300">
                    <RomanticImage
                      photo={photo}
                      aspectClass="aspect-[4/5]"
                      className="w-full rounded-xl"
                      showUploadPrompt={true}
                    />
                    <div className="pt-2 text-center">
                      <span className="font-handwriting text-base text-zinc-700">
                        {photo.title}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ending Chapter Ribbon */}
        <div className="mt-20 text-center relative z-10">
          <div className="inline-flex flex-col items-center gap-3 p-6 sm:px-10 rounded-2xl bg-gradient-to-r from-rose-950/60 via-[#35123a] to-rose-950/60 border border-rose-400/30 backdrop-blur-md shadow-2xl">
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            <h4 className="font-serif text-2xl sm:text-3xl text-rose-100 font-normal">
              And this is only one chapter of our story. <span className="text-rose-400 font-sans">❤️</span>
            </h4>
            <p className="font-sans text-xs sm:text-sm text-rose-200/70 font-light max-w-md">
              The best memories are the ones we haven&apos;t lived yet. Looking forward to every single tomorrow with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
