'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { fetchEquipements, EquipementData } from '@/lib/api';

export const FiltersPanel: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [equipments, setEquipments] = useState<EquipementData[]>([]);
  const [minPrice, setMinPrice] = useState(searchParams.get('prix_min') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('prix_max') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('ville') || searchParams.get('destination') || '');
  const [selectedEquips, setSelectedEquips] = useState<string[]>(
    searchParams.getAll('equipements')
  );

  useEffect(() => {
    fetchEquipements().then(data => setEquipments(data)).catch(() => {});
  }, []);

  const handleToggleEquip = (slug: string) => {
    if (selectedEquips.includes(slug)) {
      setSelectedEquips(selectedEquips.filter(s => s !== slug));
    } else {
      setSelectedEquips([...selectedEquips, slug]);
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice) params.set('prix_min', minPrice);
    else params.delete('prix_min');

    if (maxPrice) params.set('prix_max', maxPrice);
    else params.delete('prix_max');

    if (selectedType && selectedType !== 'TOUS') params.set('type', selectedType);
    else params.delete('type');

    if (selectedCity && selectedCity !== 'ALL') params.set('ville', selectedCity);
    else {
      params.delete('ville');
      params.delete('destination');
    }

    params.delete('equipements');
    selectedEquips.forEach(eq => params.append('equipements', eq));

    router.push(`/logements?${params.toString()}`);
    if (onCloseMobile) onCloseMobile();
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedType('');
    setSelectedCity('');
    setSelectedEquips([]);
    router.push('/logements');
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="bg-white rounded-none p-5 border border-slate-300 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-sliders text-brand-500 text-sm"></i>
          <h3 className="font-bold text-slate-900 text-sm">{t.catalog.filters}</h3>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-slate-500 hover:text-brand-500 flex items-center gap-1 transition-colors font-semibold"
        >
          <i className="fa-solid fa-rotate-left text-[11px]"></i>
          <span>{t.catalog.resetFilters}</span>
        </button>
      </div>

      {/* City Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          {t.catalog.cityLabel}
        </label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-none p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
        >
          <option value="">{t.catalog.allCities}</option>
          <option value="Douala">Douala</option>
          <option value="Yaoundé">Yaoundé</option>
          <option value="Kribi">Kribi</option>
          <option value="Limbe">Limbe</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          {t.catalog.priceRange}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min (XAF)"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-none p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
          />
          <input
            type="number"
            placeholder="Max (XAF)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-none p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Property Type Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Type de bien
        </label>
        <div className="space-y-2 text-xs">
          {['HOTEL', 'APPARTEMENT', 'STUDIO', 'RESIDENCE', 'VILLA', 'AUBERGE'].map((typeKey) => (
            <label key={typeKey} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900 font-medium">
              <input
                type="radio"
                name="property_type"
                checked={selectedType === typeKey}
                onChange={() => setSelectedType(typeKey)}
                className="rounded-none text-brand-500 focus:ring-brand-500"
              />
              <span>{t.propertyTypes[typeKey as keyof typeof t.propertyTypes] || typeKey}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dynamic Equipment Checkboxes from Backend API */}
      {equipments.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {t.catalog.amenitiesLabel}
          </label>
          <div className="space-y-2 text-xs max-h-40 overflow-y-auto">
            {equipments.map((eq) => (
              <label key={eq.id} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900 font-medium">
                <input
                  type="checkbox"
                  checked={selectedEquips.includes(eq.slug)}
                  onChange={() => handleToggleEquip(eq.slug)}
                  className="rounded-none text-brand-500 focus:ring-brand-500"
                />
                <span>{eq.nom}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Submit Filter Button (Square) */}
      <button
        onClick={applyFilters}
        className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-none shadow-xs transition-all border border-brand-600"
      >
        Appliquer les filtres
      </button>
    </aside>
  );
};
