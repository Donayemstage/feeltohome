'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: 'RESERVATION',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">

      {/* Hero Banner */}
      <section className="relative bg-slate-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider mb-4">
              <i className="fa-solid fa-wand-magic-sparkles text-brand-400 text-sm"></i>
              <span>{t.contactPage.tag}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {t.contactPage.title}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.contactPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Coordinates & Direct Actions */}
          <div className="space-y-6">
            
            {/* Direct Phone Lines Box */}
            <div className="bg-white p-6 rounded-none border border-slate-300 shadow-xs space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="w-10 h-10 rounded-none bg-brand-50 text-brand-600 flex items-center justify-center font-bold border border-brand-200">
                  <i className="fa-solid fa-phone text-base"></i>
                </div>
                <div>
                  <h3 className="font-bold text-sm">{t.contactPage.phoneTitle}</h3>
                  <p className="text-[11px] text-slate-500">{t.contactPage.phoneDesc}</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-200">
                <a
                  href="tel:+237696580487"
                  className="flex items-center justify-between p-3 rounded-none bg-slate-50 hover:bg-brand-50 hover:border-brand-300 border border-slate-200 transition-all text-xs font-bold text-slate-800 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none bg-emerald-500"></span>
                    <span>+237 696 58 04 87</span>
                  </div>
                  <span className="text-[10px] text-brand-600 font-extrabold group-hover:translate-x-0.5 transition-transform">Appeler / WhatsApp &rarr;</span>
                </a>

                <a
                  href="tel:+237681181456"
                  className="flex items-center justify-between p-3 rounded-none bg-slate-50 hover:bg-brand-50 hover:border-brand-300 border border-slate-200 transition-all text-xs font-bold text-slate-800 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none bg-emerald-500"></span>
                    <span>+237 681 18 14 56</span>
                  </div>
                  <span className="text-[10px] text-brand-600 font-extrabold group-hover:translate-x-0.5 transition-transform">Appeler / WhatsApp &rarr;</span>
                </a>
              </div>
            </div>

            {/* Email & Location Card */}
            <div className="bg-white p-6 rounded-none border border-slate-300 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-200">
                  <i className="fa-solid fa-location-dot text-base"></i>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{t.contactPage.locationTitle}</h3>
                  <p className="text-[11px] text-slate-500">Douala, Cameroun</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-200">
                <p className="font-medium flex items-start gap-2">
                  <i className="fa-solid fa-location-dot text-brand-500 shrink-0 mt-0.5"></i>
                  <span><strong>{t.contactPage.addressLabel}</strong> Ange Raphaël, Hôtel Le Select — Douala</span>
                </p>
                <p className="font-medium flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-brand-500 shrink-0"></i>
                  <span><strong>{t.contactPage.emailLabel}</strong> <a href="mailto:donayem.digital@gmail.com" className="text-brand-600 hover:underline">donayem.digital@gmail.com</a></span>
                </p>
              </div>
            </div>

            {/* Official Social Media Links Box */}
            <div className="bg-slate-900 text-white p-6 rounded-none shadow-xs border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm">{t.contactPage.socialTitle}</h3>
              
              <div className="space-y-2.5">
                <a
                  href="https://www.facebook.com/profile.php?id=61593313402128&mibextid=rS40aB7S9Ucbxw6v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-none bg-white/10 hover:bg-blue-600/30 border border-white/10 transition-all text-xs font-semibold"
                >
                  <i className="fa-brands fa-facebook text-lg text-blue-400"></i>
                  <div>
                    <p className="font-bold">{t.contactPage.facebookTitle}</p>
                    <p className="text-[10px] text-slate-400">FeelToHome / Donayem Tech</p>
                  </div>
                </a>

                <a
                  href="https://donayem.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-none bg-white/10 hover:bg-emerald-600/30 border border-white/10 transition-all text-xs font-semibold"
                >
                  <i className="fa-brands fa-google text-lg text-emerald-400"></i>
                  <div>
                    <p className="font-bold">{t.contactPage.googleTitle}</p>
                    <p className="text-[10px] text-slate-400">Portail Officiel Donayem</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-none bg-white/10 border border-white/10 text-xs font-semibold">
                  <i className="fa-brands fa-tiktok text-lg text-pink-400"></i>
                  <div>
                    <p className="font-bold">{t.contactPage.tiktokTitle}</p>
                    <p className="text-[10px] text-brand-300 font-bold">Donayem Tech</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Modes de paiement */}
            <div className="bg-white p-6 rounded-none border border-slate-300 shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">{t.contactPage.paymentsTitle}</h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-800">
                <div className="p-2.5 rounded-none bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-none bg-orange-500"></span>
                  <span>Orange Money</span>
                </div>
                <div className="p-2.5 rounded-none bg-yellow-50 text-yellow-800 border border-yellow-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-none bg-yellow-500"></span>
                  <span>MTN MoMo</span>
                </div>
                <div className="p-2.5 rounded-none bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-2">
                  <i className="fa-solid fa-credit-card text-xs"></i>
                  <span>Carte Bancaire</span>
                </div>
                <div className="p-2.5 rounded-none bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-2">
                  <i className="fa-solid fa-money-bill-wave text-xs"></i>
                  <span>Paiement Arrivée</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 sm:p-10 rounded-none border border-slate-300 shadow-xs">
              
              <div className="border-b border-slate-200 pb-6 mb-6">
                <h2 className="text-2xl font-bold text-slate-900">{t.contactPage.formTitle}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {t.contactPage.formSubtitle}
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-none bg-emerald-50 border border-emerald-300 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-none flex items-center justify-center mx-auto shadow-xs">
                    <i className="fa-solid fa-check text-xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900">{t.contactPage.successTitle}</h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                    {t.contactPage.successDesc}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-none hover:bg-emerald-700 transition-colors border border-emerald-700"
                  >
                    {t.contactPage.sendAnotherBtn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t.contactPage.fullNameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Jean Dupont"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t.contactPage.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: 696580487"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t.contactPage.emailLabelInput}
                      </label>
                      <input
                        type="email"
                        placeholder="votre.email@exemple.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t.contactPage.subjectLabel}
                      </label>
                      <select
                        value={formData.sujet}
                        onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-bold text-slate-800 cursor-pointer"
                      >
                        <option value="RESERVATION">{t.contactPage.subjectOption1}</option>
                        <option value="HOTE">{t.contactPage.subjectOption2}</option>
                        <option value="PAIEMENT">{t.contactPage.subjectOption3}</option>
                        <option value="AUTRE">{t.contactPage.subjectOption4}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t.contactPage.messageLabel}
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 resize-none font-semibold text-slate-800"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-none shadow-xs transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 border border-brand-600"
                  >
                    {loading ? (
                      <span>{t.contactPage.sendingBtn}</span>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane text-sm"></i>
                        <span>{t.contactPage.submitBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
