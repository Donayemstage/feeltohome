import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchLogementBySlug } from '@/lib/api';
import { PropertyGallery } from '@/components/PropertyGallery';
import { PropertyAmenities } from '@/components/PropertyAmenities';
import { MapPin, Users, Bed, Bath, ArrowLeft, ShieldCheck, UserCheck, CalendarCheck } from 'lucide-react';

export default async function LogementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const logement = await fetchLogementBySlug(slug);

  if (!logement) {
    notFound();
  }

  const numericPrice = typeof logement.prix_par_nuit === 'number'
    ? logement.prix_par_nuit
    : parseFloat(logement.prix_par_nuit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 md:pb-12">
      {/* Back Button */}
      <div>
        <Link
          href="/logements"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux logements</span>
        </Link>
      </div>

      {/* Property Header Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full border border-brand-200/60">
            {logement.type_display || logement.type}
          </span>
          <span className="bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
            Démo
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {logement.nom}
        </h1>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
          <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
          <span>{logement.ville}{logement.quartier ? ` • ${logement.quartier}` : ''}{logement.adresse ? ` (${logement.adresse})` : ''}</span>
        </div>
      </div>

      {/* Property Lightbox Photo Gallery per Rule #8 */}
      <PropertyGallery photos={logement.photos || []} propertyName={logement.nom} />

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Specs, Description, Amenities */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Capacity Spec Chips */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <Users className="w-5 h-5 text-brand-500 mx-auto" />
              <div className="text-sm font-bold text-slate-900">{logement.capacite} pers.</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Capacité</div>
            </div>
            <div className="space-y-1">
              <Bed className="w-5 h-5 text-brand-500 mx-auto" />
              <div className="text-sm font-bold text-slate-900">{logement.nombre_chambres} ch.</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Chambres</div>
            </div>
            <div className="space-y-1">
              <Bed className="w-5 h-5 text-brand-500 mx-auto" />
              <div className="text-sm font-bold text-slate-900">{logement.nombre_lits} lits</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Couchages</div>
            </div>
            <div className="space-y-1">
              <Bath className="w-5 h-5 text-brand-500 mx-auto" />
              <div className="text-sm font-bold text-slate-900">{logement.nombre_salles_bain} sdb</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Salles de bain</div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900">À propos de ce logement</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {logement.description}
            </p>
          </div>

          {/* Dynamic Amenities Section per Rule #18 */}
          {logement.equipements && logement.equipements.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Équipements disponibles</h3>
              <PropertyAmenities equipements={logement.equipements} />
            </div>
          )}

          {/* Host Info Card per Rule #4 */}
          {logement.proprietaire && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Hôte partenaire</span>
                  <div className="text-sm font-bold text-slate-900">
                    {logement.proprietaire.prenom} {logement.proprietaire.nom}
                  </div>
                </div>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Compte vérifié
              </span>
            </div>
          )}
        </div>

        {/* Right Desktop Reservation Sidebar per Rule #9 */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg space-y-5">
            <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-2xl font-extrabold text-brand-600">
                  {numericPrice.toLocaleString('fr-FR')} {logement.devise || 'XAF'}
                </span>
                <span className="text-xs text-slate-500 font-normal"> / nuit</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-3 text-xs border border-slate-200/60">
              <div className="flex items-center gap-2 text-slate-700">
                <CalendarCheck className="w-4 h-4 text-brand-500" />
                <span>Sélection des dates et voyageurs lors de l'étape suivante</span>
              </div>
            </div>

            {/* CTA Reservation Button per Rule #9 */}
            <button
              onClick={() => alert(`Réservation préparée pour "${logement.nom}". Le module de paiement et calendrier sera activé dans la phase suivante.`)}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 active:scale-98 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Réserver maintenant</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              Aucun montant ne sera débité à cette étape.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Reservation Bottom Bar per Rule #9 & #13 */}
      <div className="fixed bottom-16 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-3 px-4 flex items-center justify-between lg:hidden z-30 shadow-lg">
        <div>
          <span className="text-lg font-extrabold text-brand-600">
            {numericPrice.toLocaleString('fr-FR')} {logement.devise || 'XAF'}
          </span>
          <span className="text-xs text-slate-500 font-normal"> / nuit</span>
        </div>

        <button
          onClick={() => alert(`Réservation préparée pour "${logement.nom}". Le module de paiement et calendrier sera activé dans la phase suivante.`)}
          className="px-5 py-2.5 bg-brand-500 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-500/20 active:scale-95 transition-all"
        >
          Réserver maintenant
        </button>
      </div>
    </div>
  );
}
