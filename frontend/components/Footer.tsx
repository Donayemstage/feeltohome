'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                FeelToHome
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.footer.aboutText}
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>Douala & Yaoundé, Cameroun</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500" />
                <span>contact@feeltohome.com</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5 text-sm">
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
              <li>
                <Link href="/conditions" className="hover:text-brand-500 transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Housing Types */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">{t.footer.typesTitle}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.propertyTypes.HOTEL}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.propertyTypes.APPARTEMENT}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.propertyTypes.STUDIO}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.propertyTypes.VILLA}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.propertyTypes.RESIDENCE}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t.propertyTypes.AUBERGE}</span></li>
            </ul>
          </div>

          {/* Slogan & Note */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-brand-500">Slogan</span>
              <p className="text-lg font-bold text-white mt-1 italic">
                « {t.hero.slogan} »
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Réservation sécurisée de logements au Cameroun.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Mandatory Donayem Tech Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 FeelToHome. {t.footer.rights}</p>

          {/* MANDATORY FOOTER LINK */}
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
