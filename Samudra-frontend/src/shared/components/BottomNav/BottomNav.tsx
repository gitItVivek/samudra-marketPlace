import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, User, Plus, Search } from 'lucide-react';
import { cityListingsPath } from '@/app/paths';
import { useFeedView } from '@/app/FeedViewContext';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import styles from './BottomNav.module.css';

function isListingsFeed(pathname: string) {
  return /\/[^/]+\/listings$/.test(pathname);
}

export function BottomNav() {
  const { pathname } = useLocation();
  const { city } = useBrowseFilters();
  const { setMode } = useFeedView();
  const listingsPath = cityListingsPath(city);
  const onListingsFeed = isListingsFeed(pathname);
  const onBrowsePage = pathname === '/browse';

  return (
    <nav className={styles.nav}>
      <Link
        to={listingsPath}
        onClick={() => setMode('curated')}
        className={`${styles.item} ${onListingsFeed ? styles.active : ''}`}
      >
        <Home size={22} />
        <span>Listings</span>
      </Link>
      <Link
        to="/browse"
        className={`${styles.item} ${onBrowsePage ? styles.active : ''}`}
      >
        <Search size={22} />
        <span>Browse</span>
      </Link>
      <Link to="/sell" className={styles.fab}>
        <Plus size={28} strokeWidth={2.5} />
      </Link>
      <Link
        to="/chats"
        className={`${styles.item} ${pathname.startsWith('/chats') ? styles.active : ''}`}
      >
        <MessageCircle size={22} />
        <span>Chats</span>
      </Link>
      <Link to="/me" className={`${styles.item} ${pathname === '/me' ? styles.active : ''}`}>
        <User size={22} />
        <span>Profile</span>
      </Link>
    </nav>
  );
}
