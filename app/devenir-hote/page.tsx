'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Building2, ShieldCheck, Banknote, Sparkles, CheckCircle, Phone, ArrowRight, Calculator, Home, Star } from 'lucide-react';

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
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Espace Hôte & Propriétaire</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Rentabilisez Votre Logement au Cameroun avec FeelToHome
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Publiez votre hôtel, appartement meublé, studio, villa, résidence ou auberge en quelques minutes et touchez des milliers de voyageurs à Douala, Yaoundé, Kribi et Limbe.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#formulaire-hote"
                className="px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all hover:scale-105 active:scale-95"
              >
                Inscrire Mon Logement Gratuitement
              </a>
              <a
                href="#simulateur"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all"
              >
                Calculer Mes Revenus
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="simulateur" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase">
                <Calculator className="w-4 h-4" />
                <span>Simulateur de Revenus FCFA</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Combien pouvez-vous gagner par mois ?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ajustez votre prix par nuit et le nombre de nuits réservées pour estimer vos revenus mensuels potentiels.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Prix par nuit :</span>
                    <span className="text-brand-400 font-extrabold text-sm">{nightlyRate.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="200000"
                    step="5000"
                    value={nightlyRate}
                    onChange={(e) => setNightlyRate(Number(e.target.value))}
                    className="w-full accent-brand-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Nuits réservées / mois :</span>
                    <span className="text-brand-400 font-extrabold text-sm">{estimatedNights} nuits</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={estimatedNights}
                    onChange={(e) => setEstimatedNights(Number(e.target.value))}
                    className="w-full accent-brand-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Income Display Box */}
            <div className="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 text-center space-y-4 shadow-xl">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Revenu Mensuel Estimé</span>
              <div className="text-4xl sm:text-5xl font-black text-brand-400 tracking-tight">
                {estimatedMonthlyIncome.toLocaleString('fr-FR')} <span className="text-xl text-white font-bold">FCFA</span>
              </div>
              <p className="text-xs text-slate-300">
                Paiement direct via Orange Money, MTN Mobile Money ou virement bancaire.
              </p>
              <a
                href="#formulaire-hote"
                className="inline-block w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all mt-4"
              >
                Publier Mon Logement Maintenant
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Host Advantages Grid */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">Pourquoi Publier sur FeelToHome ?</h2>
            <p className="mt-3 text-slate-600 text-sm">
              La solution pensée pour les propriétaires et gestionnaires d'hébergements au Cameroun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                <Banknote className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">0 FCFA Frais d'Inscription</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                La création et la publication de vos annonces sont 100% gratuites. Aucun abonnement mensuel caché.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Paiements Sécurisés & Instantanés</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recevez vos gains directement par Orange Money, MTN MoMo ou espèces dès le premier jour d’arrivée du client.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Support Dédié aux Hôtes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Un conseiller local FeelToHome à Douala (Ange Raphaël) vous assiste pour la prise de vue et l'optimisation de vos tarifs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Host Registration Form */}
      <section id="formulaire-hote" className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
            
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase font-extrabold text-brand-600 tracking-wider">Formulaire Rapide</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Inscrire Mon Logement</h2>
              <p className="text-xs text-slate-500 mt-2">
                Complétez ces informations et notre équipe hôtes à Douala vous rappellera dans les 2 heures.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Demande d'Inscription Reçue !</h3>
                <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                  Merci ! Votre demande d'inscription d'hébergement a bien été transmise à l'équipe FeelToHome. Un conseiller vous contactera sur le <strong>{hostForm.telephone}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleHostSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Paul Atangana"
                      value={hostForm.nom}
                      onChange={(e) => setHostForm({ ...hostForm, nom: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Numéro de téléphone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: 696580487"
                      value={hostForm.telephone}
                      onChange={(e) => setHostForm({ ...hostForm, telephone: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Ville *
                    </label>
                    <select
                      value={hostForm.ville}
                      onChange={(e) => setHostForm({ ...hostForm, ville: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Douala">Douala</option>
                      <option value="Yaoundé">Yaoundé</option>
                      <option value="Kribi">Kribi</option>
                      <option value="Limbe">Limbe</option>
                      <option value="Autre">Autre ville</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Type de logement *
                    </label>
                    <select
                      value={hostForm.type}
                      onChange={(e) => setHostForm({ ...hostForm, type: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="HOTEL">Hôtel</option>
                      <option value="APPARTEMENT">Appartement meublé</option>
                      <option value="STUDIO">Studio</option>
                      <option value="VILLA">Villa</option>
                      <option value="RESIDENCE">Résidence</option>
                      <option value="AUBERGE">Auberge</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Prix par nuit (FCFA)
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 35000"
                      value={hostForm.prix_souhaite}
                      onChange={(e) => setHostForm({ ...hostForm, prix_souhaite: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Soumettre Mon Hébergement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
              <span>Besoin d'aide immédiate ? Contactez le support hôtes : </span>
              <a href="tel:+237696580487" className="font-bold text-brand-600 hover:underline">696580487</a> / <a href="tel:+237690247390" className="font-bold text-brand-600 hover:underline">690247390</a> / <a href="tel:+237681181456" className="font-bold text-brand-600 hover:underline">681181456</a>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
