export interface EquipementData {
  id: number;
  nom: string;
  slug: string;
  icon_name: string;
}

export interface PhotoData {
  id: number;
  url: string;
  ordre: number;
  image_principale: boolean;
}

export interface ProprietaireData {
  id: number;
  nom: string;
  prenom: string;
  role: string;
}

export interface LogementData {
  id: number;
  nom: string;
  slug: string;
  type: string;
  type_display: string;
  description: string;
  ville: string;
  quartier: string;
  adresse: string;
  prix_par_nuit: number | string;
  devise: string;
  capacite: number;
  nombre_chambres: number;
  nombre_lits: number;
  nombre_salles_bain: number;
  statut: string;
  statut_display: string;
  proprietaire?: ProprietaireData;
  equipements: EquipementData[];
  photos: PhotoData[];
  latitude?: number | null;
  longitude?: number | null;
  politique_annulation?: string;
  regles?: string;
  date_creation: string;
}

export interface FilterParams {
  destination?: string;
  ville?: string;
  type?: string;
  prix_min?: string | number;
  prix_max?: string | number;
  equipements?: string[];
  search?: string;
  ordering?: string;
  checkin?: string;
  checkout?: string;
  guests?: string;
}

export const DEMO_LOGEMENTS: LogementData[] = [
  {
    id: 1,
    nom: "Hôtel Sawa Luxury Suite",
    slug: "hotel-sawa-luxury-suite",
    type: "HOTEL",
    type_display: "Hôtel",
    description: "Hôtel haut de gamme au cœur de Bonanjo avec piscine olympique, vue panoramique sur le fleuve Wouri et service room 24/7.",
    ville: "Douala",
    quartier: "Bonanjo",
    adresse: "Avenue des Cocotiers, Bonanjo",
    prix_par_nuit: 65000,
    devise: "FCFA",
    capacite: 2,
    nombre_chambres: 1,
    nombre_lits: 1,
    nombre_salles_bain: 1,
    statut: "DISPONIBLE",
    statut_display: "Disponible",
    equipements: [
      { id: 1, nom: "Wi-Fi Haut Débit", slug: "wifi", icon_name: "wifi" },
      { id: 2, nom: "Piscine", slug: "piscine", icon_name: "pool" },
      { id: 3, nom: "Climatisation", slug: "climatisation", icon_name: "ac_unit" },
      { id: 4, nom: "Parking Sécurisé", slug: "parking", icon_name: "local_parking" },
    ],
    photos: [
      { id: 101, url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80", ordre: 1, image_principale: true },
      { id: 102, url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", ordre: 2, image_principale: false },
      { id: 103, url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", ordre: 3, image_principale: false }
    ],
    date_creation: "2026-09-25T12:00:00Z"
  },
  {
    id: 2,
    nom: "Résidence Oceanfront Kribi",
    slug: "residence-oceanfront-kribi",
    type: "VILLA",
    type_display: "Villa",
    description: "Superbe villa privée pieds dans l'eau au bord de la plage de Kribi avec accès direct à l'océan Atlantique et jardin tropical.",
    ville: "Kribi",
    quartier: "Ngoye Plage",
    adresse: "Route des Chutes de la Lobé",
    prix_par_nuit: 120000,
    devise: "FCFA",
    capacite: 6,
    nombre_chambres: 3,
    nombre_lits: 4,
    nombre_salles_bain: 3,
    statut: "DISPONIBLE",
    statut_display: "Disponible",
    equipements: [
      { id: 1, nom: "Vue sur Mer", slug: "vue-mer", icon_name: "waves" },
      { id: 2, nom: "Wi-Fi", slug: "wifi", icon_name: "wifi" },
      { id: 3, nom: "Groupe Électrogène", slug: "generateur", icon_name: "bolt" },
      { id: 4, nom: "Barbecue", slug: "bbq", icon_name: "outdoor_grill" }
    ],
    photos: [
      { id: 201, url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", ordre: 1, image_principale: true },
      { id: 202, url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", ordre: 2, image_principale: false }
    ],
    date_creation: "2026-09-25T12:00:00Z"
  },
  {
    id: 3,
    nom: "Appartement Meublé Chic Bastos",
    slug: "appartement-meuble-chic-bastos",
    type: "APPARTEMENT",
    type_display: "Appartement meublé",
    description: "Appartement standing entièrement équipé dans le quartier ambassades de Bastos. Idéal pour séjours d'affaires et diplomatiques.",
    ville: "Yaoundé",
    quartier: "Bastos",
    adresse: "Rue Ambassade de France, Bastos",
    prix_par_nuit: 45000,
    devise: "FCFA",
    capacite: 4,
    nombre_chambres: 2,
    nombre_lits: 2,
    nombre_salles_bain: 2,
    statut: "DISPONIBLE",
    statut_display: "Disponible",
    equipements: [
      { id: 1, nom: "Wi-Fi Fibre", slug: "wifi", icon_name: "wifi" },
      { id: 2, nom: "Canal+ HD", slug: "tv", icon_name: "tv" },
      { id: 3, nom: "Climatisation", slug: "climatisation", icon_name: "ac_unit" },
      { id: 4, nom: "Gardien 24/7", slug: "securite", icon_name: "shield" }
    ],
    photos: [
      { id: 301, url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80", ordre: 1, image_principale: true },
      { id: 302, url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", ordre: 2, image_principale: false }
    ],
    date_creation: "2026-09-25T12:00:00Z"
  },
  {
    id: 4,
    nom: "Studio Executive Akwa City",
    slug: "studio-executive-akwa-city",
    type: "STUDIO",
    type_display: "Studio",
    description: "Charmant studio moderne et climatisé situé au centre des affaires d'Akwa. Cuisine équipée, smart TV et lit King Size.",
    ville: "Douala",
    quartier: "Akwa",
    adresse: "Boulevard de la Liberté, Akwa",
    prix_par_nuit: 25000,
    devise: "FCFA",
    capacite: 2,
    nombre_chambres: 1,
    nombre_lits: 1,
    nombre_salles_bain: 1,
    statut: "DISPONIBLE",
    statut_display: "Disponible",
    equipements: [
      { id: 1, nom: "Wi-Fi", slug: "wifi", icon_name: "wifi" },
      { id: 2, nom: "Smart TV", slug: "tv", icon_name: "tv" },
      { id: 3, nom: "Micro-ondes", slug: "cuisine", icon_name: "microwave" }
    ],
    photos: [
      { id: 401, url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", ordre: 1, image_principale: true }
    ],
    date_creation: "2026-09-25T12:00:00Z"
  },
  {
    id: 5,
    nom: "Villa VIP Golf & Spa",
    slug: "villa-vip-golf-spa",
    type: "RESIDENCE",
    type_display: "Résidence",
    description: "Résidence de grand luxe située à Yaoundé Golf. Jardin luxuriant, piscine privée, hammam et majordome dédié.",
    ville: "Yaoundé",
    quartier: "Golf",
    adresse: "Avenue du Golf Club",
    prix_par_nuit: 150000,
    devise: "FCFA",
    capacite: 8,
    nombre_chambres: 4,
    nombre_lits: 5,
    nombre_salles_bain: 4,
    statut: "DISPONIBLE",
    statut_display: "Disponible",
    equipements: [
      { id: 1, nom: "Piscine Chauffée", slug: "piscine", icon_name: "pool" },
      { id: 2, nom: "Spa & Hammam", slug: "spa", icon_name: "spa" },
      { id: 3, nom: "Groupe Automatique", slug: "generateur", icon_name: "bolt" }
    ],
    photos: [
      { id: 501, url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80", ordre: 1, image_principale: true }
    ],
    date_creation: "2026-09-25T12:00:00Z"
  },
  {
    id: 6,
    nom: "Auberge Éco-Lodge Limbe",
    slug: "auberge-eco-lodge-limbe",
    type: "AUBERGE",
    type_display: "Auberge",
    description: "Auberge pittoresque nichée entre le mont Cameroun et les plages de sable noir de Limbe. Ambiance chaleureuse et petit-déjeuner local inclus.",
    ville: "Limbe",
    quartier: "Down Beach",
    adresse: "Beach Road, Limbe",
    prix_par_nuit: 18000,
    devise: "FCFA",
    capacite: 2,
    nombre_chambres: 1,
    nombre_lits: 1,
    nombre_salles_bain: 1,
    statut: "DISPONIBLE",
    statut_display: "Disponible",
    equipements: [
      { id: 1, nom: "Petit-Déjeuner Inclus", slug: "breakfast", icon_name: "restaurant" },
      { id: 2, nom: "Vue Montagne", slug: "vue-montagne", icon_name: "filter_hdr" }
    ],
    photos: [
      { id: 601, url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80", ordre: 1, image_principale: true }
    ],
    date_creation: "2026-09-25T12:00:00Z"
  }
];

export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim()) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    return '';
  }
  return 'http://127.0.0.1:8000';
}

export function formatImageUrl(url: string | undefined | null): string {
  if (!url) return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${getApiBaseUrl()}${url.startsWith('/') ? '' : '/'}${url}`;
}

export async function fetchLogements(params: FilterParams = {}): Promise<LogementData[]> {
  try {
    const query = new URLSearchParams();

    const villeFilter = params.ville || params.destination;
    if (villeFilter && villeFilter.trim()) {
      query.append('ville', villeFilter.trim());
    }

    if (params.type && params.type !== 'TOUS') {
      query.append('type', params.type.trim());
    }

    if (params.prix_min) {
      query.append('prix_min', String(params.prix_min));
    }

    if (params.prix_max) {
      query.append('prix_max', String(params.prix_max));
    }

    if (params.search && params.search.trim()) {
      query.append('search', params.search.trim());
    }

    if (params.ordering) {
      query.append('ordering', params.ordering);
    }

    if (params.equipements && params.equipements.length > 0) {
      params.equipements.forEach(eq => {
        if (eq.trim()) query.append('equipements', eq.trim());
      });
    }

    const baseUrl = getApiBaseUrl();
    const url = baseUrl ? `${baseUrl}/api/logements/?${query.toString()}` : `/api/logements/?${query.toString()}`;
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    let results: LogementData[] = [];
    if (Array.isArray(data)) {
      results = data;
    } else if (data && Array.isArray(data.results)) {
      results = data.results;
    }

    if (results.length > 0) {
      return results;
    }
  } catch (err) {
    console.warn("Utilisation des logements de démonstration FeelToHome en mode fallback", err);
  }

  // Fallback demo filtering for seamless experience
  let filtered = [...DEMO_LOGEMENTS];
  const targetVille = params.ville || params.destination;
  if (targetVille && targetVille.trim()) {
    filtered = filtered.filter(l => l.ville.toLowerCase().includes(targetVille.trim().toLowerCase()) || l.quartier.toLowerCase().includes(targetVille.trim().toLowerCase()));
  }
  if (params.type && params.type !== 'TOUS') {
    filtered = filtered.filter(l => l.type.toUpperCase() === params.type?.toUpperCase());
  }
  return filtered;
}

export async function fetchLogementBySlug(slug: string): Promise<LogementData | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = baseUrl ? `${baseUrl}/api/logements/${slug}/` : `/api/logements/${slug}/`;
    const response = await fetch(url, { cache: 'no-store' });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn("Utilisation du logement démo par slug", err);
  }

  const demoMatch = DEMO_LOGEMENTS.find(l => l.slug === slug || String(l.id) === slug);
  return demoMatch || DEMO_LOGEMENTS[0];
}

export async function fetchEquipements(): Promise<EquipementData[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = baseUrl ? `${baseUrl}/api/equipements/` : `/api/equipements/`;
    const response = await fetch(url, { cache: 'no-store' });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.results)) return data.results;
    }
  } catch (err) {
    console.warn("Equipements fallback", err);
  }

  return [
    { id: 1, nom: "Wi-Fi Haut Débit", slug: "wifi", icon_name: "wifi" },
    { id: 2, nom: "Piscine", slug: "piscine", icon_name: "pool" },
    { id: 3, nom: "Climatisation", slug: "climatisation", icon_name: "ac_unit" },
    { id: 4, nom: "Parking Sécurisé", slug: "parking", icon_name: "local_parking" },
  ];
}
