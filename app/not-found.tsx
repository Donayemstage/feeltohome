'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Search, SearchX } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6 my-12">
      <div className="w-16 h-16 rounded-none bg-slate-100 text-slate-500 border border-slate-200 mx-auto flex items-center justify-center">
        <SearchX className="w-8 h-8 text-slate-600" />
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
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-none text-xs font-bold shadow-xs transition-all border border-brand-600"
        >
          <Home className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </Link>

        <Link
          href="/logements"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-none text-xs font-bold transition-all border border-slate-300"
        >
          <Search className="w-4 h-4" />
          <span>Explorer les logements</span>
        </Link>
      </div>
    </div>
  );
}
