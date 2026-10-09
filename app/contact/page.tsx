'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle, Globe, Sparkles, CreditCard, ShieldCheck, Clock } from 'lucide-react';

export default function ContactPage() {
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
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-slate-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Assistance & Contact</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Contactez l'Équipe FeelToHome
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Une question sur une réservation, un logement ou une demande de partenariat ? Nos conseillers basés à Douala sont à votre écoute 7j/7.
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
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Téléphones & WhatsApp</h3>
                  <p className="text-[11px] text-slate-500">Lignes directes réactives</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <a
                  href="tel:+237696580487"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-brand-50 hover:border-brand-200 border border-slate-200/70 transition-all text-xs font-bold text-slate-800 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>+237 696 58 04 87</span>
                  </div>
                  <span className="text-[10px] text-brand-600 font-extrabold group-hover:translate-x-0.5 transition-transform">Appeler / WhatsApp &rarr;</span>
                </a>

                <a
                  href="tel:+237690247390"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-brand-50 hover:border-brand-200 border border-slate-200/70 transition-all text-xs font-bold text-slate-800 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>+237 690 24 73 90</span>
                  </div>
                  <span className="text-[10px] text-brand-600 font-extrabold group-hover:translate-x-0.5 transition-transform">Appeler / WhatsApp &rarr;</span>
                </a>

                <a
                  href="tel:+237681181456"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-brand-50 hover:border-brand-200 border border-slate-200/70 transition-all text-xs font-bold text-slate-800 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>+237 681 18 14 56</span>
                  </div>
                  <span className="text-[10px] text-brand-600 font-extrabold group-hover:translate-x-0.5 transition-transform">Appeler / WhatsApp &rarr;</span>
                </a>
              </div>
            </div>

            {/* Email & Location Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Localisation du Siège</h3>
                  <p className="text-[11px] text-slate-500">Douala, Cameroun</p>
                </div>
              </div>

              <div className="text-xs text-slate-650 space-y-2 pt-2 border-t border-slate-100">
                <p className="font-medium flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span><strong>Adresse :</strong> Ange Raphaël, Hôtel Le Select — Douala</span>
                </p>
                <p className="font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                  <span><strong>Email :</strong> <a href="mailto:donayem.digital@gmail.com" className="text-brand-600 hover:underline">donayem.digital@gmail.com</a></span>
                </p>
              </div>
            </div>

            {/* Official Social Media Links Box with Logos */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-md space-y-4">
              <h3 className="font-bold text-sm">Suivez-nous sur les Réseaux</h3>
              
              <div className="space-y-2.5">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61593313402128&mibextid=rS40aB7S9Ucbxw6v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-blue-600/30 border border-white/10 transition-all text-xs font-semibold"
                >
                  <svg className="w-5 h-5 text-blue-400 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <div>
                    <p className="font-bold">Facebook Officiel</p>
                    <p className="text-[10px] text-slate-400">FeelToHome / Donayem Tech</p>
                  </div>
                </a>

                {/* Google Website */}
                <a
                  href="https://donayem.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-emerald-600/30 border border-white/10 transition-all text-xs font-semibold"
                >
                  <svg className="w-5 h-5 text-emerald-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 1 0 22 12 A10 10 0 0 0 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1a2 2 0 0 0 2 2v1.93zm6.9-2.54A1.99 1.99 0 0 0 16 16h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41A7.98 7.98 0 0 1 19.9 12c0 1.99-.73 3.81-1.9 5.39z"/>
                  </svg>
                  <div>
                    <p className="font-bold">Site Web Google (donayem.com)</p>
                    <p className="text-[10px] text-slate-400">Portail Officiel Donayem</p>
                  </div>
                </a>

                {/* TikTok */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold">
                  <svg className="w-5 h-5 text-pink-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.56-1.28 2.56.02 1.01.54 1.96 1.37 2.49.88.56 2.03.62 2.96.18.91-.43 1.56-1.32 1.63-2.33.07-2.92.03-5.84.04-8.75z"/>
                  </svg>
                  <div>
                    <p className="font-bold">TikTok Officiel</p>
                    <p className="text-[10px] text-brand-300 font-bold">Donayem Tech</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Modes de paiement */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Modes de Paiement Acceptés</h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-800">
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>Orange Money</span>
                </div>
                <div className="p-2.5 rounded-xl bg-yellow-50 text-yellow-800 border border-yellow-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span>MTN MoMo</span>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Carte Bancaire</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Paiement Arrivée</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
              
              <div className="border-b border-slate-100 pb-6 mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Envoyez-nous un Message</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Remplissez ce formulaire et notre équipe à Douala vous répondra sous 30 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900">Message Envoyé avec Succès !</h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                    Merci d'avoir contacté FeelToHome. Un conseiller client vous recontactera très rapidement par téléphone ou e-mail.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Jean Dupont"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Numéro de téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: 696580487"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Adresse e-mail
                      </label>
                      <input
                        type="email"
                        placeholder="votre.email@exemple.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Objet de votre demande
                      </label>
                      <select
                        value={formData.sujet}
                        onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-slate-50 font-medium"
                      >
                        <option value="RESERVATION">Réservation d'un logement</option>
                        <option value="HOTE">Devenir Hôte / Publier un logement</option>
                        <option value="PAIEMENT">Question sur un paiement (OM / MoMo)</option>
                        <option value="AUTRE">Autre demande</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Votre Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Précisez votre demande, les dates souhaitées ou la ville..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-slate-50 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Envoi en cours...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Envoyer le Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
