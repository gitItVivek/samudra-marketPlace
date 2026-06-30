import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, User, Plus, Users } from 'lucide-react';
import { cityListingsPath } from '@/app/paths';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import styles from './BottomNav.module.css';

function isListingsFeed(pathname: string) {
  return /\/[^/]+\/listings$/.test(pathname);
}

export function BottomNav() {
  const { pathname } = useLocation();
  const { city } = useBrowseFilters();
  const listingsPath = cityListingsPath(city);

  return (
    <nav className={styles.nav}>
      <Link
        to={listingsPath}
        className={`${styles.item} ${isListingsFeed(pathname) ? styles.active : ''}`}
      >
        <Home size={22} />
        <span>Listings</span>
      </Link>
      <Link
        to="/communities"
        className={`${styles.item} ${pathname.startsWith('/communities') ? styles.active : ''}`}
      >
        <Users size={22} />
        <span>Groups</span>
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
