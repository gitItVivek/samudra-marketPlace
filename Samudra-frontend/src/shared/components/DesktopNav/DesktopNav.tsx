import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Plus, Search, User, Users } from 'lucide-react';
import { ROUTES } from '@/app/paths';
import { FeedViewToggle } from '@/shared/components/FeedViewToggle/FeedViewToggle';
import styles from './DesktopNav.module.css';

const LINKS = [
  { to: ROUTES.home, label: 'Home', icon: Home, exact: true },
  { to: '/browse', label: 'Browse', icon: Search, exact: true },
  { to: '/communities', label: 'Communities', icon: Users, exact: false },
  { to: '/chats', label: 'Chats', icon: MessageCircle, exact: false },
  { to: '/me', label: 'Profile', icon: User, exact: true },
] as const;

export function DesktopNav() {
  const { pathname } = useLocation();
  const isHome = pathname === ROUTES.home;

  const isActive = (to: string, exact: boolean) => {
    if (to === '/communities') return pathname.startsWith('/communities');
    if (to === '/chats') return pathname.startsWith('/chats');
    return exact ? pathname === to : pathname.startsWith(to);
  };

  return (
    <header className={`${styles.nav} desktopOnly`}>
      <div className={styles.inner}>
        <Link to={ROUTES.home} className={styles.logo}>
          <span className={styles.logoPrimary}>samudra</span>
          <span className={styles.logoSecondary}> market</span>
        </Link>
        <nav className={styles.links} aria-label="Main navigation">
          {LINKS.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              className={`${styles.link} ${isActive(to, exact) ? styles.linkActive : ''}`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          {isHome && <FeedViewToggle />}
          <Link to="/sell" className={styles.sellBtn}>
            <Plus size={18} />
            Sell
          </Link>
        </div>
      </div>
    </header>
  );
}
