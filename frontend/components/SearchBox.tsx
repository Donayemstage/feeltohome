'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

export const SearchBox: React.FC<{ initialDestination?: string }> = ({ initialDestination = '' }) => {
  const { t } = useLanguage();
  const router = useRouter();

  const today = new Date().toISOString().split('T')[0];
  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set('destination', destination.trim());
    if (checkIn) params.set('checkin', checkIn);
    if (checkOut) params.set('checkout', checkOut);
    if (guests) params.set('guests', guests);

    router.push(`/logements?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 text-slate-900 shadow-xl border border-slate-200/80">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
        <Search className="w-4 h-4 text-brand-500" />
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          {t.hero.quickSearch}
        </span>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        {/* Destination */}
        <div className="lg:col-span-4 bg-slate-50 hover:bg-slate-100/80 transition-colors p-3 rounded-xl flex items-center gap-3 border border-slate-200/60">
          <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
          <div className="flex flex-col text-left w-full min-w-0">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {t.hero.destinationLabel}
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t.hero.destinationPlaceholder}
              className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-none w-full truncate"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="lg:col-span-3 bg-slate-50 hover:bg-slate-100/80 transition-colors p-3 rounded-xl flex items-center gap-3 border border-slate-200/60">
          <Calendar className="w-5 h-5 text-brand-500 shrink-0" />
          <div className="flex flex-col text-left w-full min-w-0">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {t.hero.checkIn}
            </label>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut && e.target.value > checkOut) setCheckOut(e.target.value);
              }}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="lg:col-span-3 bg-slate-50 hover:bg-slate-100/80 transition-colors p-3 rounded-xl flex items-center gap-3 border border-slate-200/60">
          <Calendar className="w-5 h-5 text-brand-500 shrink-0" />
          <div className="flex flex-col text-left w-full min-w-0">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {t.hero.checkOut}
            </label>
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Search Submit CTA */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full h-full min-h-[48px] bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>{t.hero.searchBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
