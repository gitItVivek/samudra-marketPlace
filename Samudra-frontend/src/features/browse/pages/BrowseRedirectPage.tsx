import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/paths';
import { useFeedView } from '@/app/FeedViewContext';

/** Browse nav opens home in grid feed mode (sidebar + filters). */
export function BrowseRedirectPage() {
  const navigate = useNavigate();
  const { setMode } = useFeedView();

  useEffect(() => {
    setMode('grid');
    navigate(ROUTES.home, { replace: true });
  }, [navigate, setMode]);

  return null;
}
