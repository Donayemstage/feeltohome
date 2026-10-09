'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PhotoData } from '@/lib/api';

interface GalleryProps {
  photos: PhotoData[];
  propertyName: string;
}

export const PropertyGallery: React.FC<GalleryProps> = ({ photos, propertyName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fallback image if 0 photos
  const fallbackUrl = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';
  const photoUrls = photos.length > 0 ? photos.map(p => p.url) : [fallbackUrl];
  const count = photoUrls.length;

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight' && count > 1) handleNext();
      if (e.key === 'ArrowLeft' && count > 1) handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, count, handleNext, handlePrev]);

  return (
    <div className="space-y-3">
      {/* Main Image (Square) */}
      <div className="relative h-64 sm:h-96 w-full bg-slate-900 rounded-none overflow-hidden shadow-xs group border border-slate-300">
        <img
          src={photoUrls[selectedIndex]}
          alt={`${propertyName} - Photo ${selectedIndex + 1}`}
          onError={(e) => { e.currentTarget.src = fallbackUrl; }}
          onClick={() => setIsLightboxOpen(true)}
          className="w-full h-full object-cover cursor-pointer group-hover:scale-102 transition-transform duration-300 rounded-none"
        />

        {/* Prev / Next controls */}
        {count > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-none bg-white/90 backdrop-blur-md text-slate-800 flex items-center justify-center hover:bg-white transition-colors shadow-xs border border-slate-300"
              aria-label="Photo précédente"
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-none bg-white/90 backdrop-blur-md text-slate-800 flex items-center justify-center hover:bg-white transition-colors shadow-xs border border-slate-300"
              aria-label="Photo suivante"
            >
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </>
        )}

        {/* Photo Counter Badge */}
        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-none text-xs font-semibold flex items-center gap-1.5 border border-slate-700">
          <i className="fa-regular fa-image text-xs"></i>
          <span>{selectedIndex + 1} / {count}</span>
        </div>
      </div>

      {/* Thumbnail Bar */}
      {count > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {photoUrls.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-14 rounded-none overflow-hidden shrink-0 border-2 transition-all ${
                selectedIndex === idx ? 'border-brand-500 shadow-xs' : 'border-slate-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={url} alt={`Vignette ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-none bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors border border-white/20"
            aria-label="Fermer la galerie"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
            <img
              src={photoUrls[selectedIndex]}
              alt={`${propertyName} grand format`}
              className="max-w-full max-h-[80vh] object-contain rounded-none shadow-2xl"
            />

            {count > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 w-11 h-11 rounded-none bg-white/15 text-white hover:bg-white/30 flex items-center justify-center transition-colors border border-white/20"
                >
                  <i className="fa-solid fa-chevron-left text-base"></i>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 w-11 h-11 rounded-none bg-white/15 text-white hover:bg-white/30 flex items-center justify-center transition-colors border border-white/20"
                >
                  <i className="fa-solid fa-chevron-right text-base"></i>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
