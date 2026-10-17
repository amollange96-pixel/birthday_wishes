import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Upload,
  CheckCircle2,
  FolderHeart,
  HelpCircle,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';

export const PhotoManagerModal: React.FC = () => {
  const { photos, customUrls, isManagerOpen, setIsManagerOpen, batchUploadPhotos } =
    usePhotos();
  const [dragActive, setDragActive] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  if (!isManagerOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      const res = await batchUploadPhotos(files);
      setUploadResult(`Successfully loaded ${res.matched} photo(s) into your browser session!`);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const res = await batchUploadPhotos(files);
      setUploadResult(`Successfully loaded ${res.matched} photo(s) into your browser session!`);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
        onClick={() => setIsManagerOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative max-w-2xl w-full max-h-[90vh] bg-[#1a081d] border border-rose-500/30 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-rose-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-rose-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center">
                <FolderHeart className="w-5 h-5 text-rose-300" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-white font-medium">
                  Photo Configuration &amp; Setup
                </h3>
                <p className="text-xs text-rose-200/70">
                  {photos.length} photos registered for Gauravi&apos;s special day
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsManagerOpen(false)}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-rose-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
            {/* Quick Drag & Drop Box */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-rose-400 bg-rose-500/20 scale-[1.01]'
                  : 'border-rose-500/30 hover:border-rose-400/60 bg-white/5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />
              <Upload className="w-10 h-10 text-rose-400 mb-3 animate-bounce" />
              <p className="font-medium text-white mb-1">
                Drop all 17 photos here to view immediately
              </p>
              <p className="text-xs text-rose-200/60 max-w-sm">
                Files match automatically by filename and are stored in your browser session using IndexedDB.
              </p>
            </div>

            {uploadResult && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{uploadResult}</span>
              </div>
            )}

            {/* Permanent Hosting Instructions */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-medium text-xs">
                <HelpCircle className="w-4 h-4" />
                <span>How to place photos permanently in the project:</span>
              </div>
              <p className="text-xs text-rose-200/80 leading-relaxed">
                To have photos load automatically on every device without uploading in the browser, copy your images into the folder:
              </p>
              <div className="bg-black/50 p-2.5 rounded-lg font-mono text-xs text-amber-200/90 select-all border border-rose-500/20">
                public/assets/photos/
              </div>
              <p className="text-[11px] text-rose-300/60">
                Central configuration is in <code className="text-rose-200">src/data/photos.ts</code> where you can edit titles, captions, and order.
              </p>
            </div>

            {/* Photo List & Status */}
            <div>
              <h4 className="font-medium text-xs uppercase tracking-wider text-rose-300/80 mb-3">
                Registered Photos ({photos.length})
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {photos.map((item, i) => {
                  const hasCustom = !!customUrls[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate pr-2">
                        <span className="font-mono text-rose-400/80 min-w-[20px]">
                          {i + 1}.
                        </span>
                        <div className="truncate">
                          <p className="font-medium text-rose-100 truncate">{item.title}</p>
                          <p className="font-mono text-[10px] text-rose-300/50 truncate">
                            {item.filename}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {hasCustom ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <FileCheck className="w-3 h-3" />
                            Loaded
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-rose-300/60 bg-white/5 px-2 py-0.5 rounded-full">
                            Default path
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-rose-500/20 flex justify-end">
            <button
              onClick={() => setIsManagerOpen(false)}
              className="px-5 py-2 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
