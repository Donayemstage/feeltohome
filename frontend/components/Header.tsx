'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { Locale } from '@/lib/i18n';
import { Home, Globe, Menu, X, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleLocaleChange = (newLoc: Locale) => {
    setLocale(newLoc);
    setIsLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:bg-brand-600 transition-colors">
            <Home className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-brand-500 transition-colors">
              FeelToHome
            </span>
            <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-1">.com</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
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
        <div className="hidden md:flex items-center gap-4">
          
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="Sélectionner la langue"
            >
              <Globe className="w-3.5 h-3.5 text-brand-500" />
              <span>{locale.toUpperCase()}</span>
              <span className="text-[10px]">▼</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-100 shadow-xl rounded-xl py-1 z-50 text-xs font-medium">
                <button
                  onClick={() => handleLocaleChange('fr')}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between ${locale === 'fr' ? 'text-brand-500 font-bold' : 'text-slate-700'}`}
                >
                  Français {locale === 'fr' && '✓'}
                </button>
                <button
                  onClick={() => handleLocaleChange('en')}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between ${locale === 'en' ? 'text-brand-500 font-bold' : 'text-slate-700'}`}
                >
                  English {locale === 'en' && '✓'}
                </button>
                <button
                  onClick={() => handleLocaleChange('de')}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between ${locale === 'de' ? 'text-brand-500 font-bold' : 'text-slate-700'}`}
                >
                  Deutsch {locale === 'de' && '✓'}
                </button>
              </div>
            )}
          </div>

          <Link
            href="/connexion"
            className="text-xs font-semibold text-slate-700 hover:text-brand-500 px-3 py-2 transition-colors"
          >
            {t.nav.login}
          </Link>

          <Link
            href="/inscription"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg shadow-sm shadow-brand-500/20 transition-all hover:shadow-md"
          >
            <User className="w-3.5 h-3.5" />
            <span>{t.nav.register}</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
          >
            <Globe className="w-3.5 h-3.5 text-brand-500" />
            <span>{locale.toUpperCase()}</span>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Language Selector Menu */}
      {isLangOpen && (
        <div className="md:hidden border-b border-slate-100 bg-slate-50 px-4 py-2 flex justify-around text-xs font-semibold text-slate-700">
          <button onClick={() => handleLocaleChange('fr')} className={locale === 'fr' ? 'text-brand-500 font-bold' : ''}>Français</button>
          <button onClick={() => handleLocaleChange('en')} className={locale === 'en' ? 'text-brand-500 font-bold' : ''}>English</button>
          <button onClick={() => handleLocaleChange('de')} className={locale === 'de' ? 'text-brand-500 font-bold' : ''}>Deutsch</button>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/logements"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            {t.nav.listings}
          </Link>
          <Link
            href="/a-propos"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            {t.nav.about}
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            {t.nav.contact}
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/connexion"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              {t.nav.login}
            </Link>
            <Link
              href="/inscription"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-brand-500 rounded-lg"
            >
              {t.nav.register}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
