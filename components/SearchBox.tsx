'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from './LanguageContext';

export const SearchBox: React.FC<{ initialDestination?: string }> = ({ initialDestination = '' }) => {
  const { t } = useLanguage();
  const router = useRouter();

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  // Calendar popover state
  const [activeCalendar, setActiveCalendar] = useState<'checkin' | 'checkout' | null>(null);
  const [viewDate, setViewDate] = useState(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setActiveCalendar(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveCalendar(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set('destination', destination.trim());
    if (checkIn) params.set('checkin', checkIn);
    if (checkOut) params.set('checkout', checkOut);
    if (guests) params.set('guests', guests);

    router.push(`/logements?${params.toString()}`);
  };

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  let startingDay = firstDayOfMonth.getDay() - 1;
  if (startingDay < 0) startingDay = 6;

  const handleDateClick = (selectedDateStr: string) => {
    if (activeCalendar === 'checkin') {
      setCheckIn(selectedDateStr);
      if (!checkOut || checkOut <= selectedDateStr) {
        const nextDay = new Date(selectedDateStr);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOut(nextDay.toISOString().split('T')[0]);
      }
      setActiveCalendar('checkout');
    } else if (activeCalendar === 'checkout') {
      if (checkIn && selectedDateStr < checkIn) {
        setCheckIn(selectedDateStr);
        const nextDay = new Date(selectedDateStr);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOut(nextDay.toISOString().split('T')[0]);
      } else {
        setCheckOut(selectedDateStr);
      }
      setActiveCalendar(null);
    }
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return 'jj/mm/aaaa';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  return (
    <div ref={calendarRef} className="relative bg-slate-900 border border-slate-800 rounded-none p-4 sm:p-5 text-white shadow-xl">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-magnifying-glass text-brand-400 text-sm"></i>
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {t.hero.quickSearch}
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
          Recherche directe de séjours
        </span>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        
        {/* Destination Field */}
        <div className="lg:col-span-4 bg-slate-800/80 hover:bg-slate-800 transition-all p-3 rounded-none flex items-center gap-3 border border-slate-700">
          <i className="fa-solid fa-location-dot text-brand-400 text-base shrink-0"></i>
          <div className="flex flex-col text-left w-full min-w-0">
            <label htmlFor="search-destination" className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {t.hero.destinationLabel}
            </label>
            <input
              id="search-destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t.hero.destinationPlaceholder}
              className="bg-transparent text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none w-full truncate"
            />
          </div>
        </div>

        {/* Check-in Date Field */}
        <button
          type="button"
          onClick={() => setActiveCalendar(activeCalendar === 'checkin' ? null : 'checkin')}
          aria-haspopup="dialog"
          aria-expanded={activeCalendar === 'checkin'}
          aria-label={`${t.hero.checkIn} : ${formatDateDisplay(checkIn)}`}
          className={`lg:col-span-3 bg-slate-800/80 hover:bg-slate-800 transition-all p-3 rounded-none flex items-center gap-3 border cursor-pointer text-left w-full focus:outline-none focus:ring-1 focus:ring-brand-400 ${
            activeCalendar === 'checkin' ? 'border-brand-400 ring-1 ring-brand-400 bg-slate-800' : 'border-slate-700'
          }`}
        >
          <i className="fa-solid fa-calendar-days text-brand-400 text-base shrink-0" aria-hidden="true"></i>
          <div className="flex flex-col text-left w-full min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {t.hero.checkIn}
            </span>
            <span className={`text-xs font-semibold ${checkIn ? 'text-white font-bold' : 'text-slate-400'}`}>
              {formatDateDisplay(checkIn)}
            </span>
          </div>
        </button>

        {/* Check-out Date Field */}
        <button
          type="button"
          onClick={() => setActiveCalendar(activeCalendar === 'checkout' ? null : 'checkout')}
          aria-haspopup="dialog"
          aria-expanded={activeCalendar === 'checkout'}
          aria-label={`${t.hero.checkOut} : ${formatDateDisplay(checkOut)}`}
          className={`lg:col-span-3 bg-slate-800/80 hover:bg-slate-800 transition-all p-3 rounded-none flex items-center gap-3 border cursor-pointer text-left w-full focus:outline-none focus:ring-1 focus:ring-brand-400 ${
            activeCalendar === 'checkout' ? 'border-brand-400 ring-1 ring-brand-400 bg-slate-800' : 'border-slate-700'
          }`}
        >
          <i className="fa-solid fa-calendar-days text-brand-400 text-base shrink-0" aria-hidden="true"></i>
          <div className="flex flex-col text-left w-full min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {t.hero.checkOut}
            </span>
            <span className={`text-xs font-semibold ${checkOut ? 'text-white font-bold' : 'text-slate-400'}`}>
              {formatDateDisplay(checkOut)}
            </span>
          </div>
        </button>

        {/* Search Submit CTA */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full h-full min-h-[48px] bg-brand-500 hover:bg-brand-600 active:scale-98 text-white font-extrabold text-xs rounded-none shadow-md flex items-center justify-center gap-2 transition-all border border-brand-400/40"
          >
            <i className="fa-solid fa-magnifying-glass text-sm"></i>
            <span>{t.hero.searchBtn}</span>
          </button>
        </div>
      </form>

      {/* Interactive Calendar Popover (Square) */}
      {activeCalendar && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={activeCalendar === 'checkin' ? "Sélectionner la date d'arrivée" : "Sélectionner la date de départ"}
          className="absolute left-0 right-0 sm:left-auto sm:right-12 top-full mt-3 z-50 bg-white rounded-none p-4 sm:p-5 shadow-2xl border border-slate-300 text-slate-900 w-full sm:w-88 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          
          {/* Popover Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <i className="fa-solid fa-calendar-days text-brand-500" aria-hidden="true"></i>
              <span>
                {activeCalendar === 'checkin' ? 'Sélectionner la date d\'arrivée' : 'Sélectionner la date de départ'}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setActiveCalendar(null)}
              className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-none focus:outline-none focus:ring-1 focus:ring-slate-400"
              aria-label="Fermer le calendrier"
            >
              <i className="fa-solid fa-xmark text-sm" aria-hidden="true"></i>
            </button>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4 px-1">
            <button
              type="button"
              onClick={prevMonth}
              className="w-10 h-10 rounded-none hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors border border-slate-200"
              aria-label="Mois précédent"
            >
              <i className="fa-solid fa-chevron-left text-xs" aria-hidden="true"></i>
            </button>
            <span className="text-sm font-extrabold text-slate-900">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-10 h-10 rounded-none hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors border border-slate-200"
              aria-label="Mois suivant"
            >
              <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true"></i>
            </button>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {dayLabels.map((day) => (
              <span key={day} className="text-[11px] font-extrabold text-slate-600 uppercase">
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: startingDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 sm:h-11 min-h-[40px]" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNumber = i + 1;
              const dateObj = new Date(year, month, dayNumber);
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
              
              const isPast = dateObj < todayDate;
              const isCheckIn = dateStr === checkIn;
              const isCheckOut = dateStr === checkOut;
              const isInRange = checkIn && checkOut && dateStr > checkIn && dateStr < checkOut;

              let cellStyle = 'hover:bg-slate-100 text-slate-700 font-semibold border border-transparent';
              if (isPast) {
                cellStyle = 'text-slate-300 cursor-not-allowed';
              } else if (isCheckIn) {
                cellStyle = 'bg-brand-500 text-white font-bold shadow-xs';
              } else if (isCheckOut) {
                cellStyle = 'bg-brand-600 text-white font-bold shadow-xs';
              } else if (isInRange) {
                cellStyle = 'bg-brand-50 text-brand-700 font-bold';
              }

              return (
                <button
                  key={dayNumber}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDateClick(dateStr)}
                  className={`h-10 sm:h-11 min-h-[40px] w-full rounded-none text-xs flex items-center justify-center transition-all ${cellStyle}`}
                >
                  {dayNumber}
                </button>
              );
            })}
          </div>

          {/* Quick Preset Actions */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => {
                setCheckIn('');
                setCheckOut('');
              }}
              className="text-slate-600 hover:text-slate-900 font-bold min-h-[40px] flex items-center px-2"
            >
              Effacer les dates
            </button>
            <button
              type="button"
              onClick={() => setActiveCalendar(null)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-none min-h-[40px] flex items-center"
            >
              Valider
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
