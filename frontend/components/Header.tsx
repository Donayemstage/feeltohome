'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { Locale } from '@/lib/i18n';
import { Globe, Menu, X, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLocaleChange = (newLoc: Locale) => {
    setLocale(newLoc);
  };

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:bg-brand-600 transition-colors">
            <span className="material-symbols-outlined text-[24px]">roofing</span>
          </div>
          <span className="text-xl font-extrabold text-brand-500 tracking-tight">
            FeelToHome
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-brand-500 transition-colors">
            {t.nav.home}
          </Link>
          <Link href="/logements" className="hover:text-brand-500 transition-colors">
            {t.nav.listings}
          </Link>
          <Link href="/a-propos" className="hover:text-brand-500 transition-colors">
            {t.nav.about}
          </Link>
          <Link href="/contact" className="hover:text-brand-500 transition-colors">
            {t.nav.contact}
          </Link>
        </nav>

        {/* Right Action Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200/60">
            <button
              onClick={() => handleLocaleChange('fr')}
              className={`h-7 px-2.5 text-xs font-bold rounded-full transition-all ${
                locale === 'fr' ? 'bg-brand-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => handleLocaleChange('en')}
              className={`h-7 px-2.5 text-xs font-bold rounded-full transition-all ${
                locale === 'en' ? 'bg-brand-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLocaleChange('de')}
              className={`h-7 px-2.5 text-xs font-bold rounded-full transition-all ${
                locale === 'de' ? 'bg-brand-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              DE
            </button>
          </div>

          <Link
            href="/connexion"
            className="text-xs font-semibold text-slate-700 hover:text-brand-500 px-3 py-2 transition-colors"
          >
            {t.nav.login}
          </Link>

          <Link
            href="/inscription"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shadow-sm shadow-brand-500/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <User className="w-3.5 h-3.5" />
            <span>{t.nav.register}</span>
          </Link>
        </div>

        {/* Mobile Header Menu Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200/60">
            <button
              onClick={() => handleLocaleChange('fr')}
              className={`h-6 px-2 text-[11px] font-bold rounded-full ${locale === 'fr' ? 'bg-brand-500 text-white' : 'text-slate-600'}`}
            >
              FR
            </button>
            <button
              onClick={() => handleLocaleChange('en')}
              className={`h-6 px-2 text-[11px] font-bold rounded-full ${locale === 'en' ? 'bg-brand-500 text-white' : 'text-slate-600'}`}
            >
              EN
            </button>
            <button
              onClick={() => handleLocaleChange('de')}
              className={`h-6 px-2 text-[11px] font-bold rounded-full ${locale === 'de' ? 'bg-brand-500 text-white' : 'text-slate-600'}`}
            >
              DE
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/logements"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            {t.nav.listings}
          </Link>
          <Link
            href="/a-propos"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            {t.nav.about}
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            {t.nav.contact}
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/connexion"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl"
            >
              {t.nav.login}
            </Link>
            <Link
              href="/inscription"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl"
            >
              {t.nav.register}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
