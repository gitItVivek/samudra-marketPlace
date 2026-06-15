import { Link } from 'react-router-dom';
import { PageShell } from '@/shared/layout/PageShell';
import styles from './PlaceholderPage.module.css';

export function SettingsPlaceholderPage() {
  return (
    <PageShell title="Settings" rightActions="none">
      <div className={styles.page}>
        <p>Account settings — privacy and preferences — coming soon.</p>
        <Link to="/me" className={styles.link}>
          Back to account
        </Link>
      </div>
    </PageShell>
  );
}
