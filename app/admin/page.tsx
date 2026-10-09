'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchLogements, fetchEquipements, LogementData, EquipementData } from '@/lib/api';
import { useLanguage } from '@/components/LanguageContext';

export default function AdminDashboardPage() {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'logements' | 'hotes' | 'equipements' | 'systeme'>('logements');
  const [logements, setLogements] = useState<LogementData[]>([]);
  const [equipments, setEquipments] = useState<EquipementData[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal and notification state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // New Listing Form State
  const [newNom, setNewNom] = useState('');
  const [newType, setNewType] = useState('APPARTEMENT');
  const [newVille, setNewVille] = useState('Douala');
  const [newQuartier, setNewQuartier] = useState('');
  const [newPrix, setNewPrix] = useState('35000');
  const [newCapacite, setNewCapacite] = useState('4');
  const [newChambres, setNewChambres] = useState('2');
  const [newLits, setNewLits] = useState('2');
  const [newSallesBain, setNewSallesBain] = useState('1');
  const [newDescription, setNewDescription] = useState('');
  const [newPhoto, setNewPhoto] = useState('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80');

  const handleAddLogementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNom.trim()) return;

    const newListing: LogementData = {
      id: Date.now(),
      slug: newNom.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
      nom: newNom,
      type: newType,
      type_display: newType === 'APPARTEMENT' ? 'Appartement meublé' : newType === 'VILLA' ? 'Villa de luxe' : newType === 'HOTEL' ? 'Hôtel' : newType === 'STUDIO' ? 'Studio meublé' : newType === 'AUBERGE' ? 'Auberge' : 'Résidence',
      ville: newVille,
      quartier: newQuartier || 'Centre-ville',
      adresse: `${newQuartier || 'Centre-ville'}, ${newVille}`,
      prix_par_nuit: parseFloat(newPrix) || 35000,
      devise: 'FCFA',
      capacite: parseInt(newCapacite) || 2,
      nombre_chambres: parseInt(newChambres) || 1,
      nombre_lits: parseInt(newLits) || 1,
      nombre_salles_bain: parseInt(newSallesBain) || 1,
      statut: 'DISPONIBLE',
      statut_display: 'Disponible',
      description: newDescription || 'Magnifique logement meublé avec toutes les commodités disponible à la réservation sur FeelToHome.',
      photos: [
        { id: Date.now(), url: newPhoto.trim() || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', ordre: 1, image_principale: true }
      ],
      equipements: [],
      date_creation: new Date().toISOString(),
    };

    setLogements((prev) => [newListing, ...prev]);
    setSuccessMsg(`Logement "${newNom}" ajouté avec succès au catalogue !`);
    setIsAddModalOpen(false);

    // Reset Form
    setNewNom('');
    setNewQuartier('');
    setNewDescription('');
    setTimeout(() => setSuccessMsg(null), 6000);
  };

  // Mock Host applications submitted via /devenir-hote
  const [hostApplications, setHostApplications] = useState([
    {
      id: 1,
      nom: 'Paul Mbenga',
      telephone: '696580487',
      ville: 'Douala',
      quartier: 'Bonapriso',
      type: 'APPARTEMENT',
      prix_souhaite: '45000',
      date: '09/10/2026',
      statut: 'EN_ATTENTE',
    },
    {
      id: 2,
      nom: 'Solange Nkem',
      telephone: '681181456',
      ville: 'Kribi',
      quartier: 'Plage Ngoye',
      type: 'VILLA',
      prix_souhaite: '120000',
      date: '08/10/2026',
      statut: 'EN_ATTENTE',
    },
    {
      id: 3,
      nom: 'Marc Essomba',
      telephone: '696580487',
      ville: 'Yaoundé',
      quartier: 'Bastos',
      type: 'STUDIO',
      prix_souhaite: '25000',
      date: '07/10/2026',
      statut: 'VALIDE',
    },
  ]);

  useEffect(() => {
    Promise.all([fetchLogements(), fetchEquipements()])
      .then(([logData, eqData]) => {
        setLogements(logData);
        setEquipments(eqData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleValidateHost = (id: number) => {
    setHostApplications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, statut: 'VALIDE' } : item))
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-brand-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-none border border-brand-400">
                  Administration Donayem Tech
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-none border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Système En Ligne
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Tableau de Bord Administrateur
              </h1>
              <p className="text-xs text-slate-400">
                Gestion du catalogue, des propriétaires partenaires et de la plateforme FeelToHome au Cameroun.
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-slate-400">Compte Admin configuré :</span>
                <code className="bg-slate-800 text-brand-300 px-2 py-0.5 border border-slate-700 font-mono font-bold">
                  Username: Donayen (ou Donayem)
                </code>
                <code className="bg-slate-800 text-emerald-300 px-2 py-0.5 border border-slate-700 font-mono font-bold">
                  Password: Donayem12#@
                </code>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/logements"
                target="_blank"
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-none border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <i className="fa-solid fa-eye text-brand-400"></i>
                <span>Voir le Site Public</span>
              </Link>
              <Link
                href="/"
                className="px-3.5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-none border border-brand-600 flex items-center gap-1.5 transition-all"
              >
                <i className="fa-solid fa-house-chimney text-xs"></i>
                <span>Accueil</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Performance Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-none border border-slate-300 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Catalogue Public</span>
              <i className="fa-solid fa-hotel text-brand-500 text-base"></i>
            </div>
            <div className="text-2xl font-black text-slate-900">{logements.length} Logements</div>
            <p className="text-[11px] text-slate-500">Douala, Yaoundé, Kribi, Limbe</p>
          </div>

          <div className="bg-white p-5 rounded-none border border-slate-300 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Demandes Hôtes</span>
              <i className="fa-solid fa-user-plus text-amber-500 text-base"></i>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {hostApplications.filter((h) => h.statut === 'EN_ATTENTE').length} En attente
            </div>
            <p className="text-[11px] text-amber-600 font-semibold">Candidatures propriétaires à valider</p>
          </div>

          <div className="bg-white p-5 rounded-none border border-slate-300 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Volume Mensuel</span>
              <i className="fa-solid fa-money-bill-wave text-emerald-500 text-base"></i>
            </div>
            <div className="text-2xl font-black text-emerald-600">3 850 000 FCFA</div>
            <p className="text-[11px] text-slate-500">Orange Money / MoMo / Cash</p>
          </div>

          <div className="bg-white p-5 rounded-none border border-slate-300 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Taux d'Occupation</span>
              <i className="fa-solid fa-chart-line text-blue-500 text-base"></i>
            </div>
            <div className="text-2xl font-black text-slate-900">68%</div>
            <p className="text-[11px] text-slate-500">Moyenne résidences partenaire</p>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="bg-white border border-slate-300 rounded-none p-1.5 flex flex-wrap gap-1 shadow-xs">
          <button
            onClick={() => setActiveTab('logements')}
            className={`px-4 py-2.5 text-xs font-bold rounded-none transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'logements'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-building text-xs"></i>
            <span>Catalogue Logements ({logements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hotes')}
            className={`px-4 py-2.5 text-xs font-bold rounded-none transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'hotes'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-user-check text-xs"></i>
            <span>Demandes d'Hôtes ({hostApplications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('equipements')}
            className={`px-4 py-2.5 text-xs font-bold rounded-none transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'equipements'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-sliders text-xs"></i>
            <span>Équipements ({equipments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('systeme')}
            className={`px-4 py-2.5 text-xs font-bold rounded-none transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'systeme'
                ? 'bg-brand-500 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-gears text-xs"></i>
            <span>Base Django & Serveur</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-none text-xs font-bold flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-emerald-600 text-base"></i>
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        {/* TAB 1: Logements Management */}
        {activeTab === 'logements' && (
          <div className="bg-white rounded-none border border-slate-300 shadow-xs space-y-5 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Gestion du Catalogue de Logements</h3>
                <p className="text-xs text-slate-500">Consultez, modifiez ou masquez les hébergements visibles par les clients.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-none shadow-xs border border-brand-600 transition-all flex items-center gap-2 shrink-0 cursor-pointer active:scale-98"
              >
                <i className="fa-solid fa-plus text-xs"></i>
                <span>Ajouter un Logement</span>
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-slate-500">Chargement du catalogue...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase">
                    <tr>
                      <th className="p-3">Logement</th>
                      <th className="p-3">Ville</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Tarif XAF / nuit</th>
                      <th className="p-3">Capacité</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {logements.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                          <img
                            src={item.photos && item.photos.length > 0 ? item.photos[0].url : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80'}
                            alt=""
                            className="w-8 h-8 object-cover rounded-none border border-slate-200"
                          />
                          <span className="truncate max-w-xs">{item.nom}</span>
                        </td>
                        <td className="p-3 text-slate-600">{item.ville}</td>
                        <td className="p-3">
                          <span className="bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded-none border border-slate-200">
                            {item.type_display || item.type}
                          </span>
                        </td>
                        <td className="p-3 font-extrabold text-brand-600">
                          {typeof item.prix_par_nuit === 'number' ? item.prix_par_nuit.toLocaleString('fr-FR') : parseFloat(item.prix_par_nuit).toLocaleString('fr-FR')} XAF
                        </td>
                        <td className="p-3 text-slate-600">{item.capacite} pers. • {item.nombre_chambres} ch.</td>
                        <td className="p-3">
                          <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-none border border-emerald-200">
                            Actif (Démo)
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <Link
                            href={`/logements/${item.slug}`}
                            target="_blank"
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-none border border-slate-300"
                          >
                            Voir
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Demandes d'Hôtes */}
        {activeTab === 'hotes' && (
          <div className="bg-white rounded-none border border-slate-300 shadow-xs space-y-5 p-6">
            <div className="pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Demandes d'Hôtes & Propriétaires Soumises</h3>
              <p className="text-xs text-slate-500">Candidatures reçues via la page <code>/devenir-hote</code>.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase">
                  <tr>
                    <th className="p-3">Propriétaire</th>
                    <th className="p-3">Téléphone</th>
                    <th className="p-3">Emplacement</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Prix Souhaité</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {hostApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{app.nom}</td>
                      <td className="p-3 text-slate-700">{app.telephone}</td>
                      <td className="p-3 text-slate-600">{app.ville} ({app.quartier})</td>
                      <td className="p-3">
                        <span className="bg-brand-50 text-brand-700 font-semibold px-2 py-0.5 rounded-none border border-brand-200">
                          {app.type}
                        </span>
                      </td>
                      <td className="p-3 font-extrabold text-slate-900">{Number(app.prix_souhaite).toLocaleString('fr-FR')} XAF</td>
                      <td className="p-3 text-slate-500">{app.date}</td>
                      <td className="p-3">
                        {app.statut === 'VALIDE' ? (
                          <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-none border border-emerald-200">
                            Validé & Publié
                          </span>
                        ) : (
                          <span className="bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-none border border-amber-200">
                            En Attente
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {app.statut !== 'VALIDE' && (
                          <button
                            onClick={() => handleValidateHost(app.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-none border border-emerald-700 cursor-pointer"
                          >
                            Valider
                          </button>
                        )}
                        <a
                          href={`https://wa.me/237${app.telephone}?text=${encodeURIComponent(`Bonjour ${app.nom}, concernant votre demande d'hôte pour votre logement à ${app.ville} (${app.quartier})...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-none border border-slate-900"
                        >
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Équipements */}
        {activeTab === 'equipements' && (
          <div className="bg-white rounded-none border border-slate-300 shadow-xs space-y-5 p-6">
            <div className="pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Équipements du Réseau FeelToHome</h3>
              <p className="text-xs text-slate-500">Liste des commodités configurées pour le filtrage du catalogue.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {equipments.map((eq) => (
                <div key={eq.id} className="p-4 bg-slate-50 border border-slate-300 rounded-none flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{eq.nom}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">slug: {eq.slug}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 border border-emerald-300">
                    Actif
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Base Django & Système */}
        {activeTab === 'systeme' && (
          <div className="bg-slate-900 text-white rounded-none border border-slate-800 shadow-xs space-y-6 p-8">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-xs uppercase font-extrabold text-brand-400 tracking-wider">Serveur Backend & Base de Données</span>
              <h3 className="text-2xl font-black">Administration Avancée Django DB</h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Accédez directement aux tables de la base de données SQL pour une gestion technique approfondie (comptes utilisateurs, logs bruts, clés d'API).
              </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-none border border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-300">
                <i className="fa-solid fa-server"></i>
                <span>Serveur Multi-Services Vercel (Next.js Frontend + Django Backend API)</span>
              </div>
              <p className="text-xs text-slate-300">
                Adresse de l'API de santé : <code className="bg-slate-900 px-2 py-0.5 rounded-none text-emerald-400">/api/health/</code>
              </p>
            </div>

            <div className="pt-2">
              <a
                href="/api/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-none shadow-md border border-brand-600 transition-all"
              >
                <i className="fa-solid fa-database text-sm"></i>
                <span>Ouvrir l'Interface Brute Django Admin (/api/admin/)</span>
              </a>
            </div>
          </div>
        )}

      </main>

      {/* Interactive Modal: Ajouter un Logement */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-300 w-full max-w-2xl rounded-none shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200">
                  <i className="fa-solid fa-house-medical text-lg"></i>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Ajouter un Logement au Catalogue</h3>
                  <p className="text-xs text-slate-500">Publiez directement un hébergement sur FeelToHome.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-2 text-lg font-bold"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddLogementSubmit} className="space-y-4">
              
              {/* Nom du logement */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nom / Titre du Logement *
                </label>
                <input
                  type="text"
                  required
                  value={newNom}
                  onChange={(e) => setNewNom(e.target.value)}
                  placeholder="ex: Appartement de Luxe Bonapriso"
                  className="w-full px-3.5 py-2.5 text-xs rounded-none border border-slate-300 bg-slate-50 focus:outline-none focus:border-brand-500 font-semibold"
                />
              </div>

              {/* Type & Ville */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Type d'Hébergement *
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-none border border-slate-300 bg-slate-50 focus:outline-none focus:border-brand-500 font-semibold"
                  >
                    <option value="APPARTEMENT">Appartement meublé</option>
                    <option value="VILLA">Villa de luxe</option>
                    <option value="HOTEL">Hôtel</option>
                    <option value="STUDIO">Studio meublé</option>
                    <option value="RESIDENCE">Résidence</option>
                    <option value="AUBERGE">Auberge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ville *
                  </label>
                  <select
                    value={newVille}
                    onChange={(e) => setNewVille(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-none border border-slate-300 bg-slate-50 focus:outline-none focus:border-brand-500 font-semibold"
                  >
                    <option value="Douala">Douala</option>
                    <option value="Yaoundé">Yaoundé</option>
                    <option value="Kribi">Kribi</option>
                    <option value="Limbe">Limbe</option>
                    <option value="Bamenda">Bamenda</option>
                    <option value="Bafoussam">Bafoussam</option>
                  </select>
                </div>
              </div>

              {/* Quartier & Prix par nuit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Quartier
                  </label>
                  <input
                    type="text"
                    value={newQuartier}
                    onChange={(e) => setNewQuartier(e.target.value)}
                    placeholder="ex: Bastos, Bonapriso, Plage Ngoye"
                    className="w-full px-3.5 py-2.5 text-xs rounded-none border border-slate-300 bg-slate-50 focus:outline-none focus:border-brand-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Prix par nuit (FCFA / XAF) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrix}
                    onChange={(e) => setNewPrix(e.target.value)}
                    placeholder="35000"
                    className="w-full px-3.5 py-2.5 text-xs rounded-none border border-slate-300 bg-slate-50 focus:outline-none focus:border-brand-500 font-bold text-brand-600"
                  />
                </div>
              </div>

              {/* Capacités */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Voyageurs
                  </label>
                  <input
                    type="number"
                    value={newCapacite}
                    onChange={(e) => setNewCapacite(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-none border border-slate-300 bg-slate-50 text-center font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Chambres
                  </label>
                  <input
                    type="number"
                    value={newChambres}
                    onChange={(e) => setNewChambres(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-none border border-slate-300 bg-slate-50 text-center font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Lits
                  </label>
                  <input
                    type="number"
                    value={newLits}
                    onChange={(e) => setNewLits(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-none border border-slate-300 bg-slate-50 text-center font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Salles de bain
                  </label>
                  <input
                    type="number"
                    value={newSallesBain}
                    onChange={(e) => setNewSallesBain(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-none border border-slate-300 bg-slate-50 text-center font-bold"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  URL de la Photo Principale HD
                </label>
                <input
                  type="url"
                  value={newPhoto}
                  onChange={(e) => setNewPhoto(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-none border border-slate-300 bg-slate-50 focus:outline-none focus:border-brand-500 font-mono text-slate-600"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description du Logement
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Présentez les atouts du logement (climatisation, Wi-Fi, sécurité 24h/7, groupe électrogène...)..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-none border border-slate-300 bg-slate-50 focus:outline-none focus:border-brand-500 font-medium"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-none transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 border border-brand-600 rounded-none shadow-sm transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-check"></i>
                  <span>Publier le Logement</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
