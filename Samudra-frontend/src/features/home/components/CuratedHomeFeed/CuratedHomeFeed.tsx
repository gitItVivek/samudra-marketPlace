import { useEffect, useState } from 'react';
import { SectionHeader } from '@/shared/components/SectionHeader/SectionHeader';
import { ListingCard } from '@/shared/components/ListingCard/ListingCard';
import { SuggestedCommunities } from '@/features/community/components/SuggestedCommunities/SuggestedCommunities';
import { searchListings } from '@/api/listings';
import { mapListingSummary } from '@/shared/utils/mappers';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import type { ListingSummary } from '@/shared/types';
import styles from './CuratedHomeFeed.module.css';

export function CuratedHomeFeed() {
  const { city } = useBrowseFilters();
  const [listings, setListings] = useState<ListingSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    searchListings({ city, page: 0, size: 12 })
      .then((page) => {
        if (cancelled) return;
        setListings(page.items.map(mapListingSummary));
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
  }, [city]);

  const nearYou = listings.slice(0, 4);
  const services = listings.filter((l) => l.title.toLowerCase().includes('service')).slice(0, 3);

  return (
    <div className={styles.feed}>
      <SuggestedCommunities />
      <section className={styles.section}>
        <SectionHeader title={`Near you · ${city}`} seeAllTo="/browse" />
        {error && <p>{error}</p>}
        {loading && <p>Loading listings…</p>}
        {!loading && nearYou.length === 0 && (
          <p>No listings in {city} yet.</p>
        )}
        <div className={styles.listingGrid}>
          {nearYou.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
      {services.length > 0 && (
        <section className={styles.section}>
          <SectionHeader title="Services nearby" seeAllTo="/browse" />
          <div className={styles.servicesRow}>
            {services.map((listing) => (
              <div key={listing.id} className={styles.serviceCard}>
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
