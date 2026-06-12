import { Link } from 'react-router-dom';
import { Bell, Heart } from 'lucide-react';
import { ROUTES } from '@/app/paths';
import { useAuth } from '@/features/identity/context/AuthContext';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import styles from './AppHeader.module.css';

function profileInitials(displayName: string) {
  return displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function AppHeader() {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <Link to={ROUTES.home} className={styles.logo}>
        <span className={styles.logoPrimary}>samudra</span>
        <span className={styles.logoSecondary}> market</span>
      </Link>
      <div className={styles.actions}>
        <button type="button" className={styles.iconBtn} aria-label="Notifications">
          <Bell size={22} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Favorites">
          <Heart size={22} />
        </button>
        <Link to={user ? '/me' : ROUTES.authLogin} aria-label={user ? 'My account' : 'Sign in'}>
          <Avatar initials={user ? profileInitials(user.displayName) : '?'} size="sm" />
        </Link>
      </div>
    </header>
  );
}
