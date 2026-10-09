'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';

export default function ConnexionPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    const identifier = email.trim().toLowerCase();

    setTimeout(() => {
      setLoading(false);
      // Check Admin credentials
      if ((identifier === 'donayen' || identifier === 'donayem' || identifier === 'admin' || identifier === 'admin@feeltohome.cm') && password === 'Donayem12#@') {
        setStatusMsg({
          type: 'success',
          text: 'Connexion Administrateur réussie ! Redirection vers le Tableau de Bord Admin...',
        });
        setTimeout(() => {
          router.push('/admin');
        }, 1200);
      } else if (email && password) {
        // Standard user demo login
        setStatusMsg({
          type: 'success',
          text: 'Connexion réussie ! Bienvenue sur FeelToHome.',
        });
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setStatusMsg({
          type: 'error',
          text: 'Veuillez saisir votre identifiant et mot de passe.',
        });
      }
    }, 600);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-none border border-slate-300 shadow-xs">
        
        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-none bg-brand-50 text-brand-600 mx-auto flex items-center justify-center border border-brand-200">
            <i className="fa-solid fa-house-chimney text-xl"></i>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.authPage.loginTitle}
          </h1>
          <p className="text-xs text-slate-500">
            {t.authPage.loginSubtitle}
          </p>
        </div>

        {/* Dynamic Status / Success / Error Banner */}
        {statusMsg && (
          <div
            className={`p-4 rounded-none border text-xs flex items-start gap-3 ${
              statusMsg.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                : 'bg-red-50 border-red-300 text-red-900 font-bold'
            }`}
          >
            <i
              className={`fa-solid ${
                statusMsg.type === 'success' ? 'fa-circle-check text-emerald-600' : 'fa-triangle-exclamation text-red-600'
              } text-base shrink-0 mt-0.5`}
            ></i>
            <div>
              <span>{statusMsg.text}</span>
            </div>
          </div>
        )}

        {/* Connexion Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Adresse e-mail, téléphone ou Nom d'utilisateur
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <i className="fa-solid fa-user text-xs"></i>
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: Donayen, ou votre.email@exemple.com"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t.authPage.passwordLabel}
              </label>
              <a href="#" className="text-[11px] font-semibold text-brand-600 hover:underline">
                {t.authPage.forgotPassword}
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <i className="fa-solid fa-lock text-xs"></i>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-none shadow-xs transition-all flex items-center justify-center gap-2 border border-brand-600 active:scale-98"
          >
            <i className="fa-solid fa-right-to-bracket text-xs"></i>
            <span>{t.authPage.loginSubmitBtn}</span>
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-200 text-xs text-slate-600">
          <span>{t.authPage.noAccountYet} </span>
          <Link href="/inscription" className="font-bold text-brand-600 hover:underline">
            {t.authPage.registerFreeLink}
          </Link>
        </div>

      </div>
    </div>
  );
}
