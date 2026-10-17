import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_PHOTOS, getPhotoPublicUrl } from '../data/photos';
import { PhotoItem } from '../types';
import { getAllStoredPhotos, savePhotoBlob } from '../utils/storage';

interface PhotoContextType {
  photos: PhotoItem[];
  customUrls: Record<string, string>;
  serverFiles: string[];
  activeHeroId: string;
  setActiveHeroId: (id: string) => void;
  getPhotoSrc: (photo: PhotoItem) => string;
  uploadPhoto: (id: string, file: File) => Promise<void>;
  batchUploadPhotos: (files: File[]) => Promise<{ matched: number; total: number; serverSaved: boolean }>;
  updateCaption: (id: string, newCaption: string, newTitle?: string) => void;
  isManagerOpen: boolean;
  setIsManagerOpen: (open: boolean) => void;
  hasLoadedAnyPhotos: boolean;
}

const PhotoContext = createContext<PhotoContextType | null>(null);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [customUrls, setCustomUrls] = useState<Record<string, string>>({});
  const [serverFiles, setServerFiles] = useState<string[]>([]);
  const [activeHeroId, setActiveHeroId] = useState<string>('photo-1');
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  // Check what photos exist on server and in indexedDB
  const checkPhotos = async () => {
    // 1. Check IndexedDB
    try {
      const stored = await getAllStoredPhotos();
      if (stored && Object.keys(stored).length > 0) {
        setCustomUrls((prev) => ({ ...prev, ...stored }));
      }
    } catch {
      // IndexedDB optional
    }

    // 2. Check Server API
    try {
      const res = await fetch('/api/photos/list');
      if (res.ok) {
        const data = await res.json();
        if (data.files && Array.isArray(data.files)) {
          setServerFiles(data.files);
        }
      }
    } catch {
      // Server list optional
    }
  };

  useEffect(() => {
    checkPhotos();
  }, []);

  const getPhotoSrc = (photo: PhotoItem): string => {
    // Priority 1: In-memory/IndexedDB uploaded blob
    if (customUrls[photo.id]) {
      return customUrls[photo.id];
    }
    // Priority 2: Correctly resolved and URL-encoded path in public/assets/photos
    return getPhotoPublicUrl(photo.filename);
  };

  const uploadPhoto = async (id: string, file: File) => {
    // Save to local indexedDB for immediate UI update
    const url = await savePhotoBlob(id, file);
    setCustomUrls((prev) => ({ ...prev, [id]: url }));

    // Send to server to write to public/assets/photos/
    try {
      const formData = new FormData();
      formData.append('photos', file, file.name);
      await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      });
      checkPhotos();
    } catch {
      // Offline fallback
    }
  };

  const batchUploadPhotos = async (
    files: File[]
  ): Promise<{ matched: number; total: number; serverSaved: boolean }> => {
    let matched = 0;
    const newUrls: Record<string, string> = {};

    // 1. Match each file with a photo entry and save to IndexedDB
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Match by exact filename or partial
      const found = photos.find(
        (p) =>
          p.filename.toLowerCase() === file.name.toLowerCase() ||
          file.name.toLowerCase().includes(p.filename.toLowerCase().replace('.jpeg', '')) ||
          p.filename.toLowerCase().includes(file.name.toLowerCase().replace('.jpeg', ''))
      );

      const targetId = found ? found.id : photos[i % photos.length].id;
      const url = await savePhotoBlob(targetId, file);
      newUrls[targetId] = url;
      matched++;
    }

    setCustomUrls((prev) => ({ ...prev, ...newUrls }));

    // 2. Also send all files to the server in a single multipart POST
    let serverSaved = false;
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append('photos', file, file.name);
      }
      const res = await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        serverSaved = true;
        await checkPhotos();
      }
    } catch {
      serverSaved = false;
    }

    return { matched, total: files.length, serverSaved };
  };

  const updateCaption = (id: string, newCaption: string, newTitle?: string) => {
    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            caption: newCaption,
            title: newTitle !== undefined ? newTitle : p.title,
          };
        }
        return p;
      })
    );
  };

  const hasLoadedAnyPhotos =
    Object.keys(customUrls).length > 0 || serverFiles.length > 0;

  return (
    <PhotoContext.Provider
      value={{
        photos,
        customUrls,
        serverFiles,
        activeHeroId,
        setActiveHeroId,
        getPhotoSrc,
        uploadPhoto,
        batchUploadPhotos,
        updateCaption,
        isManagerOpen,
        setIsManagerOpen,
        hasLoadedAnyPhotos,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const ctx = useContext(PhotoContext);
  if (!ctx) {
    throw new Error('usePhotos must be used within PhotoProvider');
  }
  return ctx;
};
