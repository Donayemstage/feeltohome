'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function AProposPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider mb-6">
              <i className="fa-solid fa-wand-magic-sparkles text-brand-400 text-sm"></i>
              <span>{t.aboutPage.tag}</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {t.aboutPage.title}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              {t.aboutPage.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/logements"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-none shadow-md transition-all border border-brand-600"
              >
                <span>{t.aboutPage.exploreBtn}</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-none border border-white/20 transition-all"
              >
                <span>{t.aboutPage.contactBtn}</span>
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
                {t.aboutPage.missionTitle}
              </h2>
              <p className="text-slate-650 text-base leading-relaxed">
                {t.aboutPage.missionDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-none bg-slate-50 border border-slate-300">
                  <i className="fa-solid fa-circle-check text-brand-500 text-base shrink-0 mt-0.5"></i>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{t.aboutPage.verifiedTitle}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{t.aboutPage.verifiedDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-none bg-slate-50 border border-slate-300">
                  <i className="fa-solid fa-circle-check text-brand-500 text-base shrink-0 mt-0.5"></i>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{t.aboutPage.flexiblePaymentsTitle}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{t.aboutPage.flexiblePaymentsDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-slate-900 text-white p-6 rounded-none space-y-2 shadow-xs border border-slate-800">
                <span className="text-3xl sm:text-4xl font-black text-brand-400">6</span>
                <h3 className="font-bold text-sm">{t.aboutPage.statsTypes}</h3>
                <p className="text-xs text-slate-400">Hôtels, Appartements, Studios, Villas, Résidences, Auberges.</p>
              </div>

              <div className="bg-brand-500 text-white p-6 rounded-none space-y-2 shadow-xs border border-brand-600">
                <span className="text-3xl sm:text-4xl font-black">4+</span>
                <h3 className="font-bold text-sm">{t.aboutPage.statsCities}</h3>
                <p className="text-xs text-brand-100">Douala, Yaoundé, Kribi, Limbe.</p>
              </div>

              <div className="bg-white p-6 rounded-none space-y-2 border border-slate-300 shadow-xs">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">24/7</span>
                <h3 className="font-bold text-sm text-slate-900">{t.aboutPage.statsSupport}</h3>
                <p className="text-xs text-slate-500">Support téléphonique et WhatsApp.</p>
              </div>

              <div className="bg-slate-100 p-6 rounded-none space-y-2 border border-slate-300">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">0 FCFA</span>
                <h3 className="font-bold text-sm text-slate-900">{t.aboutPage.statsNoFees}</h3>
                <p className="text-xs text-slate-500">Tarification transparente.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values & Piliers */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">{t.aboutPage.piliersTitle}</h2>
            <p className="mt-3 text-slate-600 text-sm">
              {t.aboutPage.piliersSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-none border border-slate-300 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-none bg-brand-50 text-brand-600 flex items-center justify-center font-bold border border-brand-200">
                <i className="fa-solid fa-shield-halved text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.aboutPage.pilier1Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.aboutPage.pilier1Desc}
              </p>
            </div>

            <div className="bg-white p-8 rounded-none border border-slate-300 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-none bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-200">
                <i className="fa-solid fa-handshake text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.aboutPage.pilier2Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.aboutPage.pilier2Desc}
              </p>
            </div>

            <div className="bg-white p-8 rounded-none border border-slate-300 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-none bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-200">
                <i className="fa-solid fa-award text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.aboutPage.pilier3Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.aboutPage.pilier3Desc}
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
              <span className="text-xs uppercase font-extrabold text-brand-400 tracking-wider">{t.aboutPage.headquartersTag}</span>
              <h3 className="text-xl font-bold">{t.aboutPage.headquartersTitle}</h3>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-brand-400 shrink-0"></i>
                <span>Ange Raphaël, Hôtel Le Select — Douala</span>
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-2 pt-1">
                <i className="fa-solid fa-phone text-brand-400 shrink-0"></i>
                <span>{t.aboutPage.headquartersLines} 696580487 / 690247390 / 681181456</span>
              </p>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-none shadow-xs transition-all shrink-0 border border-brand-600"
            >
              {t.aboutPage.contactTeamBtn}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
