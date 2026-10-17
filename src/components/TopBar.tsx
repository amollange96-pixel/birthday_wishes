import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, FolderHeart, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { usePhotos } from '../context/PhotoContext';

interface TopBarProps {
  onReadLetter: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onReadLetter }) => {
  const { setIsManagerOpen } = usePhotos();
  const [isPlaying, setIsPlaying] = useState(romanticAudio.getStatus());
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    const nextState = romanticAudio.toggle();
    setIsPlaying(nextState);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#14061a]/85 backdrop-blur-md border-b border-rose-500/15 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-serif tracking-wide text-rose-100 hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>Gauravi &amp; Amol</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/40 inline" />
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-rose-200/80">
          <a
            href="#gallery"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Memories
          </a>
          <a
            href="#reasons"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Reasons
          </a>
          <a
            href="#story"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Our Story
          </a>
          <a
            href="#letter"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Letter
          </a>
        </nav>

        {/* Zone 3: 1 primary action with secondary music/photo toggles */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleMusic}
            className="p-2 rounded-full text-rose-200/80 hover:text-white hover:bg-white/10 transition-colors"
            title={isPlaying ? 'Mute Music' : 'Play Romantic Music'}
            aria-label={isPlaying ? 'Mute Music' : 'Play Romantic Music'}
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-rose-300 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          <button
            onClick={() => setIsManagerOpen(true)}
            className="p-2 rounded-full text-rose-200/80 hover:text-white hover:bg-white/10 transition-colors"
            title="Configure / Add Photos"
            aria-label="Configure Photos"
          >
            <FolderHeart className="w-4 h-4 text-rose-300" />
          </button>

          <button
            onClick={onReadLetter}
            className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-full hover:from-rose-400 hover:to-pink-500 shadow-md transition-all whitespace-nowrap shrink-0 border border-rose-300/30 active:scale-95"
          >
            Read Letter
          </button>
        </div>
      </div>
    </header>
  );
};
