'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { Locale } from '@/lib/i18n';

export const Header: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const handleLocaleChange = (newLoc: Locale) => {
    setLocale(newLoc);
    setIsLangMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 inset-x-0 z-50 bg-white border-b border-slate-200/90 text-slate-900 transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo with FontAwesome Icon */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center shadow-xs group-hover:bg-brand-600 transition-colors">
            <i className="fa-solid fa-house-chimney text-base"></i>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
            FeelToHome
          </span>
        </Link>

        {/* Desktop Navigation with Active Page Highlight ("foncer") */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-md transition-all ${
              isActive('/')
                ? 'bg-slate-900 text-white font-bold shadow-xs'
                : 'text-slate-700 hover:text-brand-600 hover:bg-slate-100'
            }`}
          >
            {t.nav.home}
          </Link>

          <Link
            href="/logements"
            className={`px-3 py-1.5 rounded-md transition-all ${
              isActive('/logements')
                ? 'bg-slate-900 text-white font-bold shadow-xs'
                : 'text-slate-700 hover:text-brand-600 hover:bg-slate-100'
            }`}
          >
            {t.nav.listings}
          </Link>

          <Link
            href="/a-propos"
            className={`px-3 py-1.5 rounded-md transition-all ${
              isActive('/a-propos')
                ? 'bg-slate-900 text-white font-bold shadow-xs'
                : 'text-slate-700 hover:text-brand-600 hover:bg-slate-100'
            }`}
          >
            {t.nav.about}
          </Link>

          <Link
            href="/contact"
            className={`px-3 py-1.5 rounded-md transition-all ${
              isActive('/contact')
                ? 'bg-slate-900 text-white font-bold shadow-xs'
                : 'text-slate-700 hover:text-brand-600 hover:bg-slate-100'
            }`}
          >
            {t.nav.contact}
          </Link>

          <Link
            href="/devenir-hote"
            className={`px-3 py-1.5 rounded-lg transition-all font-bold flex items-center gap-1.5 ${
              isActive('/devenir-hote')
                ? 'bg-brand-700 text-white font-bold shadow-sm'
                : 'text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100/80 border border-brand-200/60'
            }`}
          >
            <i className="fa-solid fa-circle-plus text-xs"></i>
            <span>{t.nav.publishListing}</span>
          </Link>
        </nav>

        {/* Right Action Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Custom Language Selector Popover with Arrow */}
          <div ref={langMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all bg-slate-100 hover:bg-slate-200/80 text-slate-800 cursor-pointer shadow-xs"
            >
              <i className="fa-solid fa-globe text-brand-600 text-sm"></i>
              <span>{locale === 'fr' ? 'FR — Français' : locale === 'en' ? 'EN — English' : 'DE — Deutsch'}</span>
              <i className={`fa-solid fa-chevron-down text-[10px] text-slate-500 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-2xl p-1.5 z-50 bg-white border border-slate-200 text-slate-900 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleLocaleChange('fr')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    locale === 'fr'
                      ? 'bg-brand-500 text-white font-bold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">🇫🇷</span>
                    <span>Français (FR)</span>
                  </span>
                  {locale === 'fr' && <i className="fa-solid fa-check text-xs"></i>}
                </button>

                <button
                  onClick={() => handleLocaleChange('en')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    locale === 'en'
                      ? 'bg-brand-500 text-white font-bold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">🇬🇧</span>
                    <span>English (EN)</span>
                  </span>
                  {locale === 'en' && <i className="fa-solid fa-check text-xs"></i>}
                </button>

                <button
                  onClick={() => handleLocaleChange('de')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    locale === 'de'
                      ? 'bg-brand-500 text-white font-bold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">🇩🇪</span>
                    <span>Deutsch (DE)</span>
                  </span>
                  {locale === 'de' && <i className="fa-solid fa-check text-xs"></i>}
                </button>
              </div>
            )}
          </div>

          <Link
            href="/connexion"
            className="text-xs font-semibold px-3 py-2 text-slate-700 hover:text-brand-600 transition-colors"
          >
            {t.nav.login}
          </Link>

          <Link
            href="/inscription"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-95 border border-brand-400/30"
          >
            <i className="fa-solid fa-user-plus text-xs"></i>
            <span>{t.nav.register}</span>
          </Link>
        </div>

        {/* Mobile Header Menu Controls */}
        <div className="flex items-center gap-2 md:hidden">
          
          {/* Mobile Language Popover Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 border border-slate-200 bg-slate-100 text-slate-800 rounded-xl px-2.5 py-1 text-[11px] font-bold"
            >
              <span>{locale.toUpperCase()}</span>
              <i className={`fa-solid fa-chevron-down text-[9px] text-slate-500 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-xl shadow-2xl p-1 z-50 bg-white border border-slate-200 text-slate-900">
                <button
                  onClick={() => handleLocaleChange('fr')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                    locale === 'fr' ? 'bg-brand-500 text-white font-bold' : 'hover:bg-slate-100'
                  }`}
                >
                  <span>🇫🇷</span> <span>FR</span>
                </button>
                <button
                  onClick={() => handleLocaleChange('en')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                    locale === 'en' ? 'bg-brand-500 text-white font-bold' : 'hover:bg-slate-100'
                  }`}
                >
                  <span>🇬🇧</span> <span>EN</span>
                </button>
                <button
                  onClick={() => handleLocaleChange('de')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                    locale === 'de' ? 'bg-brand-500 text-white font-bold' : 'hover:bg-slate-100'
                  }`}
                >
                  <span>🇩🇪</span> <span>DE</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Menu mobile"
          >
            {isMenuOpen ? <i className="fa-solid fa-xmark text-xl"></i> : <i className="fa-solid fa-bars text-xl"></i>}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Active Route Highlighting ("foncer") */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white text-slate-900 px-4 pt-2 pb-6 space-y-2 shadow-xl">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3.5 py-2 text-xs rounded-xl transition-all ${
              isActive('/')
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-800 font-semibold hover:bg-slate-100'
            }`}
          >
            {t.nav.home}
          </Link>
          <Link
            href="/logements"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3.5 py-2 text-xs rounded-xl transition-all ${
              isActive('/logements')
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-800 font-semibold hover:bg-slate-100'
            }`}
          >
            {t.nav.listings}
          </Link>
          <Link
            href="/a-propos"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3.5 py-2 text-xs rounded-xl transition-all ${
              isActive('/a-propos')
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-800 font-semibold hover:bg-slate-100'
            }`}
          >
            {t.nav.about}
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3.5 py-2 text-xs rounded-xl transition-all ${
              isActive('/contact')
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-800 font-semibold hover:bg-slate-100'
            }`}
          >
            {t.nav.contact}
          </Link>
          <Link
            href="/devenir-hote"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3.5 py-2 text-xs rounded-xl transition-all ${
              isActive('/devenir-hote')
                ? 'bg-brand-600 text-white font-bold'
                : 'text-brand-600 bg-brand-50 font-bold hover:bg-brand-100'
            }`}
          >
            + {t.nav.publishListing}
          </Link>

          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/connexion"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all"
            >
              {t.nav.login}
            </Link>
            <Link
              href="/inscription"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-xl shadow-md transition-all"
            >
              {t.nav.register}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
