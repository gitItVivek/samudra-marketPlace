import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { ROUTES } from '@/app/paths';
import { ProfileMenu } from '@/shared/components/ProfileMenu/ProfileMenu';
import styles from './AppHeader.module.css';

export function AppHeader() {
  return (
    <header className={styles.header}>
      <Link to={ROUTES.home} className={styles.logo}>
        <span className={styles.logoPrimary}>samudra</span>
        <span className={styles.logoSecondary}> market</span>
      </Link>
      <div className={styles.actions}>
        <button type="button" className={styles.iconBtn} aria-label="Favorites">
          <Heart size={22} />
        </button>
        <ProfileMenu />
      </div>
    </header>
  );
}
