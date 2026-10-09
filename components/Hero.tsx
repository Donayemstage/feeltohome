'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { SearchBox } from './SearchBox';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-slate-900 min-h-[520px] lg:min-h-[580px] flex items-center py-10 lg:py-16 px-4 sm:px-6 lg:px-8 bg-[url('/images/hero-bg.png')] bg-cover bg-[position:65%_center] md:bg-[position:right_center]">
      {/* 
        Subtle Overlay Gradient:
        - Dark navy gradient for text & search box legibility
      */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/90 via-[#00144d]/60 via-45% to-transparent max-md:bg-gradient-to-b max-md:from-slate-950/90 max-md:via-slate-950/70 max-md:to-transparent pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-6 lg:space-y-8">
        
        {/* Text Header Block */}
        <div className="space-y-3.5 max-w-2xl text-left">
          
          {/* Reassurance Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs">
            <i className="fa-solid fa-circle-check text-emerald-400 text-xs shrink-0"></i>
            <span>Des logements de standing au Cameroun</span>
          </div>

          {/* Slogan H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
            {t.hero.slogan}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-xs max-w-xl">
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
