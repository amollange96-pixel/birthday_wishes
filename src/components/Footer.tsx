import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-rose-500/15 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center text-xs text-rose-300/60 font-light">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span>Created with all my heart for Gauravi</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/40 inline" />
          <span>· 2 November</span>
        </div>

        <div className="flex items-center gap-6">
          <span>Forever &amp; Always, Amol</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-rose-300 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
