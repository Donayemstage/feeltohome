'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { SearchX, RotateCcw } from 'lucide-react';

export const EmptyState: React.FC<{ onReset?: () => void }> = ({ onReset }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/60 shadow-sm flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{t.states.emptyTitle}</h3>
      <p className="text-sm text-slate-500">{t.states.emptyDesc}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.catalog.resetFilters}</span>
        </button>
      )}
    </div>
  );
};
