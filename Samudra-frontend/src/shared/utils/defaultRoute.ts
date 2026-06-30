import { cityListingsPath } from '@/app/paths';
import { CITY_KEY } from '@/shared/context/BrowseFiltersContext';

/** Default post-login / post-signup destination: /:city/listings */
export function defaultListingsPath(): string {
  try {
    const city = localStorage.getItem(CITY_KEY) ?? 'Delhi';
    return cityListingsPath(city);
  } catch {
    return '/delhi/listings';
  }
}
