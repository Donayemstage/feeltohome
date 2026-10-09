'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ConnexionPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(true);
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
            Connexion
          </h1>
          <p className="text-xs text-slate-500">
            Accédez à votre espace FeelToHome
          </p>
        </div>

        {/* Info Banner for Phase 1 */}
        {notice && (
          <div className="p-4 rounded-none bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3">
            <i className="fa-solid fa-circle-info text-amber-600 text-base shrink-0 mt-0.5"></i>
            <div>
              <span className="font-bold">Fonctionnalité bientôt disponible :</span>
              <p className="mt-0.5 text-amber-700">
                La connexion par identifiants uniques sera active lors de la mise en production officielle des comptes utilisateurs.
              </p>
            </div>
          </div>
        )}

        {/* Connexion Form (Square Borders) */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Adresse e-mail ou téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <i className="fa-solid fa-envelope text-xs"></i>
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.com ou 696..."
                className="w-full pl-10 pr-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mot de passe
              </label>
              <a href="#" className="text-[11px] font-semibold text-brand-600 hover:underline">
                Oublié ?
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
            <span>Se connecter</span>
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-200 text-xs text-slate-600">
          <span>Vous n'avez pas encore de compte ? </span>
          <Link href="/inscription" className="font-bold text-brand-600 hover:underline">
            S'inscrire gratuitement
          </Link>
        </div>

      </div>
    </div>
  );
}
