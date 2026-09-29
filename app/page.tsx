'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Hero } from '@/components/Hero';
import { PropertyTypeFilters } from '@/components/PropertyTypeFilters';
import { ListingCard } from '@/components/ListingCard';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { useLanguage } from '@/components/LanguageContext';
import { fetchLogements, LogementData } from '@/lib/api';
import { Zap, Wifi, Snowflake, ShieldCheck, ArrowRight, Info, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { t } = useLanguage();
  const [logements, setLogements] = useState<LogementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchLogements();
      setLogements(data);
    } catch (err) {
      console.error('API Fetch Error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <Hero />

      {/* Property Category Chips & Featured Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Suspense fallback={<div className="h-10 bg-slate-100 rounded-full animate-pulse" />}>
          <PropertyTypeFilters />
        </Suspense>

        {/* Demo Alert Banner per Reference Mockup */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3 text-amber-900 shadow-sm">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-bold block">Logements en démonstration</span>
            <p className="text-amber-800/90 leading-relaxed">
              Phase 1 — Données et tarifs de présentation pour validation visuelle et fonctionnelle du catalogue.
            </p>
          </div>
        </div>

        {/* Featured Listings Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Sélection phare
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Adresses de standing au Cameroun
            </p>
          </div>
          <Link
            href="/logements"
            className="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
          >
            <span>Tout voir</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dynamic API Data Renders per Rule #1 & Rule #14 */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState onRetry={loadData} />
        ) : logements.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {logements.map((logement) => (
              <ListingCard key={logement.id} listing={logement} />
            ))}
          </div>
        )}
      </section>

      {/* Reassurance Section (Correction #4.2: "Les essentiels pour un séjour confortable") */}
      <section className="bg-white border-y border-slate-200/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-brand-500">
              Le standard de confort FeelToHome
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {t.reassurance.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-2">
              {t.reassurance.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.reassurance.feat1Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t.reassurance.feat1Desc}</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center">
                <Wifi className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.reassurance.feat2Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t.reassurance.feat2Desc}</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center">
                <Snowflake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.reassurance.feat3Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t.reassurance.feat3Desc}</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.reassurance.feat4Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t.reassurance.feat4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Host CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-brand-700 to-brand-500 p-6 sm:p-10 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-brand-100">
              <Building2 className="w-3.5 h-3.5" />
              <span>Espace Bailleurs & Hôtes</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
              Vous êtes propriétaire au Cameroun ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Publiez votre bien sur FeelToHome. Bénéficiez d’une visibilité directe auprès de la diaspora, des touristes et des voyageurs d’affaires.
            </p>
            <div className="pt-2">
              <Link
                href="/proprietaire"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-brand-700 hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <span>Devenir hôte partenaire</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
