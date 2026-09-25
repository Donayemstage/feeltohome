'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { Home, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-20 md:pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[24px]">roofing</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                FeelToHome
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.aboutText}
            </p>
            <div className="pt-1 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>Douala, Yaoundé, Kribi, Limbe — Cameroun</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500" />
                <span>contact@feeltohome.com</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-brand-500 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/logements" className="hover:text-brand-500 transition-colors">
                  {t.nav.listings}
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-brand-500 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-500 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Housing Types */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t.footer.typesTitle}</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/logements?type=HOTEL" className="hover:text-white transition-colors">{t.propertyTypes.HOTEL}</Link></li>
              <li><Link href="/logements?type=APPARTEMENT" className="hover:text-white transition-colors">{t.propertyTypes.APPARTEMENT}</Link></li>
              <li><Link href="/logements?type=STUDIO" className="hover:text-white transition-colors">{t.propertyTypes.STUDIO}</Link></li>
              <li><Link href="/logements?type=VILLA" className="hover:text-white transition-colors">{t.propertyTypes.VILLA}</Link></li>
              <li><Link href="/logements?type=RESIDENCE" className="hover:text-white transition-colors">{t.propertyTypes.RESIDENCE}</Link></li>
              <li><Link href="/logements?type=AUBERGE" className="hover:text-white transition-colors">{t.propertyTypes.AUBERGE}</Link></li>
            </ul>
          </div>

          {/* Slogan */}
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand-500">Slogan</span>
              <p className="text-base font-bold text-white mt-1 italic">
                « {t.hero.slogan} »
              </p>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              Réservation de logements au Cameroun.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & MANDATORY Donayem Tech Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {currentYear} FeelToHome (feeltohome.com). {t.footer.rights}</p>

          <p className="font-medium text-slate-300">
            {t.footer.realizedBy}{' '}
            <a
              href="https://www.donayemtech.com/fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 hover:text-brand-400 font-bold underline underline-offset-4 decoration-brand-500/50 hover:decoration-brand-400 transition-all"
            >
              Donayem Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
