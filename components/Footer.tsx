'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { Mail, MapPin, Phone, CreditCard, ShieldCheck, ExternalLink } from 'lucide-react';

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
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold shadow-md shadow-brand-500/30">
                <span className="material-symbols-outlined text-[24px]">roofing</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                FeelToHome
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              « Votre logement, votre sensation de chez vous » — Plateforme de réservation de logements de confiance au Cameroun.
            </p>
            
            <div className="pt-2 text-xs text-slate-300 space-y-2 border-t border-slate-800">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>Ange Raphaël, Hôtel Le Select — Douala, Cameroun</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="mailto:donayem.digital@gmail.com" className="hover:text-white transition-colors">
                  donayem.digital@gmail.com
                </a>
              </p>
              <p className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-200">
                  <a href="tel:+237696580487" className="hover:text-brand-400">696580487</a> / <a href="tel:+237690247390" className="hover:text-brand-400">690247390</a> / <a href="tel:+237681181456" className="hover:text-brand-400">681181456</a>
                </span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Navigation Rapide</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link href="/logements" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <span>Tous les Logements</span>
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <span>À Propos de FeelToHome</span>
                </Link>
              </li>
              <li>
                <Link href="/devenir-hote" className="text-brand-400 font-bold hover:text-brand-300 transition-colors flex items-center gap-1.5">
                  <span>Publier un Logement (Devenir Hôte)</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <span>Nous Contacter</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Housing Types & Cities */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Logements au Cameroun</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/logements?type=HOTEL" className="hover:text-white transition-colors">Hôtels (Douala, Yaoundé)</Link></li>
              <li><Link href="/logements?type=APPARTEMENT" className="hover:text-white transition-colors">Appartements meublés</Link></li>
              <li><Link href="/logements?type=STUDIO" className="hover:text-white transition-colors">Studios modernes</Link></li>
              <li><Link href="/logements?type=VILLA" className="hover:text-white transition-colors">Villas de luxe (Kribi, Golf)</Link></li>
              <li><Link href="/logements?type=RESIDENCE" className="hover:text-white transition-colors">Résidences privées</Link></li>
              <li><Link href="/logements?type=AUBERGE" className="hover:text-white transition-colors">Auberges & Lodges (Limbe)</Link></li>
            </ul>
          </div>

          {/* Socials with Logos & Payment Methods */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm">Suivez-nous & Réseaux</h4>
            
            {/* Social Media Logos */}
            <div className="space-y-2 text-xs">
              {/* Facebook Logo Link */}
              <a
                href="https://www.facebook.com/profile.php?id=61593313402128&mibextid=rS40aB7S9Ucbxw6v"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/50 transition-all text-slate-200"
              >
                <svg className="w-4 h-4 text-blue-400 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="font-semibold text-xs truncate">Facebook Officiel</span>
              </a>

              {/* Google / Website Logo Link */}
              <a
                href="https://donayem.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 transition-all text-slate-200"
              >
                <svg className="w-4 h-4 text-emerald-400 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 1 0 22 12 A10 10 0 0 0 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1a2 2 0 0 0 2 2v1.93zm6.9-2.54A1.99 1.99 0 0 0 16 16h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41A7.98 7.98 0 0 1 19.9 12c0 1.99-.73 3.81-1.9 5.39z"/>
                </svg>
                <span className="font-semibold text-xs truncate">Site Google (donayem.com)</span>
              </a>

              {/* TikTok Logo */}
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200">
                <svg className="w-4 h-4 text-pink-400 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.56-1.28 2.56.02 1.01.54 1.96 1.37 2.49.88.56 2.03.62 2.96.18.91-.43 1.56-1.32 1.63-2.33.07-2.92.03-5.84.04-8.75z"/>
                </svg>
                <span className="font-semibold text-xs truncate">TikTok (Donayem Tech)</span>
              </div>
            </div>

            {/* Payment Methods Badges */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Paiements Acceptés</span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                <span className="px-2 py-1 bg-orange-950/80 text-orange-400 border border-orange-800/60 rounded-lg">Orange Money</span>
                <span className="px-2 py-1 bg-yellow-950/80 text-yellow-400 border border-yellow-800/60 rounded-lg">MTN MoMo</span>
                <span className="px-2 py-1 bg-blue-950/80 text-blue-400 border border-blue-800/60 rounded-lg">Carte Bancaire</span>
                <span className="px-2 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded-lg">Arrivée</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Copyright & MANDATORY Donayem Tech Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {currentYear} FeelToHome (feeltohome.com). Tous droits réservés au Cameroun.</p>

          <p className="font-medium text-slate-300">
            Réalisé par{' '}
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
