'use client';

import React from 'react';
import { Hero } from '@/components/Hero';
import { ListingCard, ListingProps } from '@/components/ListingCard';
import { useLanguage } from '@/components/LanguageContext';
import { ShieldCheck, CreditCard, Headphones, Sparkles, Building2 } from 'lucide-react';

const DEMO_LISTINGS: ListingProps[] = [
  {
    id: 1,
    slug: 'hotel-premium-akwa-douala',
    nom: 'Hôtel Premium Akwa',
    type: 'HOTEL',
    typeDisplay: 'Hôtel',
    ville: 'Douala',
    quartier: 'Akwa',
    prixParNuit: 45000,
    devise: 'FCFA',
    capacite: 2,
    rating: 4.9,
    photoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    slug: 'appartement-moderne-bonamoussadi-douala',
    nom: 'Appartement Moderne Bonamoussadi',
    type: 'APPARTEMENT',
    typeDisplay: 'Appartement meublé',
    ville: 'Douala',
    quartier: 'Bonamoussadi',
    prixParNuit: 35000,
    devise: 'FCFA',
    capacite: 4,
    rating: 4.8,
    photoUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    slug: 'studio-confort-bastos-yaounde',
    nom: 'Studio Confort Bastos',
    type: 'STUDIO',
    typeDisplay: 'Studio',
    ville: 'Yaoundé',
    quartier: 'Bastos',
    prixParNuit: 22000,
    devise: 'FCFA',
    capacite: 2,
    rating: 4.7,
    photoUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    slug: 'villa-emeraude-piscine-kribi',
    nom: 'Villa Émeraude avec Piscine',
    type: 'VILLA',
    typeDisplay: 'Villa',
    ville: 'Kribi',
    quartier: 'Bord de mer',
    prixParNuit: 120000,
    devise: 'FCFA',
    capacite: 8,
    rating: 5.0,
    photoUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    slug: 'residence-prestige-bonapriso-douala',
    nom: 'Résidence Prestige Bonapriso',
    type: 'RESIDENCE',
    typeDisplay: 'Résidence',
    ville: 'Douala',
    quartier: 'Bonapriso',
    prixParNuit: 55000,
    devise: 'FCFA',
    capacite: 4,
    rating: 4.8,
    photoUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    slug: 'auberge-horizon-limbe',
    nom: 'Auberge Horizon Limbe',
    type: 'AUBERGE',
    typeDisplay: 'Auberge',
    ville: 'Limbe',
    quartier: 'Down Beach',
    prixParNuit: 15000,
    devise: 'FCFA',
    capacite: 2,
    rating: 4.6,
    photoUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
  },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <Hero />

      {/* Featured Listings Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Maquette Phase 0</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.sections.featuredTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {t.sections.featuredSubtitle}
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60 self-start md:self-auto">
            {t.sections.demoBadge}
          </span>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DEMO_LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Why Choose FeelToHome Section */}
      <section className="bg-white border-y border-slate-200/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.sections.whyTitle}
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto mt-2 mb-12">
            {t.sections.whySubtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Feature 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-500/10 text-brand-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t.sections.why1Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.sections.why1Desc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-500/10 text-brand-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t.sections.why2Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.sections.why2Desc}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-500/10 text-brand-600 rounded-xl flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t.sections.why3Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.sections.why3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
