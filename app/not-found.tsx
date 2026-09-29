'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6 my-12">
      <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center shadow-inner">
        <span className="material-symbols-outlined text-[32px] text-slate-500">search_off</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Page introuvable
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          La page que vous recherchez n'existe pas, a été déplacée ou est temporairement indisponible.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-500/20 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </Link>

        <Link
          href="/logements"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200"
        >
          <Search className="w-4 h-4" />
          <span>Explorer les logements</span>
        </Link>
      </div>
    </div>
  );
}
