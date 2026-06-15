import { Link } from 'react-router-dom';
import { PageShell } from '@/shared/layout/PageShell';
import { Button } from '@/shared/components/Button/Button';
import styles from './PlaceholderPage.module.css';

export function MyListingsPlaceholderPage() {
  return (
    <PageShell title="Your listings" rightActions="none">
      <div className={styles.page}>
        <p>Your active and draft listings will appear here.</p>
        <Link to="/sell">
          <Button variant="primary">Post a listing</Button>
        </Link>
      </div>
    </PageShell>
  );
}
