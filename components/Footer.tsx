'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-20 md:pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info & Coordinates */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-none bg-brand-500 text-white flex items-center justify-center font-bold shadow-xs">
                <i className="fa-solid fa-house-chimney text-lg"></i>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                FeelToHome
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              « {t.hero.slogan} » — {t.footer.aboutText}
            </p>
            
            <div className="pt-2 text-xs text-slate-300 space-y-2 border-t border-slate-800">
              <p className="flex items-start gap-2">
                <i className="fa-solid fa-location-dot text-brand-500 shrink-0 mt-0.5"></i>
                <span>Ange Raphaël, Hôtel Le Select — Douala, Cameroun</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-brand-500 shrink-0"></i>
                <a href="mailto:contact@feeltohome.com" className="hover:text-white transition-colors">
                  contact@feeltohome.com
                </a>
              </p>
              <p className="flex items-start gap-2">
                <i className="fa-solid fa-phone text-brand-500 shrink-0 mt-0.5"></i>
                <span className="font-semibold text-slate-200">
                  <a href="tel:+237696580487" className="hover:text-brand-400">696580487</a> / <a href="tel:+237681181456" className="hover:text-brand-400">681181456</a>
                </span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/" className="hover:text-brand-400 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/logements" className="hover:text-brand-400 transition-colors">
                  {t.nav.listings}
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-brand-400 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/devenir-hote" className="text-brand-400 font-bold hover:text-brand-300 transition-colors">
                  {t.nav.publishListing} ({t.homePage.becomeHostBtn})
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Housing Types & Cities */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t.footer.typesTitle}</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/logements?type=HOTEL" className="hover:text-white transition-colors">{t.propertyTypes.HOTEL} (Douala, Yaoundé)</Link></li>
              <li><Link href="/logements?type=APPARTEMENT" className="hover:text-white transition-colors">{t.propertyTypes.APPARTEMENT}</Link></li>
              <li><Link href="/logements?type=STUDIO" className="hover:text-white transition-colors">{t.propertyTypes.STUDIO}</Link></li>
              <li><Link href="/logements?type=VILLA" className="hover:text-white transition-colors">{t.propertyTypes.VILLA} (Kribi, Golf)</Link></li>
              <li><Link href="/logements?type=RESIDENCE" className="hover:text-white transition-colors">{t.propertyTypes.RESIDENCE}</Link></li>
              <li><Link href="/logements?type=AUBERGE" className="hover:text-white transition-colors">{t.propertyTypes.AUBERGE} (Limbe)</Link></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm">Modes de Paiement Acceptés</h4>
            
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="px-3 py-1.5 bg-orange-950/80 text-orange-400 border border-orange-800/60 rounded-none">Orange Money</span>
              <span className="px-3 py-1.5 bg-yellow-950/80 text-yellow-400 border border-yellow-800/60 rounded-none">MTN MoMo</span>
              <span className="px-3 py-1.5 bg-blue-950/80 text-blue-400 border border-blue-800/60 rounded-none">Carte Bancaire</span>
              <span className="px-3 py-1.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded-none">Paiement Arrivée</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {currentYear} FeelToHome (feeltohome.com). {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};
