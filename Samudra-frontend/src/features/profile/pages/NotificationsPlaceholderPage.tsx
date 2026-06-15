import { Link } from 'react-router-dom';
import { PageShell } from '@/shared/layout/PageShell';
import styles from './PlaceholderPage.module.css';

export function NotificationsPlaceholderPage() {
  return (
    <PageShell title="Notifications" rightActions="none">
      <div className={styles.page}>
        <p>Messages, listing updates, and community alerts will show up here.</p>
        <Link to="/me" className={styles.link}>
          Back to account
        </Link>
      </div>
    </PageShell>
  );
}
