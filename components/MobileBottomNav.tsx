'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { useFavorites } from './FavoritesContext';

export const MobileBottomNav: React.FC = () => {
  const { t } = useLanguage();
  const { savedCount, isLoaded } = useFavorites();
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
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors relative ${
            pathname === '/enregistres' ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label={`${t.nav.saved}${isLoaded && savedCount > 0 ? ` (${savedCount})` : ''}`}
        >
          <div className="relative">
            <i className="fa-solid fa-heart text-base"></i>
            {isLoaded && savedCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full min-w-[14px] h-[14px] flex items-center justify-center leading-none">
                {savedCount > 99 ? '99+' : savedCount}
              </span>
            )}
          </div>
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
