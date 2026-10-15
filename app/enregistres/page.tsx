'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { useFavorites } from '@/components/FavoritesContext';
import { fetchLogements, LogementData } from '@/lib/api';
import { ListingCard } from '@/components/ListingCard';
import { LoadingState } from '@/components/LoadingState';

export default function EnregistresPage() {
  const { locale, t } = useLanguage();
  const { savedSlugs, isLoaded, clearFavorites } = useFavorites();
  const [allListings, setAllListings] = useState<LogementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchLogements({})
      .then((data) => {
        if (isMounted) {
          setAllListings(data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load listings for saved page:', err);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const savedListings = useMemo(() => {
    if (!isLoaded || savedSlugs.length === 0) return [];
    return allListings.filter((item) => savedSlugs.includes(item.slug));
  }, [allListings, savedSlugs, isLoaded]);

  const handleClear = () => {
    clearFavorites();
    setShowClearConfirm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Back to listings button */}
      <div>
        <Link
          href="/logements"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand-600 bg-white px-3.5 py-2 rounded-none border border-slate-300 shadow-xs transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i>
          <span>{t.detail.backToListings}</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-6 gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 border border-red-200 text-xs font-bold uppercase tracking-wider">
            <i className="fa-solid fa-heart text-xs"></i>
            <span>{t.nav.saved}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'fr'
              ? 'Vos hébergements enregistrés'
              : locale === 'en'
              ? 'Your Saved Properties'
              : 'Ihre gespeicherten Unterkünfte'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {locale === 'fr'
              ? 'Retrouvez facilement les adresses et logements coups de cœur que vous avez sélectionnés.'
              : locale === 'en'
              ? 'Easily access your favorite properties and dream stays in Cameroon.'
              : 'Finden Sie ganz einfach Ihre gemerkten Traumunterkünfte in Kamerun wieder.'}
          </p>
        </div>

        {/* Clear All action when items exist */}
        {isLoaded && (savedListings.length > 0 || savedSlugs.length > 0) && (
          <div className="flex items-center gap-3">
            {showClearConfirm ? (
              <div className="flex items-center gap-2 bg-red-50 border border-red-300 p-1.5">
                <span className="text-xs font-medium text-red-700">
                  {locale === 'fr' ? 'Tout supprimer ?' : locale === 'en' ? 'Remove all?' : 'Alle löschen?'}
                </span>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-none hover:bg-red-700"
                >
                  {locale === 'fr' ? 'Oui, vider' : locale === 'en' ? 'Yes, clear' : 'Ja, leeren'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-none hover:bg-slate-100"
                >
                  {locale === 'fr' ? 'Annuler' : locale === 'en' ? 'Cancel' : 'Abbrechen'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-red-600 bg-white border border-slate-300 hover:border-red-300 shadow-xs transition-colors"
                title={locale === 'fr' ? 'Vider tous les favoris' : locale === 'en' ? 'Clear all favorites' : 'Alle Favoriten leeren'}
              >
                <i className="fa-regular fa-trash-can text-xs"></i>
                <span>
                  {locale === 'fr' ? 'Vider la liste' : locale === 'en' ? 'Clear list' : 'Liste leeren'}
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Body States */}
      {!isLoaded || loading ? (
        <div className="py-6">
          <LoadingState />
        </div>
      ) : savedListings.length === 0 ? (
        /* Informative Empty State */
        <div className="bg-white p-10 sm:p-14 text-center border border-slate-300 shadow-xs space-y-5 max-w-lg mx-auto my-6">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-none border border-red-200 mx-auto flex items-center justify-center">
            <i className="fa-regular fa-heart text-2xl"></i>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              {locale === 'fr'
                ? 'Aucun logement enregistré pour l’instant'
                : locale === 'en'
                ? 'No saved properties yet'
                : 'Noch keine Unterkünfte gespeichert'}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              {locale === 'fr'
                ? 'Lorsque vous parcourez le catalogue, cliquez sur le bouton cœur d’une annonce pour l’ajouter à votre liste et y revenir plus tard.'
                : locale === 'en'
                ? 'When browsing the catalog, click the heart icon on any listing to save it to your list and revisit it anytime.'
                : 'Klicken Sie beim Durchstöbern des Katalogs auf das Herz-Symbol einer Unterkunft, um sie zu speichern.'}
            </p>
            {savedSlugs.length > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 p-2 mt-2">
                <i className="fa-solid fa-triangle-exclamation mr-1.5"></i>
                {locale === 'fr'
                  ? 'Les hébergements précédemment enregistrés ne sont plus disponibles dans le catalogue.'
                  : locale === 'en'
                  ? 'Previously saved properties are no longer available in the catalog.'
                  : 'Zuvor gespeicherte Unterkünfte sind im Katalog nicht mehr verfügbar.'}
              </p>
            )}
          </div>

          <div className="pt-3">
            <Link
              href="/logements"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-none shadow-xs transition-all border border-brand-600"
            >
              <i className="fa-solid fa-magnifying-glass text-xs"></i>
              <span>
                {locale === 'fr'
                  ? 'Explorer les logements disponibles'
                  : locale === 'en'
                  ? 'Explore available properties'
                  : 'Verfügbare Unterkünfte entdecken'}
              </span>
            </Link>
          </div>
        </div>
      ) : (
        /* Saved Listings Grid */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              {savedListings.length}{' '}
              {locale === 'fr'
                ? savedListings.length > 1 ? 'logements enregistrés' : 'logement enregistré'
                : locale === 'en'
                ? savedListings.length > 1 ? 'saved properties' : 'saved property'
                : savedListings.length > 1 ? 'gespeicherte Unterkünfte' : 'gespeicherte Unterkunft'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedListings.map((listing, index) => (
              <ListingCard key={listing.slug} listing={listing} priority={index === 0} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
