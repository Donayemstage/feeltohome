'use client';

import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 p-4 space-y-4">
          <div className="h-48 bg-slate-200 rounded-xl w-full" />
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-100 rounded w-1/2" />
          <div className="pt-2 flex justify-between items-center border-t border-slate-100">
            <div className="h-5 bg-slate-200 rounded w-1/3" />
            <div className="h-8 bg-slate-200 rounded-lg w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};
