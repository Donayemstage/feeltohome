'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function InscriptionPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    role: 'CLIENT',
  });
  const [notice, setNotice] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 bg-white p-8 rounded-none border border-slate-300 shadow-xs">
        
        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-none bg-brand-50 text-brand-600 mx-auto flex items-center justify-center border border-brand-200">
            <i className="fa-solid fa-user-plus text-xl"></i>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.authPage.registerTitle}
          </h1>
          <p className="text-xs text-slate-500">
            {t.authPage.registerSubtitle}
          </p>
        </div>

        {/* Info Banner */}
        {notice && (
          <div className="p-4 rounded-none bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3">
            <i className="fa-solid fa-circle-info text-amber-600 text-base shrink-0 mt-0.5"></i>
            <div>
              <span className="font-bold">{t.authPage.registerNoticeTitle}</span>
              <p className="mt-0.5 text-amber-700">
                {t.authPage.registerNoticeDesc}
              </p>
            </div>
          </div>
        )}

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-none border border-slate-200">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'CLIENT' })}
            className={`py-2 text-xs font-bold rounded-none transition-all flex items-center justify-center gap-1.5 ${
              formData.role === 'CLIENT'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-user text-xs"></i>
            <span>{t.authPage.clientRole}</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'PROPRIETAIRE' })}
            className={`py-2 text-xs font-bold rounded-none transition-all flex items-center justify-center gap-1.5 ${
              formData.role === 'PROPRIETAIRE'
                ? 'bg-brand-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-house-chimney text-xs"></i>
            <span>{t.authPage.hostRole}</span>
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.authPage.firstNameLabel}
              </label>
              <input
                type="text"
                name="prenom"
                required
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Jean"
                className="w-full px-3.5 py-2.5 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.authPage.lastNameLabel}
              </label>
              <input
                type="text"
                name="nom"
                required
                value={formData.nom}
                onChange={handleChange}
                placeholder="Dupont"
                className="w-full px-3.5 py-2.5 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.authPage.whatsappLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-phone text-xs"></i>
                </div>
                <input
                  type="tel"
                  name="telephone"
                  required
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="696580487"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.contactPage.emailLabelInput}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-envelope text-xs"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.authPage.passwordLabel}
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.authPage.confirmPasswordLabel}
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-none shadow-xs transition-all flex items-center justify-center gap-2 border border-brand-600 active:scale-98 mt-2"
          >
            <i className="fa-solid fa-user-plus text-xs"></i>
            <span>{t.authPage.registerSubmitBtn}</span>
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-200 text-xs text-slate-600">
          <span>{t.authPage.alreadyHaveAccount} </span>
          <Link href="/connexion" className="font-bold text-brand-600 hover:underline">
            {t.nav.login}
          </Link>
        </div>

      </div>
    </div>
  );
}
