'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search UI interaction for Phase 0 demo
    alert(`Recherche FeelToHome : ${destination || 'Tout le Cameroun'} | ${checkIn || 'Sans date'} au ${checkOut || 'Sans date'} | ${guests} voyageur(s)`);
  };

  return (
    <section className="relative bg-gradient-to-br from-brand-700 via-brand-600 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Plateforme de réservation au Cameroun</span>
        </div>

        {/* Hero Titles */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-4">
          {t.hero.slogan}
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 font-normal mb-10 leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Search Bar Card */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl p-3 sm:p-4 text-slate-900 shadow-2xl border border-white/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
        >
          {/* Destination */}
          <div className="lg:col-span-4 bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-xl flex items-center gap-3 border border-slate-200/60">
            <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
            <div className="flex flex-col text-left w-full">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                {t.hero.destinationLabel}
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={t.hero.destinationPlaceholder}
                className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Check-in */}
          <div className="lg:col-span-3 bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-xl flex items-center gap-3 border border-slate-200/60">
            <Calendar className="w-5 h-5 text-brand-500 shrink-0" />
            <div className="flex flex-col text-left w-full">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                {t.hero.checkIn}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="lg:col-span-3 bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-xl flex items-center gap-3 border border-slate-200/60">
            <Calendar className="w-5 h-5 text-brand-500 shrink-0" />
            <div className="flex flex-col text-left w-full">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                {t.hero.checkOut}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full h-full min-h-[52px] bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>{t.hero.searchBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
