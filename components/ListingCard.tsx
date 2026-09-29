'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { LogementData } from '@/lib/api';
import { MapPin, ArrowRight, Heart, Users, Bed, Bath } from 'lucide-react';

export const ListingCard: React.FC<{ listing: LogementData }> = ({ listing }) => {
  const { t } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);

  const photoUrl = listing.photos && listing.photos.length > 0
    ? listing.photos[0].url
    : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

  const numericPrice = typeof listing.prix_par_nuit === 'number'
    ? listing.prix_par_nuit
    : parseFloat(listing.prix_par_nuit);

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
        <img
          src={photoUrl}
          alt={listing.nom}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
          {listing.type_display || listing.type}
        </div>
        {/* Demo Tag per Rule #10 */}
        <div className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
          {t.catalog.demoBadge}
        </div>
        {/* Favoriting button (local state) */}
        <button
          onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors shadow-sm"
          aria-label={isSaved ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 stroke-red-500' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span className="truncate">{listing.ville}{listing.quartier ? ` • ${listing.quartier}` : ''}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-500 transition-colors line-clamp-1">
            {listing.nom}
          </h3>

          {/* Capacity Specs */}
          <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-brand-500" /> {listing.capacite} pers.</span>
            <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-brand-500" /> {listing.nombre_chambres} ch.</span>
            <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-brand-500" /> {listing.nombre_salles_bain} sdb</span>
          </div>
        </div>

        {/* Footer info: Price & Action CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-lg font-extrabold text-brand-600">
              {numericPrice.toLocaleString('fr-FR')} {listing.devise || 'XAF'}
            </span>
            <span className="text-xs text-slate-500 font-normal"> {t.catalog.perNight}</span>
          </div>

          <Link
            href={`/logements/${listing.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 group-hover:bg-brand-500 text-slate-700 group-hover:text-white rounded-xl text-xs font-semibold transition-all"
          >
            <span>{t.catalog.viewListing}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
