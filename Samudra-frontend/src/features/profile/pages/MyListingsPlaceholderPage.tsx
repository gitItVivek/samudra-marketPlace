import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PageShell } from '@/shared/layout/PageShell';
import { Button } from '@/shared/components/Button/Button';
import { MyListingCard } from '@/features/profile/components/MyListingCard/MyListingCard';
import { getMyListings } from '@/api/listings';
import { mapListingSummary } from '@/shared/utils/mappers';
import { useAuth } from '@/features/identity/context/AuthContext';
import type { ListingSummary } from '@/shared/types';
import styles from './MyListingsPage.module.css';

export function MyListingsPlaceholderPage() {
  const { accessToken, isAuthenticated } = useAuth();
  const [listings, setListings] = useState<ListingSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    getMyListings(accessToken, 0, 50)
      .then((page) => {
        if (!cancelled) setListings(page.items.map(mapListingSummary));
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  return (
    <PageShell title="Your listings" rightActions="none">
      <div className={styles.page}>
        <div className={styles.toolbar}>
          <span className={styles.count}>
            {loading ? 'Loading…' : `${listings.length} listing${listings.length === 1 ? '' : 's'}`}
          </span>
          <Link to="/sell">
            <Button variant="primary">
              <Plus size={18} />
              Post listing
            </Button>
          </Link>
        </div>

        {!isAuthenticated && (
          <div className={styles.empty}>
            <p>Sign in to see your listings.</p>
            <Link to="/auth/login">
              <Button variant="primary">Sign in</Button>
            </Link>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        {!loading && isAuthenticated && listings.length === 0 && !error && (
          <div className={styles.empty}>
            <p>You have no listings yet. Post your first one to get started.</p>
            <Link to="/sell">
              <Button variant="primary">Post a listing</Button>
            </Link>
          </div>
        )}

        {listings.length > 0 && (
          <div className={styles.grid}>
            {listings.map((listing) => (
              <MyListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
