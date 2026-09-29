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
  const query = new URLSearchParams();

  // Convert 'destination' to 'ville' backend filter parameter per Rule #2
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

  const url = `${getApiBaseUrl()}/api/logements/?${query.toString()}`;
  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (Array.isArray(data)) {
    return data;
  } else if (data && Array.isArray(data.results)) {
    return data.results;
  }
  return [];
}

export async function fetchLogementBySlug(slug: string): Promise<LogementData | null> {
  const url = `${getApiBaseUrl()}/api/logements/${slug}/`;
  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchEquipements(): Promise<EquipementData[]> {
  const url = `${getApiBaseUrl()}/api/equipements/`;
  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  if (Array.isArray(data)) {
    return data;
  } else if (data && Array.isArray(data.results)) {
    return data.results;
  }
  return [];
}
