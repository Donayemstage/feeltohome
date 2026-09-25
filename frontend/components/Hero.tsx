'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { SearchBox } from './SearchBox';
import { CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-brand-700 via-brand-600 to-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
        {/* Reassurance Badge (Correction #4.1: "Trouvez votre chez-vous au Cameroun") */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Des logements de standing au Cameroun</span>
        </div>

        {/* Hero Slogan */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white max-w-3xl mx-auto">
          {t.hero.slogan}
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Search Card */}
        <div className="pt-2 max-w-4xl mx-auto">
          <SearchBox />
        </div>
      </div>
    </section>
  );
};
