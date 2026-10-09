'use client';

import React from 'react';
import Link from 'next/link';

export default function AProposPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider mb-6">
              <i className="fa-solid fa-wand-magic-sparkles text-brand-400 text-sm"></i>
              <span>À Propos de FeelToHome</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              « Votre logement, votre sensation de chez vous »
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              FeelToHome est la plateforme technologique de référence pour la réservation de logements au Cameroun. Développée avec passion par <strong className="text-white">Donayem Tech</strong>, nous connectons les voyageurs avec les plus beaux hôtels, appartements meublés, studios, villas et résidences de Douala, Yaoundé, Kribi et Limbe.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/logements"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-none shadow-md transition-all border border-brand-600"
              >
                <span>Explorer les Logements</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-none border border-white/20 transition-all"
              >
                <span>Nous Contacter</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Mission Section */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-6">
              <div className="inline-block p-3 rounded-none bg-brand-50 text-brand-600 border border-brand-200">
                <i className="fa-solid fa-building text-2xl"></i>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Une Expérience de Réservation Moderne & Adaptée au Marché Camerounais
              </h2>
              <p className="text-slate-650 text-base leading-relaxed">
                Trouver un logement de vacances ou de travail au Cameroun ne devrait jamais être complexe ou incertain. FeelToHome résout ce problème en garantissant la transparence des tarifs en <strong>FCFA</strong>, la vérification rigoureuse des hébergements et le soutien des modes de paiement locaux comme <strong>Orange Money</strong>, <strong>MTN Mobile Money</strong>, la <strong>Carte Bancaire</strong> et le <strong>Paiement à l’arrivée</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-none bg-slate-50 border border-slate-300">
                  <i className="fa-solid fa-circle-check text-brand-500 text-base shrink-0 mt-0.5"></i>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">100% Vérifié</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Photos et équipements contrôlés</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-none bg-slate-50 border border-slate-300">
                  <i className="fa-solid fa-circle-check text-brand-500 text-base shrink-0 mt-0.5"></i>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Paiements Flexibles</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Mobile Money, CB ou Cash</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-slate-900 text-white p-6 rounded-none space-y-2 shadow-xs border border-slate-800">
                <span className="text-3xl sm:text-4xl font-black text-brand-400">6</span>
                <h3 className="font-bold text-sm">Types de Logements</h3>
                <p className="text-xs text-slate-400">Hôtels, Appartements, Studios, Villas, Résidences, Auberges.</p>
              </div>

              <div className="bg-brand-500 text-white p-6 rounded-none space-y-2 shadow-xs border border-brand-600">
                <span className="text-3xl sm:text-4xl font-black">4+</span>
                <h3 className="font-bold text-sm">Villes Clés</h3>
                <p className="text-xs text-brand-100">Douala, Yaoundé, Kribi, Limbe et extension nationale.</p>
              </div>

              <div className="bg-white p-6 rounded-none space-y-2 border border-slate-300 shadow-xs">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">24/7</span>
                <h3 className="font-bold text-sm text-slate-900">Assistance Clientèle</h3>
                <p className="text-xs text-slate-500">Support téléphonique et WhatsApp réactif.</p>
              </div>

              <div className="bg-slate-100 p-6 rounded-none space-y-2 border border-slate-300">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">0 FCFA</span>
                <h3 className="font-bold text-sm text-slate-900">Frais Cachés</h3>
                <p className="text-xs text-slate-500">Tarification directe et transparente.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values & Piliers */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">Nos Piliers d'Engagement</h2>
            <p className="mt-3 text-slate-600 text-sm">
              Pourquoi des milliers de voyageurs et propriétaires font confiance à FeelToHome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-none border border-slate-300 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-none bg-brand-50 text-brand-600 flex items-center justify-center font-bold border border-brand-200">
                <i className="fa-solid fa-shield-halved text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Sécurité & Réservation Garantie</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chaque réservation effectuée sur notre plateforme est garantie. Votre logement est prêt et conforme aux photos et descriptifs dès votre arrivée.
              </p>
            </div>

            <div className="bg-white p-8 rounded-none border border-slate-300 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-none bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-200">
                <i className="fa-solid fa-handshake text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Partenariat avec les Hôtes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nous accompagnons les propriétaires locaux dans la valorisation et la gestion professionnelle de leurs espaces pour maximiser leurs revenus.
              </p>
            </div>

            <div className="bg-white p-8 rounded-none border border-slate-300 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-none bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-200">
                <i className="fa-solid fa-award text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Propulsé par Donayem Tech</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conçu et maintenu par les équipes expertes de Donayem Tech / Donayem Digital, gage d'innovation, d'ergonomie et de sécurité informatique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Siège Social & Contact Quick Box */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-800 p-8 rounded-none border border-slate-700">
            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold text-brand-400 tracking-wider">Siège Social & Agence</span>
              <h3 className="text-xl font-bold">Retrouvez-nous à Douala, Cameroun</h3>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-brand-400 shrink-0"></i>
                <span>Ange Raphaël, Hôtel Le Select — Douala</span>
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-2 pt-1">
                <i className="fa-solid fa-phone text-brand-400 shrink-0"></i>
                <span>Lignes directes : 696580487 / 690247390 / 681181456</span>
              </p>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-none shadow-xs transition-all shrink-0 border border-brand-600"
            >
              Contactez Notre Équipe
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
