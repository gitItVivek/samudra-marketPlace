import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Plus, Search, Users } from 'lucide-react';
import { cityListingsPath } from '@/app/paths';
import { useFeedView } from '@/app/FeedViewContext';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import { FeedViewToggle } from '@/shared/components/FeedViewToggle/FeedViewToggle';
import { ProfileMenu } from '@/shared/components/ProfileMenu/ProfileMenu';
import styles from './DesktopNav.module.css';

function isListingsFeed(pathname: string) {
  return /\/[^/]+\/listings$/.test(pathname);
}

export function DesktopNav() {
  const { pathname } = useLocation();
  const { city } = useBrowseFilters();
  const { mode } = useFeedView();
  const listingsPath = cityListingsPath(city);
  const onListingsFeed = isListingsFeed(pathname);
  const isGridBrowse = onListingsFeed && mode === 'grid';

  const isActive = (label: string) => {
    if (label === 'Listings') return onListingsFeed && mode === 'curated';
    if (label === 'Browse') return isGridBrowse || pathname === '/browse';
    if (label === 'Communities') return pathname.startsWith('/communities');
    if (label === 'Chats') return pathname.startsWith('/chats');
    return false;
  };

  const links = [
    { to: listingsPath, label: 'Listings', icon: Home },
    { to: '/browse', label: 'Browse', icon: Search },
    { to: '/communities', label: 'Communities', icon: Users },
    { to: '/chats', label: 'Chats', icon: MessageCircle },
  ] as const;

  return (
    <header className={`${styles.nav} desktopOnly`}>
      <div className={styles.inner}>
        <Link to={listingsPath} className={styles.logo}>
          <span className={styles.logoPrimary}>samudra</span>
          <span className={styles.logoSecondary}> market</span>
        </Link>
        <nav className={styles.links} aria-label="Main navigation">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className={`${styles.link} ${isActive(label) ? styles.linkActive : ''}`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          {onListingsFeed && <FeedViewToggle />}
          <Link to="/sell" className={styles.sellBtn}>
            <Plus size={18} />
            Sell
          </Link>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
