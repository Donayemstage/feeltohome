'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { SearchBox } from './SearchBox';
import { CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-slate-900 min-h-[580px] lg:min-h-[620px] flex items-center py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[url('/images/hero-bg.png')] bg-cover bg-[position:65%_center] md:bg-[position:right_center]">
      {/* 
        Refined Subtle Overlay Gradient:
        - Left (0-40%): Dark navy gradient for 100% text and search card legibility.
        - Right (45-100%): Fully transparent to preserve the natural photographic colors, traveler with suitcase, and hotel lobby.
      */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/90 via-[#00144d]/60 via-45% to-transparent max-md:bg-gradient-to-b max-md:from-slate-950/90 max-md:via-slate-950/65 max-md:via-60% max-md:to-transparent pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-6 lg:space-y-8">
        
        {/* Text Header Block */}
        <div className="space-y-4 max-w-2xl text-left">
          
          {/* Reassurance Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Des logements de standing au Cameroun</span>
          </div>

          {/* Slogan H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
            {t.hero.slogan}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed drop-shadow-xs max-w-xl">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Search Card Container */}
        <div className="pt-2 max-w-4xl">
          <SearchBox />
        </div>

      </div>
    </section>
  );
};
