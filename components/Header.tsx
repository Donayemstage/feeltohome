'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { Locale } from '@/lib/i18n';
import { Globe, Menu, X, User, ChevronDown, Check, PlusCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const handleLocaleChange = (newLoc: Locale) => {
    setLocale(newLoc);
    setIsLangMenuOpen(false);
  };

  // Scroll detection to switch header background & text color on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
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

  return (
    <header
      className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 text-white shadow-xl'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-900 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/30 group-hover:bg-brand-600 transition-colors">
            <span className="material-symbols-outlined text-[24px]">roofing</span>
          </div>
          <span
            className={`text-xl font-extrabold tracking-tight transition-colors ${
              isScrolled ? 'text-white group-hover:text-brand-400' : 'text-slate-900 group-hover:text-brand-600'
            }`}
          >
            FeelToHome
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg transition-all ${
              isScrolled
                ? 'text-slate-200 hover:text-white hover:bg-white/10'
                : 'text-slate-800 hover:text-brand-600 hover:bg-slate-100'
            }`}
          >
            {t.nav.home}
          </Link>
          <Link
            href="/logements"
            className={`px-3 py-1.5 rounded-lg transition-all ${
              isScrolled
                ? 'text-slate-200 hover:text-white hover:bg-white/10'
                : 'text-slate-800 hover:text-brand-600 hover:bg-slate-100'
            }`}
          >
            {t.nav.listings}
          </Link>
          <Link
            href="/a-propos"
            className={`px-3 py-1.5 rounded-lg transition-all ${
              isScrolled
                ? 'text-slate-200 hover:text-white hover:bg-white/10'
                : 'text-slate-800 hover:text-brand-600 hover:bg-slate-100'
            }`}
          >
            {t.nav.about}
          </Link>
          <Link
            href="/contact"
            className={`px-3 py-1.5 rounded-lg transition-all ${
              isScrolled
                ? 'text-slate-200 hover:text-white hover:bg-white/10'
                : 'text-slate-800 hover:text-brand-600 hover:bg-slate-100'
            }`}
          >
            {t.nav.contact}
          </Link>
          <Link
            href="/devenir-hote"
            className={`px-3 py-1.5 rounded-lg transition-all font-bold flex items-center gap-1.5 ${
              isScrolled
                ? 'text-brand-400 hover:text-brand-300 hover:bg-white/10'
                : 'text-brand-600 hover:text-brand-700 hover:bg-brand-50'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publier une annonce</span>
          </Link>
        </nav>

        {/* Right Action Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Custom Language Selector Popover with Arrow */}
          <div ref={langMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center gap-2 border rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs ${
                isScrolled
                  ? 'bg-white/15 hover:bg-white/25 border-white/25 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
              }`}
            >
              <Globe className={`w-3.5 h-3.5 shrink-0 ${isScrolled ? 'text-brand-400' : 'text-brand-600'}`} />
              <span>{locale === 'fr' ? 'FR — Français' : locale === 'en' ? 'EN — English' : 'DE — Deutsch'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''} ${isScrolled ? 'text-white/80' : 'text-slate-500'}`} />
            </button>

            {isLangMenuOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                  isScrolled
                    ? 'bg-slate-900 border border-white/20 text-white'
                    : 'bg-white border border-slate-200 text-slate-900'
                }`}
              >
                <button
                  onClick={() => handleLocaleChange('fr')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    locale === 'fr'
                      ? 'bg-brand-500 text-white font-bold'
                      : isScrolled ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">🇫🇷</span>
                    <span>Français (FR)</span>
                  </span>
                  {locale === 'fr' && <Check className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => handleLocaleChange('en')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    locale === 'en'
                      ? 'bg-brand-500 text-white font-bold'
                      : isScrolled ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">🇬🇧</span>
                    <span>English (EN)</span>
                  </span>
                  {locale === 'en' && <Check className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => handleLocaleChange('de')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    locale === 'de'
                      ? 'bg-brand-500 text-white font-bold'
                      : isScrolled ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">🇩🇪</span>
                    <span>Deutsch (DE)</span>
                  </span>
                  {locale === 'de' && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          <Link
            href="/connexion"
            className={`text-xs font-semibold px-3 py-2 transition-colors ${
              isScrolled ? 'text-slate-200 hover:text-white' : 'text-slate-800 hover:text-brand-600'
            }`}
          >
            {t.nav.login}
          </Link>

          <Link
            href="/inscription"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-95 border border-brand-400/30"
          >
            <User className="w-3.5 h-3.5" />
            <span>{t.nav.register}</span>
          </Link>
        </div>

        {/* Mobile Header Menu Controls */}
        <div className="flex items-center gap-2 md:hidden">
          
          {/* Mobile Language Popover Button with Arrow */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center gap-1 border rounded-xl px-2.5 py-1 text-[11px] font-bold ${
                isScrolled
                  ? 'bg-white/15 border-white/25 text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <span>{locale.toUpperCase()}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-40 rounded-xl shadow-2xl p-1 z-50 ${
                  isScrolled
                    ? 'bg-slate-900 border border-white/20 text-white'
                    : 'bg-white border border-slate-200 text-slate-900'
                }`}
              >
                <button
                  onClick={() => handleLocaleChange('fr')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                    locale === 'fr'
                      ? 'bg-brand-500 text-white font-bold'
                      : isScrolled ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                  }`}
                >
                  <span>🇫🇷</span> <span>FR</span>
                </button>
                <button
                  onClick={() => handleLocaleChange('en')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                    locale === 'en'
                      ? 'bg-brand-500 text-white font-bold'
                      : isScrolled ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                  }`}
                >
                  <span>🇬🇧</span> <span>EN</span>
                </button>
                <button
                  onClick={() => handleLocaleChange('de')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                    locale === 'de'
                      ? 'bg-brand-500 text-white font-bold'
                      : isScrolled ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                  }`}
                >
                  <span>🇩🇪</span> <span>DE</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-xl transition-colors ${
              isScrolled ? 'text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100'
            }`}
            aria-label="Menu mobile"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden border-b px-4 pt-2 pb-6 space-y-3 transition-colors ${
            isScrolled
              ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
              : 'bg-white border-slate-200 text-slate-900 shadow-xl'
          }`}
        >
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
              isScrolled ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            {t.nav.home}
          </Link>
          <Link
            href="/logements"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
              isScrolled ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            {t.nav.listings}
          </Link>
          <Link
            href="/a-propos"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
              isScrolled ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            {t.nav.about}
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
              isScrolled ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            {t.nav.contact}
          </Link>
          <Link
            href="/devenir-hote"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-sm font-bold text-brand-500 rounded-xl hover:bg-brand-50/10 transition-all"
          >
            + Publier une annonce
          </Link>

          <div className="pt-2 border-t border-slate-200/40 flex flex-col gap-2">
            <Link
              href="/connexion"
              onClick={() => setIsMenuOpen(false)}
              className={`w-full text-center py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                isScrolled
                  ? 'text-white bg-white/15 hover:bg-white/25 border-white/20'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-200'
              }`}
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
