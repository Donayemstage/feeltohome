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
        <Suspense fallback={<div className="h-10 bg-slate-100 rounded-none animate-pulse" />}>
          <PropertyTypeFilters />
        </Suspense>

        {/* Demo Alert Banner */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-none p-4 flex items-start gap-3 text-amber-900 shadow-xs">
          <i className="fa-solid fa-circle-info text-amber-600 text-base shrink-0 mt-0.5"></i>
          <div className="text-xs space-y-0.5">
            <span className="font-bold block">{t.homePage.demoTitle}</span>
            <p className="text-amber-800/90 leading-relaxed">
              {t.homePage.demoDesc}
            </p>
          </div>
        </div>

        {/* Featured Listings Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {t.homePage.featuredTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.homePage.featuredSubtitle}
            </p>
          </div>
          <Link
            href="/logements"
            className="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
          >
            <span>{t.homePage.viewAll}</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>

        {/* Property Grid Results */}
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

      {/* Reassurance Section */}
      <section className="bg-white border-y border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-brand-500">
              {t.homePage.reassuranceTag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {t.reassurance.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-2">
              {t.reassurance.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-slate-50 p-5 rounded-none border border-slate-200 space-y-2.5">
              <div className="w-10 h-10 rounded-none bg-brand-500/10 text-brand-600 flex items-center justify-center border border-brand-200">
                <i className="fa-solid fa-bolt text-lg"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.reassurance.feat1Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t.reassurance.feat1Desc}</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-none border border-slate-200 space-y-2.5">
              <div className="w-10 h-10 rounded-none bg-brand-500/10 text-brand-600 flex items-center justify-center border border-brand-200">
                <i className="fa-solid fa-wifi text-lg"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.reassurance.feat2Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t.reassurance.feat2Desc}</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-none border border-slate-200 space-y-2.5">
              <div className="w-10 h-10 rounded-none bg-brand-500/10 text-brand-600 flex items-center justify-center border border-brand-200">
                <i className="fa-solid fa-snowflake text-lg"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.reassurance.feat3Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t.reassurance.feat3Desc}</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-none border border-slate-200 space-y-2.5">
              <div className="w-10 h-10 rounded-none bg-brand-500/10 text-brand-600 flex items-center justify-center border border-brand-200">
                <i className="fa-solid fa-shield-halved text-lg"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.reassurance.feat4Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t.reassurance.feat4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Host CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-none bg-slate-900 border border-slate-800 p-6 sm:p-10 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-none text-xs font-semibold text-brand-300 border border-white/10">
              <i className="fa-solid fa-building text-xs"></i>
              <span>{t.homePage.hostTag}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
              {t.homePage.hostTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.homePage.hostDesc}
            </p>
            <div className="pt-2">
              <Link
                href="/devenir-hote"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-none shadow-xs transition-all border border-brand-600"
              >
                <span>{t.homePage.becomeHostBtn}</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
