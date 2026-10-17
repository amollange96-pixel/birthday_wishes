import React, { useState, useEffect, useRef } from 'react';
import { Heart, UploadCloud, RefreshCw } from 'lucide-react';
import { PhotoItem } from '../types';
import { usePhotos } from '../context/PhotoContext';

interface RomanticImageProps {
  photo: PhotoItem;
  className?: string;
  aspectClass?: string;
  onClick?: () => void;
  showUploadPrompt?: boolean;
}

export const RomanticImage: React.FC<RomanticImageProps> = ({
  photo,
  className = '',
  aspectClass = 'aspect-[3/4]',
  onClick,
  showUploadPrompt = true,
}) => {
  const { getPhotoSrc, uploadPhoto } = usePhotos();
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const src = getPhotoSrc(photo);

  // Reset loading and error states whenever photo or src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);

    // If already in DOM and complete (e.g. cached by browser), mark loaded immediately
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
      setHasError(false);
    }
  }, [src, photo.id, retryKey]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadPhoto(photo.id, file);
      setHasError(false);
      setIsLoaded(false);
      setRetryKey((k) => k + 1);
    }
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasError(false);
    setIsLoaded(false);
    setRetryKey((k) => k + 1);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2a112d] via-[#1c0b20] to-[#120716] group ${aspectClass} ${className}`}
      onClick={onClick}
    >
      {/* Hidden file input for quick direct upload on fallback */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Shimmer skeleton while image is loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-rose-950/20 via-pink-900/10 to-rose-950/20 animate-pulse flex items-center justify-center">
          <Heart className="w-8 h-8 text-rose-400/20 animate-ping" />
        </div>
      )}

      {/* Actual Image Element */}
      {!hasError && (
        <img
          key={`${src}-${retryKey}`}
          ref={imgRef}
          src={src}
          alt={photo.alt}
          loading="eager"
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
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } group-hover:scale-105`}
        />
      )}

      {/* Elegant Romantic Fallback Container if file fails to load */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#321338] via-[#240d28] to-[#160718] border border-rose-500/20 z-10">
          <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-400/30 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(244,114,182,0.15)]">
            <Heart className="w-7 h-7 text-rose-300 animate-pulse fill-rose-500/20" />
          </div>

          <span className="font-serif text-lg font-medium text-rose-100 mb-1 tracking-wide">
            {photo.title}
          </span>
          <p className="text-xs text-rose-200/60 line-clamp-2 max-w-[200px] mb-3">
            {photo.notes || photo.caption}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-300/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors"
              title="Retry loading photo"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>

            {showUploadPrompt && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-200 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 rounded-md transition-colors"
              >
                <UploadCloud className="w-3.5 h-3.5 text-rose-300" />
                <span>Select photo</span>
              </button>
            )}
          </div>

          <div className="absolute bottom-2 text-[10px] text-rose-300/40 tracking-wider font-mono">
            {photo.filename.length > 25 ? photo.filename.slice(0, 22) + '...' : photo.filename}
          </div>
        </div>
      )}

      {/* Subtle glass reflection overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-white/5 opacity-60 z-10" />
    </div>
  );
};
