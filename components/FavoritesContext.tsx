'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'feeltohome_favorites';

interface FavoritesContextType {
  savedSlugs: string[];
  savedCount: number;
  isLoaded: boolean;
  isSaved: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  addFavorite: (slug: string) => void;
  removeFavorite: (slug: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const normalizeSlug = (slug: unknown): string => {
  if (typeof slug !== 'string') return '';
  return slug.trim();
};

const normalizeSlugsArray = (arr: unknown): string[] => {
  if (!Array.isArray(arr)) return [];
  const normalized = arr
    .map(normalizeSlug)
    .filter((s) => s.length > 0);
  return Array.from(new Set(normalized));
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage once mounted on client (SSR-safe, prevents hydration mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedSlugs(normalizeSlugsArray(parsed));
      }
    } catch (err) {
      console.warn('Could not read favorites from localStorage:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Synchronize across browser tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          if (e.newValue) {
            const parsed = JSON.parse(e.newValue);
            setSavedSlugs(normalizeSlugsArray(parsed));
          } else {
            setSavedSlugs([]);
          }
        } catch {
          // Ignore parse errors from other sources
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Helper to persist state
  const persist = useCallback((nextSlugs: string[]) => {
    const cleanSlugs = normalizeSlugsArray(nextSlugs);
    setSavedSlugs(cleanSlugs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanSlugs));
    } catch (err) {
      console.warn('Could not save favorites to localStorage:', err);
    }
  }, []);

  const isSaved = useCallback(
    (rawSlug: string) => {
      const slug = normalizeSlug(rawSlug);
      if (!isLoaded || !slug) return false;
      return savedSlugs.includes(slug);
    },
    [isLoaded, savedSlugs]
  );

  const addFavorite = useCallback(
    (rawSlug: string) => {
      const slug = normalizeSlug(rawSlug);
      if (!slug) return;
      if (!savedSlugs.includes(slug)) {
        persist([...savedSlugs, slug]);
      }
    },
    [savedSlugs, persist]
  );

  const removeFavorite = useCallback(
    (rawSlug: string) => {
      const slug = normalizeSlug(rawSlug);
      if (!slug) return;
      if (savedSlugs.includes(slug)) {
        persist(savedSlugs.filter((s) => s !== slug));
      }
    },
    [savedSlugs, persist]
  );

  const toggleFavorite = useCallback(
    (rawSlug: string) => {
      const slug = normalizeSlug(rawSlug);
      if (!slug) return;
      if (savedSlugs.includes(slug)) {
        removeFavorite(slug);
      } else {
        addFavorite(slug);
      }
    },
    [savedSlugs, addFavorite, removeFavorite]
  );

  const clearFavorites = useCallback(() => {
    persist([]);
  }, [persist]);

  return (
    <FavoritesContext.Provider
      value={{
        savedSlugs,
        savedCount: savedSlugs.length,
        isLoaded,
        isSaved,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
