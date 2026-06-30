import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cityListingsPath } from '@/app/paths';
import { useFeedView } from '@/app/FeedViewContext';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';

/** Browse nav opens listings feed in grid mode. */
export function BrowseRedirectPage() {
  const navigate = useNavigate();
  const { setMode } = useFeedView();
  const { city } = useBrowseFilters();

  useEffect(() => {
    setMode('grid');
    navigate(cityListingsPath(city), { replace: true });
  }, [navigate, setMode, city]);

  return null;
}
