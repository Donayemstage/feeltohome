'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';

export const MobileBottomNav: React.FC = () => {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.05)] md:hidden pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
            pathname === '/' ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <i className="fa-solid fa-house-chimney text-base"></i>
          <span className="text-[10px] font-semibold">{t.nav.home}</span>
        </Link>

        <Link
          href="/logements"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
            pathname.startsWith('/logements') ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <i className="fa-solid fa-magnifying-glass text-base"></i>
          <span className="text-[10px] font-semibold">{t.nav.explore}</span>
        </Link>

        <Link
          href="/enregistres"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
            pathname === '/enregistres' ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <i className="fa-solid fa-heart text-base"></i>
          <span className="text-[10px] font-semibold">{t.nav.saved}</span>
        </Link>

        <Link
          href="/connexion"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
            pathname === '/connexion' ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <i className="fa-solid fa-user text-base"></i>
          <span className="text-[10px] font-semibold">{t.nav.profile}</span>
        </Link>
      </div>
    </nav>
  );
};
