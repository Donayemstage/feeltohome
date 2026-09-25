'use client';

import React from 'react';
import { EquipementData } from '@/lib/api';
import { Wifi, Waves, Car, Snowflake, Tv, Utensils, Sun, Zap, ShieldCheck, Flame, Shirt, CheckCircle2 } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  wifi: Wifi,
  waves: Waves,
  car: Car,
  snowflake: Snowflake,
  tv: Tv,
  utensils: Utensils,
  sun: Sun,
  zap: Zap,
  'shield-check': ShieldCheck,
  flame: Flame,
  shirt: Shirt,
};

export const PropertyAmenities: React.FC<{ equipements: EquipementData[] }> = ({ equipements }) => {
  if (!equipements || equipements.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {equipements.map((eq) => {
        const IconComponent = ICON_MAP[eq.icon_name] || CheckCircle2;
        return (
          <div key={eq.id} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800">
            <IconComponent className="w-4 h-4 text-brand-500 shrink-0" />
            <span className="text-xs font-semibold">{eq.nom}</span>
          </div>
        );
      })}
    </div>
  );
};
