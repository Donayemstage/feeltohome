'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { MapPin, Users, Star, ArrowRight } from 'lucide-react';

export interface ListingProps {
  id: string | number;
  slug: string;
  nom: string;
  type: string;
  typeDisplay: string;
  ville: string;
  quartier: string;
  prixParNuit: number;
  devise: string;
  capacite: number;
  rating?: number;
  photoUrl: string;
}

export const ListingCard: React.FC<{ listing: ListingProps }> = ({ listing }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
        <img
          src={listing.photoUrl}
          alt={listing.nom}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
          {listing.typeDisplay}
        </div>
        {/* Demo Data Tag */}
        <div className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
          Démo
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1 font-medium text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span className="truncate">{listing.ville} • {listing.quartier}</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>{listing.rating || '4.8'}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-500 transition-colors line-clamp-1 mb-2">
            {listing.nom}
          </h3>
        </div>

        {/* Footer info: Price & CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-extrabold text-brand-600">
              {listing.prixParNuit.toLocaleString('fr-FR')} {listing.devise}
            </span>
            <span className="text-xs text-slate-500 font-normal"> {t.sections.perNight}</span>
          </div>

          <Link
            href={`/logements/${listing.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 group-hover:bg-brand-500 text-slate-700 group-hover:text-white rounded-lg text-xs font-semibold transition-all"
          >
            <span>{t.sections.viewListing}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
