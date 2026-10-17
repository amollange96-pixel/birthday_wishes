import React, { useRef, useState } from 'react';
import { UploadCloud, CheckCircle2, Sparkles, X, Heart } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';

export const PhotoSetupBanner: React.FC = () => {
  const { batchUploadPhotos, hasLoadedAnyPhotos, setIsManagerOpen } = usePhotos();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (isDismissed) return null;

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    const files = Array.from(e.target.files);
    const result = await batchUploadPhotos(files);
    setIsUploading(false);
    setUploadSuccess(`Loaded ${result.matched} photo(s) seamlessly!`);
    setTimeout(() => {
      setUploadSuccess(null);
    }, 4500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-[calc(100vw-2.5rem)]">
      {/* Hidden batch file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFilesSelected}
      />

      <div className="p-4 rounded-2xl bg-[#230927]/95 border border-rose-400/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl text-rose-100 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center shrink-0 shadow-md">
          <Heart className="w-5 h-5 text-white fill-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-serif text-sm font-semibold text-white flex items-center gap-1.5">
              <span>Photo Setup for Amol</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </span>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-rose-300/60 hover:text-white p-1 rounded transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-rose-200/80 mb-3 leading-relaxed">
            {hasLoadedAnyPhotos
              ? 'Photos are active! You can add or replace more anytime.'
              : "Select Gauravi's 17 photos to display them across the entire website in 1 click."}
          </p>

          {uploadSuccess ? (
            <div className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{uploadSuccess}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 rounded-lg shadow-sm transition-all flex items-center gap-1.5 border border-rose-300/30"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Uploading...' : 'Select 17 Photos'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsManagerOpen(true)}
                className="px-3 py-1.5 text-xs text-rose-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
              >
                Setup Guide
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
