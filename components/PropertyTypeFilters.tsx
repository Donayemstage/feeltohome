'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from './LanguageContext';

const CATEGORIES = [
  { key: 'TOUS', labelKey: 'allTypes', iconClass: 'fa-solid fa-border-all' },
  { key: 'HOTEL', labelKey: 'HOTEL', iconClass: 'fa-solid fa-hotel' },
  { key: 'APPARTEMENT', labelKey: 'APPARTEMENT', iconClass: 'fa-solid fa-building' },
  { key: 'STUDIO', labelKey: 'STUDIO', iconClass: 'fa-solid fa-door-closed' },
  { key: 'RESIDENCE', labelKey: 'RESIDENCE', iconClass: 'fa-solid fa-house-chimney' },
  { key: 'VILLA', labelKey: 'VILLA', iconClass: 'fa-solid fa-tree-city' },
  { key: 'AUBERGE', labelKey: 'AUBERGE', iconClass: 'fa-solid fa-warehouse' },
];

export const PropertyTypeFilters: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeType = searchParams.get('type') || 'TOUS';

  const handleSelectType = (typeKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (typeKey === 'TOUS') {
      params.delete('type');
    } else {
      params.set('type', typeKey);
    }
    router.push(`/logements?${params.toString()}`);
  };

  return (
    <section className="flex flex-col gap-3 py-2">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Types de séjours</h2>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeType.toUpperCase() === cat.key;
          const label = cat.key === 'TOUS' 
            ? t.catalog.allTypes 
            : t.propertyTypes[cat.key as keyof typeof t.propertyTypes] || cat.key;

          return (
            <button
              key={cat.key}
              onClick={() => handleSelectType(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-none text-xs font-semibold shrink-0 transition-all active:scale-95 border ${
                isActive
                  ? 'bg-brand-500 text-white border-brand-600 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
              }`}
            >
              <i className={`${cat.iconClass} text-xs`}></i>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
