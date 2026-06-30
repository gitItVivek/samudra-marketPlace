import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { cityListingsPath } from '@/app/paths';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import { parseCityState } from '@/shared/utils/location';

/** Updates browse city and syncs the URL to /:citySlug/listings. */
export function useCityNavigation() {
  const navigate = useNavigate();
  const { setCity } = useBrowseFilters();

  return useCallback(
    (locationInput: string, nextState?: string) => {
      const trimmed = locationInput.trim();
      if (!trimmed) return;
      const parsed = nextState
        ? { city: trimmed, state: nextState.trim() }
        : parseCityState(trimmed);
      if (!parsed.city) return;
      setCity(parsed.city, parsed.state);
      navigate(cityListingsPath(parsed.city), { replace: true });
    },
    [navigate, setCity],
  );
}
