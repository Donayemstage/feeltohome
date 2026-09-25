'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-red-50/50 rounded-2xl p-12 text-center border border-red-100 flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{t.states.errorTitle}</h3>
      <p className="text-sm text-slate-600">{t.states.errorDesc}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02] active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        <span>{t.states.retry}</span>
      </button>
    </div>
  );
};
