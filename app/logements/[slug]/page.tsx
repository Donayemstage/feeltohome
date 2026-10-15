'use client';

import React, { useEffect, useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchLogementBySlug, LogementData } from '@/lib/api';
import { PropertyGallery } from '@/components/PropertyGallery';
import { PropertyAmenities } from '@/components/PropertyAmenities';
import { ReserveButton } from '@/components/ReserveButton';
import { useLanguage } from '@/components/LanguageContext';
import { useFavorites } from '@/components/FavoritesContext';

export default function LogementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { locale, t } = useLanguage();
  const { isSaved, toggleFavorite } = useFavorites();

  const [logement, setLogement] = useState<LogementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchLogementBySlug(slug)
      .then((data) => {
        if (data) setLogement(data);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-semibold">{t.states.loading}</p>
      </div>
    );
  }

  if (error || !logement) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">{t.detail.notFoundTitle}</h2>
        <p className="text-xs text-slate-500">{t.detail.notFoundDesc}</p>
        <Link href="/logements" className="inline-block px-4 py-2 bg-brand-500 text-white font-bold text-xs">
          {t.detail.backToListings}
        </Link>
      </div>
    );
  }

  const saved = isSaved(logement.slug);
  const numericPrice = typeof logement.prix_par_nuit === 'number'
    ? logement.prix_par_nuit
    : parseFloat(logement.prix_par_nuit);

  const displayType = t.propertyTypes[logement.type as keyof typeof t.propertyTypes] || logement.type_display || logement.type;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-36 md:pb-24 lg:pb-12">
      {/* Top Navigation & Action Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/logements"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand-600 bg-white px-3.5 py-2 rounded-none border border-slate-300 shadow-xs transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i>
          <span>{t.detail.backToListings}</span>
        </Link>

        {/* Favorite Button on Detail Page */}
        <button
          type="button"
          onClick={() => toggleFavorite(logement.slug)}
          className={`inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-none border shadow-xs transition-all ${
            saved
              ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
              : 'bg-white text-slate-700 border-slate-300 hover:text-red-500 hover:border-slate-400'
          }`}
          aria-label={saved ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <i className={`${saved ? 'fa-solid text-red-500' : 'fa-regular text-slate-600'} fa-heart text-sm`}></i>
          <span>
            {saved
              ? (locale === 'fr' ? 'Enregistré' : locale === 'en' ? 'Saved' : 'Gespeichert')
              : (locale === 'fr' ? 'Enregistrer' : locale === 'en' ? 'Save' : 'Speichern')}
          </span>
        </button>
      </div>

      {/* Property Header Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-none border border-brand-200">
            {displayType}
          </span>
          <span className="bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-none">
            {t.catalog.demoBadge}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {logement.nom}
        </h1>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
          <i className="fa-solid fa-location-dot text-brand-500 shrink-0"></i>
          <span>{logement.ville}{logement.quartier ? ` • ${logement.quartier}` : ''}{logement.adresse ? ` (${logement.adresse})` : ''}</span>
        </div>
      </div>

      {/* Property Lightbox Photo Gallery */}
      <PropertyGallery photos={logement.photos || []} propertyName={logement.nom} />

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Specs, Description, Amenities */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Capacity Spec Chips */}
          <div className="bg-white p-5 rounded-none border border-slate-300 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <i className="fa-solid fa-users text-brand-500 text-lg mx-auto block" aria-hidden="true"></i>
              <div className="text-sm font-bold text-slate-900">{logement.capacite} {t.detail.capacity}</div>
              <div className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Capacité</div>
            </div>
            <div className="space-y-1">
              <i className="fa-solid fa-bed text-brand-500 text-lg mx-auto block" aria-hidden="true"></i>
              <div className="text-sm font-bold text-slate-900">{logement.nombre_chambres} {t.detail.bedrooms}</div>
              <div className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Chambres</div>
            </div>
            <div className="space-y-1">
              <i className="fa-solid fa-bed text-brand-500 text-lg mx-auto block" aria-hidden="true"></i>
              <div className="text-sm font-bold text-slate-900">{logement.nombre_lits} {t.detail.beds}</div>
              <div className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Couchages</div>
            </div>
            <div className="space-y-1">
              <i className="fa-solid fa-bath text-brand-500 text-lg mx-auto block" aria-hidden="true"></i>
              <div className="text-sm font-bold text-slate-900">{logement.nombre_salles_bain} {t.detail.bathrooms}</div>
              <div className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Salles de bain</div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white p-6 rounded-none border border-slate-300 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900">{t.detail.descriptionTitle}</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {logement.description}
            </p>
          </div>

          {/* Dynamic Amenities Section */}
          {logement.equipements && logement.equipements.length > 0 && (
            <div className="bg-white p-6 rounded-none border border-slate-300 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900">{t.detail.amenitiesTitle}</h2>
              <PropertyAmenities equipements={logement.equipements} />
            </div>
          )}

          {/* Host Info Card */}
          {logement.proprietaire && (
            <div className="bg-white p-5 rounded-none border border-slate-300 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-brand-500 text-white flex items-center justify-center font-bold text-sm">
                  <i className="fa-solid fa-user-check text-base" aria-hidden="true"></i>
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.detail.hostTitle}</h2>
                  <div className="text-sm font-bold text-slate-900">
                    {logement.proprietaire.prenom} {logement.proprietaire.nom}
                  </div>
                </div>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-none border border-emerald-200 flex items-center gap-1.5">
                <i className="fa-solid fa-shield-halved text-xs" aria-hidden="true"></i> {t.detail.verifiedAccount}
              </span>
            </div>
          )}
        </div>

        {/* Right Desktop Reservation Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <div className="bg-white rounded-none p-6 border border-slate-300 shadow-md space-y-5">
            <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-2xl font-extrabold text-brand-600">
                  {numericPrice.toLocaleString('fr-FR')} {logement.devise || 'XAF'}
                </span>
                <span className="text-xs text-slate-500 font-normal"> {t.catalog.perNight}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-none space-y-3 text-xs border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700">
                <i className="fa-solid fa-calendar-check text-brand-500 text-sm" aria-hidden="true"></i>
                <span>{t.detail.reservationNote}</span>
              </div>
            </div>

            {/* CTA Reservation Button with Modal */}
            <ReserveButton
              propertyName={logement.nom}
              price={numericPrice}
              currency={logement.devise || 'XAF'}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 active:scale-98 text-white font-bold text-sm rounded-none shadow-sm transition-all flex items-center justify-center gap-2 border border-brand-600 cursor-pointer"
            >
              <span>{t.detail.reserveNow}</span>
            </ReserveButton>

            <p className="text-[11px] text-slate-600 text-center font-medium">
              {t.detail.noChargeNote}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Reservation Bottom Bar */}
      <div className="fixed bottom-16 md:bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 flex items-center justify-between lg:hidden z-30 shadow-lg md:pb-safe">
        <div>
          <span className="text-lg font-extrabold text-brand-600">
            {numericPrice.toLocaleString('fr-FR')} {logement.devise || 'XAF'}
          </span>
          <span className="text-xs text-slate-500 font-normal"> {t.catalog.perNight}</span>
        </div>

        <ReserveButton
          propertyName={logement.nom}
          price={numericPrice}
          currency={logement.devise || 'XAF'}
          className="px-5 py-2.5 bg-brand-500 text-white font-bold text-xs rounded-none shadow-xs active:scale-95 transition-all border border-brand-600 cursor-pointer"
        >
          {t.detail.reserveNow}
        </ReserveButton>
      </div>
    </div>
  );
}
