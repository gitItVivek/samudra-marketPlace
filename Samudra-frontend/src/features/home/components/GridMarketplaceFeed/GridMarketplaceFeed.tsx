import { useEffect, useState } from 'react';
import { GridListingCard } from '@/features/home/components/GridListingCard/GridListingCard';
import { SearchWithFilters } from '@/shared/components/SearchWithFilters/SearchWithFilters';
import { ListingFilters } from '@/shared/components/ListingFilters/ListingFilters';
import { LISTING_CATEGORIES, GRID_PAGE_SIZE } from '@/shared/constants/categories';
import { defaultListingFilters, type ListingFiltersState } from '@/shared/types/filters';
import { Button } from '@/shared/components/Button/Button';
import { searchListings } from '@/api/listings';
import { mapListingSummary } from '@/shared/utils/mappers';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import type { ListingSummary } from '@/shared/types';
import styles from './GridMarketplaceFeed.module.css';

export function GridMarketplaceFeed() {
  const { city, state, categoryType, q } = useBrowseFilters();
  const [visibleCount, setVisibleCount] = useState(GRID_PAGE_SIZE);
  const [filters, setFilters] = useState<ListingFiltersState>(defaultListingFilters);
  const [listings, setListings] = useState<ListingSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    searchListings({
      city,
      state,
      categoryType,
      q: q || undefined,
      page: 0,
      size: 50,
    })
      .then((page) => {
        if (cancelled) return;
        setListings(page.items.map(mapListingSummary));
        setTotal(page.totalElements);
        setVisibleCount(GRID_PAGE_SIZE);
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
  }, [city, state, categoryType, q]);

  const visible = listings.slice(0, visibleCount);
  const hasMore = visibleCount < listings.length;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          <div className={styles.filtersBlock}>
            <ListingFilters filters={filters} onChange={setFilters} compact sidebar showBrowseLocation />
          </div>
          <div className={styles.browseBlock}>
            <h2 className={styles.sidebarTitle}>Browse</h2>
            <nav className={styles.categoryNav} aria-label="Categories">
              {LISTING_CATEGORIES.map((cat) => (
                <button key={cat.id} type="button" className={styles.categoryItem}>
                  <span className={styles.catIcon}>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      <div className={styles.main}>
        <div className={styles.mobileSearch}>
          <SearchWithFilters />
        </div>
        <div className={styles.desktopSearch}>
          <SearchWithFilters />
        </div>
        <div className={styles.gridHeader}>
          <h2>Today&apos;s listings</h2>
          <span className={styles.count}>
            {loading ? 'Loading…' : `${total} in ${city}`}
          </span>
        </div>
        {error && <p className={styles.endHint}>{error}</p>}
        {!loading && !error && listings.length === 0 && (
          <p className={styles.endHint}>No listings in {city} yet. Be the first to post one.</p>
        )}
        <div className={styles.grid}>
          {visible.map((listing) => (
            <GridListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        {hasMore ? (
          <div className={styles.loadMore}>
            <Button variant="secondary" onClick={() => setVisibleCount((n) => n + GRID_PAGE_SIZE)}>
              See more listings
            </Button>
          </div>
        ) : listings.length > 0 ? (
          <p className={styles.endHint}>You&apos;ve seen all listings for now.</p>
        ) : null}
      </div>
    </div>
  );
}
