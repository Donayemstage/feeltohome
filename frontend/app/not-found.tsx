'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-5 my-12">
      <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
        <Home className="w-8 h-8" />
      </div>

      <h1 className="text-2xl font-extrabold text-slate-900">
        {t.detail.notFoundTitle}
      </h1>

      <p className="text-xs text-slate-500 leading-relaxed">
        {t.detail.notFoundDesc}
      </p>

      <div className="pt-2">
        <Link
          href="/logements"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-500/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.detail.backToListings}</span>
        </Link>
      </div>
    </div>
  );
}
