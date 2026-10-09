'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { LogementData } from '@/lib/api';

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
    <article className="bg-white rounded-none overflow-hidden border border-slate-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
      {/* Image Container with Square Borders */}
      <div className="relative h-52 w-full bg-slate-100 overflow-hidden rounded-none">
        <img
          src={photoUrl}
          alt={listing.nom}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none"
        />
        {/* Type Badge (Square) */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-none text-xs font-bold text-slate-800 shadow-xs border border-slate-200">
          {t.propertyTypes[listing.type as keyof typeof t.propertyTypes] || listing.type_display || listing.type}
        </div>
        {/* Demo Badge (Square) */}
        <div className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-0.5 rounded-none text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
          {t.catalog.demoBadge}
        </div>
        {/* Favoriting button (Square) */}
        <button
          onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-none bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors shadow-xs border border-slate-200"
          aria-label={isSaved ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <i className={`${isSaved ? 'fa-solid text-red-500' : 'fa-regular text-slate-600'} fa-heart text-sm`}></i>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Location with FontAwesome icon */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
            <i className="fa-solid fa-location-dot text-brand-500 text-xs shrink-0"></i>
            <span className="truncate">{listing.ville}{listing.quartier ? ` • ${listing.quartier}` : ''}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
            {listing.nom}
          </h3>

          {/* Capacity Specs with FontAwesome icons */}
          <div className="flex items-center gap-3 pt-2 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-users text-brand-500 text-xs"></i> {listing.capacite} pers.
            </span>
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-bed text-brand-500 text-xs"></i> {listing.nombre_chambres} ch.
            </span>
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-bath text-brand-500 text-xs"></i> {listing.nombre_salles_bain} sdb
            </span>
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
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 group-hover:bg-brand-500 text-slate-700 group-hover:text-white rounded-none text-xs font-semibold transition-all border border-slate-200 group-hover:border-brand-500"
          >
            <span>{t.catalog.viewListing}</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>
      </div>
    </article>
  );
};
