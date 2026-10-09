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
                <a href="mailto:donayem.digital@gmail.com" className="hover:text-white transition-colors">
                  donayem.digital@gmail.com
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

          {/* Socials & Payment Methods */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm">Réseaux & Médias</h4>
            
            <div className="space-y-2 text-xs">
              <a
                href="https://www.facebook.com/profile.php?id=61593313402128&mibextid=rS40aB7S9Ucbxw6v"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-none bg-slate-800 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/50 transition-all text-slate-200 font-medium"
              >
                <i className="fa-brands fa-facebook text-blue-400 text-sm"></i>
                <span className="truncate">Facebook Officiel</span>
              </a>

              <a
                href="https://donayem.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-none bg-slate-800 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 transition-all text-slate-200 font-medium"
              >
                <i className="fa-brands fa-google text-emerald-400 text-sm"></i>
                <span className="truncate">Site Google (donayem.com)</span>
              </a>

              <div className="flex items-center gap-2.5 p-2 rounded-none bg-slate-800 border border-slate-700 text-slate-200 font-medium">
                <i className="fa-brands fa-tiktok text-pink-400 text-sm"></i>
                <span className="truncate">TikTok (Donayem Tech)</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Paiements Acceptés</span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                <span className="px-2 py-1 bg-orange-950/80 text-orange-400 border border-orange-800/60 rounded-none">Orange Money</span>
                <span className="px-2 py-1 bg-yellow-950/80 text-yellow-400 border border-yellow-800/60 rounded-none">MTN MoMo</span>
                <span className="px-2 py-1 bg-blue-950/80 text-blue-400 border border-blue-800/60 rounded-none">Carte Bancaire</span>
                <span className="px-2 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded-none">Arrivée</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {currentYear} FeelToHome (feeltohome.com). {t.footer.rights}</p>

          <p className="font-medium text-slate-300">
            {t.footer.realizedBy}{' '}
            <a
              href="https://donayem.com"
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
