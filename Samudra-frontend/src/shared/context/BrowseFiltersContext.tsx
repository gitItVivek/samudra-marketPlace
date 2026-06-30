import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CategoryType } from '@/shared/types/api';
import { parseCityState } from '@/shared/utils/location';

export const CITY_KEY = 'samudra_selected_city';
export const STATE_KEY = 'samudra_selected_state';

interface BrowseFiltersValue {
  city: string;
  state: string;
  categoryType?: CategoryType;
  q: string;
  setCity: (city: string, state?: string) => void;
  setCategoryType: (categoryType?: CategoryType) => void;
  setQuery: (q: string) => void;
}

const BrowseFiltersContext = createContext<BrowseFiltersValue | null>(null);

export function BrowseFiltersProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState(() => localStorage.getItem(CITY_KEY) ?? 'Delhi');
  const [state, setStateState] = useState(() => localStorage.getItem(STATE_KEY) ?? 'Delhi');
  const [categoryType, setCategoryType] = useState<CategoryType | undefined>();
  const [q, setQuery] = useState('');

  const setCity = useCallback((nextCity: string, nextState?: string) => {
    const parsed = nextState
      ? { city: nextCity.trim(), state: nextState.trim() }
      : parseCityState(nextCity);
    if (!parsed.city) return;
    setCityState(parsed.city);
    setStateState(parsed.state);
    localStorage.setItem(CITY_KEY, parsed.city);
    localStorage.setItem(STATE_KEY, parsed.state);
  }, []);

  const value = useMemo(
    () => ({
      city,
      state,
      categoryType,
      q,
      setCity,
      setCategoryType,
      setQuery,
    }),
    [city, state, categoryType, q, setCity],
  );

  return (
    <BrowseFiltersContext.Provider value={value}>{children}</BrowseFiltersContext.Provider>
  );
}

export function useBrowseFilters() {
  const ctx = useContext(BrowseFiltersContext);
  if (!ctx) {
    throw new Error('useBrowseFilters must be used within BrowseFiltersProvider');
  }
  return ctx;
}
