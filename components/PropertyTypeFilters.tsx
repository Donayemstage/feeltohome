'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { Building2, Hotel, Home as HomeIcon, DoorClosed, Palmtree, Warehouse, LayoutGrid } from 'lucide-react';

const CATEGORIES = [
  { key: 'TOUS', labelKey: 'allTypes', icon: LayoutGrid },
  { key: 'HOTEL', labelKey: 'HOTEL', icon: Hotel },
  { key: 'APPARTEMENT', labelKey: 'APPARTEMENT', icon: Building2 },
  { key: 'STUDIO', labelKey: 'STUDIO', icon: DoorClosed },
  { key: 'RESIDENCE', labelKey: 'RESIDENCE', icon: HomeIcon },
  { key: 'VILLA', labelKey: 'VILLA', icon: Palmtree },
  { key: 'AUBERGE', labelKey: 'AUBERGE', icon: Warehouse },
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
          const Icon = cat.icon;
          const isActive = activeType.toUpperCase() === cat.key;
          const label = cat.key === 'TOUS' 
            ? t.catalog.allTypes 
            : t.propertyTypes[cat.key as keyof typeof t.propertyTypes] || cat.key;

          return (
            <button
              key={cat.key}
              onClick={() => handleSelectType(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all active:scale-95 shadow-sm ${
                isActive
                  ? 'bg-brand-500 text-white shadow-brand-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
