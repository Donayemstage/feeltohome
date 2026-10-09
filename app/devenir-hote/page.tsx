'use client';

import React, { useState } from 'react';

export default function DevenirHotePage() {
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
              <span>Devenez Hôte Partner FeelToHome</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Rentabilisez Votre Logement au Cameroun en toute Sérénité
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              Publiez votre hôtel, appartement meublé, studio ou villa sur FeelToHome et touchez des milliers de voyageurs et professionnels à Douala, Yaoundé, Kribi et Limbe.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator & Form Section */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* FCFA Income Calculator Card (Square Borders) */}
        <div className="bg-white p-8 sm:p-12 rounded-none border border-slate-300 shadow-xs space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-none bg-brand-50 text-brand-600 flex items-center justify-center font-bold border border-brand-200">
              <i className="fa-solid fa-calculator text-xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Simulateur de Revenus FCFA</h2>
              <p className="text-xs text-slate-500">Estimez vos gains mensuels selon vos critères d'accueil.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Ville du Logement
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
                    Type de bien
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-none text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    <option value="HOTEL">Hôtel / Auberge</option>
                    <option value="APPARTEMENT">Appartement Meublé</option>
                    <option value="STUDIO">Studio Meublé</option>
                    <option value="VILLA">Villa de Luxe</option>
                    <option value="RESIDENCE">Résidence</option>
                  </select>
                </div>
              </div>

              {/* Nightly rate range */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Prix moyen par nuit :</span>
                  <span className="text-brand-600 font-extrabold">{nightlyRate.toLocaleString('fr-FR')} XAF / nuit</span>
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
                  <span>Nuits réservées par mois :</span>
                  <span className="text-brand-600 font-extrabold">{estimatedNights} nuits / mois</span>
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
              <span className="text-xs uppercase font-extrabold text-brand-400 tracking-wider">Revenu Mensuel Estimé</span>
              <div className="text-3xl sm:text-4xl font-black text-brand-400">
                {estimatedMonthlyIncome.toLocaleString('fr-FR')} FCFA
              </div>
              <p className="text-[11px] text-slate-400">
                Basé sur un taux d'occupation de {Math.round((estimatedNights / 30) * 100)}% à {city}.
              </p>
            </div>
          </div>
        </div>

        {/* Host Submission Form Card (Square Borders everywhere) */}
        <div className="bg-white p-8 sm:p-12 rounded-none border border-slate-300 shadow-xs space-y-8 max-w-3xl mx-auto">
          <div className="border-b border-slate-200 pb-6 text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Inscrire Votre Logement</h2>
            <p className="text-xs text-slate-500">
              Remplissez ces informations et un conseiller Donayem Tech validera votre annonce sous 24h.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-none bg-emerald-50 border border-emerald-300 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-none flex items-center justify-center mx-auto shadow-xs">
                <i className="fa-solid fa-check text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-emerald-900">Demande d'Hôte Transmise !</h3>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Merci {hostForm.nom}. Votre bien à {hostForm.ville} ({hostForm.quartier}) est en cours de vérification. Notre équipe vous contactera au {hostForm.telephone}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleHostSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Votre Nom Complet *
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
                    Numéro de Téléphone *
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
                    Ville du Logement *
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
                    Quartier / Emplacement *
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
                    Type de Logement
                  </label>
                  <select
                    value={hostForm.type}
                    onChange={(e) => setHostForm({ ...hostForm, type: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-none border border-slate-300 focus:outline-none focus:border-brand-500 bg-slate-50 font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="HOTEL">Hôtel / Auberge</option>
                    <option value="APPARTEMENT">Appartement Meublé</option>
                    <option value="STUDIO">Studio Meublé</option>
                    <option value="VILLA">Villa de Luxe</option>
                    <option value="RESIDENCE">Résidence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Tarif Souhaité (FCFA / nuit)
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
                <span>Soumettre mon Logement</span>
              </button>
            </form>
          )}
        </div>

      </section>

    </div>
  );
}
