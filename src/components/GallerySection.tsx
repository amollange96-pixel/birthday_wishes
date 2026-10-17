import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Heart, Plus, Sparkles, Filter, Video } from 'lucide-react';
import { PhotoItem } from '../types';
import { usePhotos } from '../context/PhotoContext';
import { RomanticImage } from './RomanticImage';
import { PhotoLightbox } from './PhotoLightbox';

export const GallerySection: React.FC = () => {
  const { photos } = usePhotos();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const categories = [
    { id: 'all', label: 'All Memories' },
    { id: 'favorites', label: 'My Favorites' },
    { id: 'traditional', label: 'Traditional Grace' },
    { id: 'candid', label: 'Candid & Cute' },
    { id: 'portraits', label: 'Gentle Portraits' },
  ];

  const filteredPhotos = photos.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const displayedPhotos = filteredPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPhotos.length;

  const handleRevealMore = () => {
    setVisibleCount((prev) => Math.min(filteredPhotos.length, prev + 4));
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Decorative ambient backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-rose-600/5 blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest font-medium mb-4">
          <Camera className="w-3.5 h-3.5 text-rose-400" />
          <span>Moments That Mean Everything</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight mb-4 text-balance">
          Every Picture Has a Little Piece of My Heart
        </h2>

        <p className="font-serif text-lg sm:text-xl text-rose-200/80 italic font-light max-w-2xl mx-auto">
          &ldquo;And every memory becomes more beautiful because it reminds me of you.&rdquo;
        </p>

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setVisibleCount(8);
              }}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${
                activeCategory === cat.id
                  ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,114,182,0.35)] border border-rose-300/40'
                  : 'bg-white/5 text-rose-200/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid / Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 items-start">
        {displayedPhotos.map((photo, index) => {
          // Subtle alternating rotation for realistic polaroid effect
          const rotations = ['rotate-[-1.5deg]', 'rotate-[1.2deg]', 'rotate-[-0.8deg]', 'rotate-[1.8deg]'];
          const rotationClass = rotations[index % rotations.length];

          return (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
              className={`group cursor-pointer transform transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] ${rotationClass}`}
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Polaroid Card Frame */}
              <div className="p-3.5 pb-5 rounded-2xl bg-[#faf5eb] text-zinc-900 shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-amber-200/40 flex flex-col transition-all group-hover:shadow-[0_20px_45px_rgba(244,114,182,0.25)]">
                {/* Photo container */}
                <div className="relative overflow-hidden rounded-xl bg-zinc-900">
                  <RomanticImage
                    photo={photo}
                    aspectClass="aspect-[4/5]"
                    className="w-full"
                    showUploadPrompt={true}
                  />

                  {/* Hover Quick Zoom Cue */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 text-zinc-900 text-xs font-medium shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                      View Memory
                    </span>
                  </div>
                </div>

                {/* Polaroid Bottom Notes with handwritten font */}
                <div className="pt-3.5 px-1 text-center">
                  <h4 className="font-serif text-lg font-bold text-zinc-900 leading-snug tracking-tight">
                    {photo.title}
                  </h4>
                  <p className="font-handwriting text-base text-zinc-700/90 leading-tight mt-0.5 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* "One More Memory ❤️" Button */}
      {hasMore && (
        <div className="mt-14 text-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleRevealMore}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium text-rose-100 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 hover:border-rose-400/60 shadow-lg shadow-rose-950/40 transition-all"
          >
            <Plus className="w-4 h-4 text-rose-300" />
            <span>One More Memory ❤️</span>
          </motion.button>
        </div>
      )}

      {/* Lightbox */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />
    </section>
  );
};
