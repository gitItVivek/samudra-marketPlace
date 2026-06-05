import { Link } from 'react-router-dom';
import { Bell, Heart } from 'lucide-react';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import styles from './AppHeader.module.css';

export function AppHeader() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
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
        <Link to="/profiles/rahul-k">
          <Avatar initials="RK" size="sm" />
        </Link>
      </div>
    </header>
  );
}
