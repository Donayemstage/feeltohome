'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { Home, Search, Heart, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-2px_12px_rgba(0,0,0,0.05)] md:hidden pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
            pathname === '/' ? 'text-brand-500 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t.nav.home}</span>
        </Link>

        <Link
          href="/logements"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
            pathname.startsWith('/logements') ? 'text-brand-500 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t.nav.explore}</span>
        </Link>

        <Link
          href="/enregistres"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
            pathname === '/enregistres' ? 'text-brand-500 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t.nav.saved}</span>
        </Link>

        <Link
          href="/connexion"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
            pathname === '/connexion' ? 'text-brand-500 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">{t.nav.profile}</span>
        </Link>
      </div>
    </nav>
  );
};
