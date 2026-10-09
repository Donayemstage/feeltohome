'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';

export default function DevenirHotePage() {
  const { t } = useLanguage();

  const [propertyType, setPropertyType] = useState('APPARTEMENT');
  const [city, setCity] = useState('Douala');
  const [nightlyRate, setNightlyRate] = useState(35000);
  const [estimatedNights, setEstimatedNights] = useState(15);

  const estimatedMonthlyIncome = nightlyRate * estimatedNights;

  const [submitted, setSubmitted] = useState(false);
  const [hostForm, setHostForm] = useState({
    nom: '',
    telephone: '',
    ville: 'Douala',
    quartier: '',
    type: 'APPARTEMENT',
    prix_souhaite: '',
  });

  const handleHostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">

      {/* Hero Banner */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider mb-6">
              <i className="fa-solid fa-wand-magic-sparkles text-brand-400 text-sm"></i>
              <span>{t.devenirHotePage.tag}</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {t.devenirHotePage.heroTitle}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              {t.devenirHotePage.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Calculator & Form Section */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* FCFA Income Calculator Card */}
        <div className="bg-white p-8 sm:p-12 rounded-none border border-slate-300 shadow-xs space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-none bg-brand-50 text-brand-600 flex items-center justify-center font-bold border border-brand-200">
              <i className="fa-solid fa-calculator text-xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">{t.devenirHotePage.calculatorTitle}</h2>
              <p className="text-xs text-slate-500">{t.devenirHotePage.calculatorSubtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.devenirHotePage.cityLabel}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-none text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    <option value="Douala">Douala</option>
                    <option value="Yaoundé">Yaoundé</option>
                    <option value="Kribi">Kribi</option>
                    <option value="Limbe">Limbe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.devenirHotePage.typeLabel}
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-none text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    <option value="HOTEL">{t.propertyTypes.HOTEL}</option>
                    <option value="APPARTEMENT">{t.propertyTypes.APPARTEMENT}</option>
                    <option value="STUDIO">{t.propertyTypes.STUDIO}</option>
                    <option value="VILLA">{t.propertyTypes.VILLA}</option>
                    <option value="RESIDENCE">{t.propertyTypes.RESIDENCE}</option>
                  </select>
                </div>
              </div>

              {/* Nightly rate range */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>{t.devenirHotePage.nightlyRateLabel}</span>
                  <span className="text-brand-600 font-extrabold">{nightlyRate.toLocaleString('fr-FR')} XAF {t.catalog.perNight}</span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="150000"
                  step="2500"
                  value={nightlyRate}
                  onChange={(e) => setNightlyRate(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
              </div>

              {/* Nights booked range */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>{t.devenirHotePage.nightsLabel}</span>
                  <span className="text-brand-600 font-extrabold">{estimatedNights} nuits</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="30"
                  step="1"
                  value={estimatedNights}
                  onChange={(e) => setEstimatedNights(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
              </div>

            </div>

            {/* Income Result Box */}
            <div className="bg-slate-900 text-white p-8 rounded-none border border-slate-800 space-y-4 text-center">
              <span className="text-xs uppercase font-extrabold text-brand-400 tracking-wider">{t.devenirHotePage.estimatedIncomeTitle}</span>
              <div className="text-3xl sm:text-4xl font-black text-brand-400">
                {estimatedMonthlyIncome.toLocaleString('fr-FR')} FCFA
              </div>
              <p className="text-[11px] text-slate-400">
                {t.devenirHotePage.estimatedIncomeNotice} {Math.round((estimatedNights / 30) * 100)}% ({city}).
              </p>
            </div>
          </div>
        </div>

        {/* Host Submission Form Card */}
        <div className="bg-white p-8 sm:p-12 rounded-none border border-slate-300 shadow-xs space-y-8 max-w-3xl mx-auto">
          <div className="border-b border-slate-200 pb-6 text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">{t.devenirHotePage.formTitle}</h2>
            <p className="text-xs text-slate-500">
              {t.devenirHotePage.formSubtitle}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-none bg-emerald-50 border border-emerald-300 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-none flex items-center justify-center mx-auto shadow-xs">
                <i className="fa-solid fa-check text-2xl"></i>
              </div>
              <h3 className="text-xl font-extrabold text-emerald-900">Demande de Partenariat Transmise avec Succès !</h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-lg mx-auto font-medium">
                Merci <strong>{hostForm.nom || 'Cher Partenaire'}</strong> ! Votre candidature pour votre bien à <strong>{hostForm.ville} ({hostForm.quartier || 'Quartier'})</strong> a bien été enregistrée dans notre système.
              </p>
              <div className="bg-white p-4 border border-emerald-200 text-left text-xs text-slate-700 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-user-gear text-brand-600"></i>
                  <span>Activation de votre Espace Hôte Partenaire :</span>
                </div>
                <p className="text-slate-600">
                  1. Un conseiller <strong>Donayem Tech</strong> vérifie vos coordonnées (contact direct sous 24h au <strong>{hostForm.telephone}</strong>).<br />
                  2. Une fois votre compte validé, vous accédez à votre <strong>Tableau de Bord Propriétaire personnel</strong> pour ajouter, modifier vos photos et suivre vos réservations en temps réel.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleHostSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.devenirHotePage.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Paul Mbenga"
                    value={hostForm.nom}
                    onChange={(e) => setHostForm({ ...hostForm, nom: e.target.value })}
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
                    value={hostForm.telephone}
                    onChange={(e) => setHostForm({ ...hostForm, telephone: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.devenirHotePage.cityLabel}
                  </label>
                  <select
                    value={hostForm.ville}
                    onChange={(e) => setHostForm({ ...hostForm, ville: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="Douala">Douala</option>
                    <option value="Yaoundé">Yaoundé</option>
                    <option value="Kribi">Kribi</option>
                    <option value="Limbe">Limbe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.devenirHotePage.quartierLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Bonapriso, Akwa, Bastos..."
                    value={hostForm.quartier}
                    onChange={(e) => setHostForm({ ...hostForm, quartier: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.devenirHotePage.typeLabel}
                  </label>
                  <select
                    value={hostForm.type}
                    onChange={(e) => setHostForm({ ...hostForm, type: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="HOTEL">{t.propertyTypes.HOTEL}</option>
                    <option value="APPARTEMENT">{t.propertyTypes.APPARTEMENT}</option>
                    <option value="STUDIO">{t.propertyTypes.STUDIO}</option>
                    <option value="VILLA">{t.propertyTypes.VILLA}</option>
                    <option value="RESIDENCE">{t.propertyTypes.RESIDENCE}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.devenirHotePage.desiredPriceLabel}
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 35000"
                    value={hostForm.prix_souhaite}
                    onChange={(e) => setHostForm({ ...hostForm, prix_souhaite: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-semibold text-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-none shadow-xs transition-all flex items-center justify-center gap-2 border border-brand-600 active:scale-98"
              >
                <i className="fa-solid fa-house-medical text-sm"></i>
                <span>{t.devenirHotePage.submitHostBtn}</span>
              </button>
            </form>
          )}
        </div>

      </section>

    </div>
  );
}
