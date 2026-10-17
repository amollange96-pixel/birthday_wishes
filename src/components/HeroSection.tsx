import React from 'react';
import { motion } from 'motion/react';
import { Camera, Mail, Heart, Sparkles, ChevronDown } from 'lucide-react';
import { BIRTHDAY_INFO } from '../data/content';
import { usePhotos } from '../context/PhotoContext';
import { RomanticImage } from './RomanticImage';
import { BirthdayCountdown } from './BirthdayCountdown';

interface HeroSectionProps {
  onExploreGallery: () => void;
  onReadLetter: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreGallery,
  onReadLetter,
}) => {
  const { photos, activeHeroId, setActiveHeroId } = usePhotos();

  const heroPhoto =
    photos.find((p) => p.id === activeHeroId) ||
    photos.find((p) => p.isHeroCandidate) ||
    photos[0];

  const heroCandidates = photos.filter((p) => p.isHeroCandidate);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Soft ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-rose-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Romantic Typography & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Subtle date & dedication kicker */}
          <div className="flex items-center gap-2 text-rose-300 text-xs sm:text-sm tracking-wider font-medium mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/30" />
            <span>2 November · A Celebration of You</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.15] tracking-tight mb-4 text-balance">
            Happy Birthday, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 font-medium">
              My Gauravi
            </span>{' '}
            <span className="text-rose-400 inline-block">❤️</span>
          </h1>

          <p className="font-serif text-lg sm:text-xl text-rose-200/90 italic mb-6 leading-relaxed">
            &ldquo;{BIRTHDAY_INFO.heroSubtitle}&rdquo;
          </p>

          <p className="font-sans text-rose-100/75 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-light">
            {BIRTHDAY_INFO.heroIntro}
          </p>

          {/* Interactive Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={onExploreGallery}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 shadow-[0_4px_25px_rgba(244,114,182,0.35)] transition-all flex items-center justify-center gap-2 border border-rose-300/30 active:scale-95"
            >
              <Camera className="w-4 h-4 text-rose-200" />
              <span>Explore Our Memories 📸</span>
            </button>

            <button
              onClick={onReadLetter}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-medium text-rose-100 bg-white/5 hover:bg-white/10 border border-rose-400/30 hover:border-rose-400/60 backdrop-blur-md shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Mail className="w-4 h-4 text-rose-300" />
              <span>Read My Letter 💌</span>
            </button>
          </div>

          {/* Birthday Countdown or Celebration message */}
          <div className="w-full">
            <BirthdayCountdown />
          </div>
        </motion.div>

        {/* Right Column: Hero Photograph with Cinematic Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center justify-center"
        >
          <div className="relative w-full max-w-md mx-auto">
            {/* Ambient gold-rose halo */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-rose-500/25 via-amber-400/20 to-purple-500/20 rounded-[28px] blur-2xl -z-10" />

            {/* Polaroid / Cinematic Image Container */}
            <div className="p-3.5 sm:p-4 rounded-[26px] bg-gradient-to-b from-[#2b112f] to-[#1a081e] border border-rose-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              <RomanticImage
                photo={heroPhoto}
                aspectClass="aspect-[3/4]"
                className="w-full rounded-2xl shadow-inner"
              />

              {/* Photo Caption Strip */}
              <div className="pt-3.5 pb-1 px-2 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-medium text-rose-100">
                    {heroPhoto.title}
                  </h3>
                  <p className="text-xs text-rose-300/70 font-light">
                    {heroPhoto.caption}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
              </div>
            </div>

            {/* Quick Hero Photo Switcher (Select other hero favorites) */}
            {heroCandidates.length > 1 && (
              <div className="mt-4 flex items-center justify-center gap-2.5">
                <span className="text-[11px] text-rose-300/60 font-light">
                  Choose Hero Pose:
                </span>
                {heroCandidates.map((candidate, idx) => (
                  <button
                    key={candidate.id}
                    onClick={() => setActiveHeroId(candidate.id)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-all ${
                      activeHeroId === candidate.id
                        ? 'bg-rose-500/30 border border-rose-300 text-rose-100'
                        : 'bg-white/5 border border-white/10 text-rose-200/60 hover:text-rose-100'
                    }`}
                  >
                    Look {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Down indicator */}
      <div className="mt-14 flex justify-center">
        <button
          onClick={onExploreGallery}
          className="flex flex-col items-center gap-1 text-rose-300/50 hover:text-rose-200 transition-colors animate-bounce"
          aria-label="Scroll to Gallery"
        >
          <span className="text-xs uppercase tracking-widest font-light">
            Explore Memories
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
