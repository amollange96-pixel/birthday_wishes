import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Heart, Edit2, Sparkles, RefreshCw } from 'lucide-react';
import { PhotoItem } from '../types';
import { usePhotos } from '../context/PhotoContext';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
}) => {
  const { getPhotoSrc, updateCaption } = usePhotos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (photo) {
      setEditedCaption(photo.caption);
      setEditedTitle(photo.title);
      setIsEditing(false);
      setIsLoaded(false);
      setHasError(false);
    }
  }, [photo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose, onNext, onPrev]);

  if (!photo) return null;

  const src = getPhotoSrc(photo);

  const handleSaveEdit = () => {
    updateCaption(photo.id, editedCaption, editedTitle);
    setIsEditing(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl p-4 sm:p-6"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 border border-white/10 flex items-center justify-center transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Prev / Next Nav Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-center transition-all backdrop-blur-md hover:scale-105 active:scale-95"
          aria-label="Previous Photograph"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-center transition-all backdrop-blur-md hover:scale-105 active:scale-95"
          aria-label="Next Photograph"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Modal Content / Polaroid Frame */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-2xl w-full max-h-[92vh] flex flex-col bg-[#1c0a1f] border border-rose-400/30 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Photograph Container */}
          <div className="relative flex-1 bg-black/60 flex items-center justify-center min-h-[320px] max-h-[65vh] overflow-hidden">
            {/* Loading Shimmer */}
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-10 h-10 text-rose-400/40 animate-ping" />
              </div>
            )}

            {!hasError ? (
              <img
                key={src}
                src={src}
                alt={photo.alt}
                decoding="async"
                referrerPolicy="no-referrer"
                onLoad={() => {
                  setIsLoaded(true);
                  setHasError(false);
                }}
                onError={() => {
                  setHasError(true);
                  setIsLoaded(false);
                }}
                className={`max-h-[65vh] w-auto max-w-full object-contain mx-auto transition-opacity duration-300 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : (
              <div className="text-center p-8 text-rose-200/80">
                <Heart className="w-12 h-12 text-rose-400 mx-auto mb-2 opacity-50" />
                <p className="font-serif text-lg">{photo.title}</p>
                <p className="text-xs text-rose-300/60 mt-1">{photo.notes}</p>
                <button
                  onClick={() => {
                    setHasError(false);
                    setIsLoaded(false);
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-rose-200 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              </div>
            )}
          </div>

          {/* Caption & Details Footer */}
          <div className="p-5 sm:p-6 bg-gradient-to-b from-[#240c29] to-[#18061c] border-t border-rose-500/20">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Photo Title..."
                  className="w-full px-3 py-1.5 text-sm bg-black/40 border border-rose-400/40 rounded-lg text-rose-100 focus:outline-none focus:border-rose-300"
                />
                <textarea
                  value={editedCaption}
                  onChange={(e) => setEditedCaption(e.target.value)}
                  placeholder="Romantic Caption..."
                  rows={2}
                  className="w-full px-3 py-1.5 text-xs bg-black/40 border border-rose-400/40 rounded-lg text-rose-100 focus:outline-none focus:border-rose-300"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 text-xs text-rose-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-1 text-xs bg-rose-500 hover:bg-rose-600 text-white rounded-md font-medium"
                  >
                    Save Caption
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <h3 className="font-serif text-xl sm:text-2xl text-rose-100 font-normal">
                      {photo.title}
                    </h3>
                  </div>
                  <p className="font-sans text-rose-200/80 text-sm leading-relaxed max-w-lg font-light">
                    {photo.caption}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-mono text-rose-300/40">
                    {photo.filename}
                  </span>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-rose-300/60 hover:text-rose-200 hover:bg-white/5 rounded-lg transition-colors shrink-0"
                  title="Edit Caption"
                  aria-label="Edit Caption"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
