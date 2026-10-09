'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchLogements, LogementData } from '@/lib/api';
import { ListingCard } from '@/components/ListingCard';
import { FiltersPanel } from '@/components/FiltersPanel';
import { SortMenu } from '@/components/SortMenu';
import { PropertyTypeFilters } from '@/components/PropertyTypeFilters';
import { SearchBox } from '@/components/SearchBox';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { useLanguage } from '@/components/LanguageContext';

function LogementsContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const [logements, setLogements] = useState<LogementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const destination = searchParams.get('destination') || searchParams.get('ville') || '';
  const typeParam = searchParams.get('type') || '';
  const minPrice = searchParams.get('prix_min') || searchParams.get('min_price') || '';
  const maxPrice = searchParams.get('prix_max') || searchParams.get('max_price') || '';
  const ordering = searchParams.get('ordering') || 'recent';
  const searchQuery = searchParams.get('search') || searchParams.get('q') || '';
  const equipements = searchParams.getAll('equipements');

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchLogements({
        destination,
        type: typeParam,
        prix_min: minPrice,
        prix_max: maxPrice,
        ordering,
        search: searchQuery,
        equipements,
      });
      setLogements(data);
    } catch (err) {
      console.error('Fetch Logements Error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Search & Category Filter Section */}
      <div className="space-y-4">
        <SearchBox initialDestination={destination} />
        <PropertyTypeFilters />
      </div>

      {/* Main Catalog Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.catalog.title}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            <span className="font-bold text-brand-600">{logements.length}</span> {t.catalog.foundCount}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle Button (Square) */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-none text-xs font-semibold text-slate-700 shadow-xs"
          >
            <i className="fa-solid fa-sliders text-brand-500 text-xs"></i>
            <span>{t.catalog.filters}</span>
          </button>

          {/* Sort Menu */}
          <SortMenu />
        </div>
      </div>

      {/* Catalog Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Left Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <FiltersPanel />
        </div>

        {/* Property Grid Results */}
        <main className="lg:col-span-3 min-h-[400px]">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState onRetry={loadData} />
          ) : logements.length === 0 ? (
            <EmptyState onReset={() => window.location.href = '/logements'} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {logements.map((logement) => (
                <ListingCard key={logement.id} listing={logement} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer Modal (Square Borders) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-5 space-y-4 shadow-2xl relative border-l border-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">{t.catalog.filters}</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800"
              >
                <i className="fa-solid fa-xmark text-base"></i>
              </button>
            </div>
            <FiltersPanel onCloseMobile={() => setIsMobileFilterOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function LogementsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8"><LoadingState /></div>}>
      <LogementsContent />
    </Suspense>
  );
}
