'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PhotoData } from '@/lib/api';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

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

  // Keyboard navigation for Lightbox
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
      {/* Main Image */}
      <div className="relative h-64 sm:h-96 w-full bg-slate-900 rounded-2xl overflow-hidden shadow-md group">
        <img
          src={photoUrls[selectedIndex]}
          alt={`${propertyName} - Photo ${selectedIndex + 1}`}
          onError={(e) => { e.currentTarget.src = fallbackUrl; }}
          onClick={() => setIsLightboxOpen(true)}
          className="w-full h-full object-cover cursor-pointer group-hover:scale-102 transition-transform duration-300"
        />

        {/* Prev / Next controls on Main Image if > 1 photo */}
        {count > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-slate-800 flex items-center justify-center hover:bg-white transition-colors shadow-md"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-slate-800 flex items-center justify-center hover:bg-white transition-colors shadow-md"
              aria-label="Photo suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Photo Counter Badge */}
        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{selectedIndex + 1} / {count}</span>
        </div>
      </div>

      {/* Thumbnail Bar if > 1 photo */}
      {count > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {photoUrls.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                selectedIndex === idx ? 'border-brand-500 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={url} alt={`Vignette ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Fermer la galerie"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
            <img
              src={photoUrls[selectedIndex]}
              alt={`${propertyName} grand format`}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />

            {count > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 w-11 h-11 rounded-full bg-white/15 text-white hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 w-11 h-11 rounded-full bg-white/15 text-white hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
