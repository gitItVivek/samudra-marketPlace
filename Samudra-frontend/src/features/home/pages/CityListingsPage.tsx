import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { cityNameFromSlug } from '@/app/paths';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import { HomePage } from '@/features/home/pages/HomePage';

/** Listings feed at /:citySlug/listings — syncs URL city into browse filters. */
export function CityListingsPage() {
  const { citySlug } = useParams();
  const { setCity } = useBrowseFilters();

  // Sync URL → browse city only when the route slug changes (not on every keystroke).
  useEffect(() => {
    if (!citySlug) return;
    const nameFromUrl = cityNameFromSlug(citySlug);
    if (nameFromUrl) {
      setCity(nameFromUrl);
    }
  }, [citySlug, setCity]);

  return <HomePage />;
}

export function HomeRedirectPage() {
  const { city } = useBrowseFilters();
  return <Navigate to={`/${city.trim().toLowerCase().replace(/\s+/g, '-')}/listings`} replace />;
}
