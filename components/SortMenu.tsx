'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from './LanguageContext';

export const SortMenu: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOrdering = searchParams.get('ordering') || 'recent';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('ordering', e.target.value);
    router.push(`/logements?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 px-3 py-2 rounded-none shadow-xs">
      <i className="fa-solid fa-arrow-down-wide-short text-brand-500 text-sm"></i>
      <span>{t.catalog.sort} :</span>
      <select
        value={currentOrdering}
        onChange={handleSortChange}
        className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
      >
        <option value="recent">{t.catalog.sortRecent}</option>
        <option value="price_asc">{t.catalog.sortPriceAsc}</option>
        <option value="price_desc">{t.catalog.sortPriceDesc}</option>
      </select>
    </div>
  );
};
