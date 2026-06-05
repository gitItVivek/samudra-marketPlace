import { useState } from 'react';
import { GridListingCard } from '@/features/home/components/GridListingCard/GridListingCard';
import { SuggestedCommunities } from '@/features/community/components/SuggestedCommunities/SuggestedCommunities';
import { SearchWithFilters } from '@/shared/components/SearchWithFilters/SearchWithFilters';
import { ListingFilters } from '@/shared/components/ListingFilters/ListingFilters';
import { categories, gridListingPool, GRID_PAGE_SIZE } from '@/features/home/mock';
import { defaultListingFilters, type ListingFiltersState } from '@/shared/types/filters';
import { Button } from '@/shared/components/Button/Button';
import styles from './GridMarketplaceFeed.module.css';

export function GridMarketplaceFeed() {
  const [visibleCount, setVisibleCount] = useState(GRID_PAGE_SIZE);
  const [filters, setFilters] = useState<ListingFiltersState>(defaultListingFilters);
  const visible = gridListingPool.slice(0, visibleCount);
  const hasMore = visibleCount < gridListingPool.length;

  const loadMore = () => {
    setVisibleCount((n) => Math.min(n + GRID_PAGE_SIZE, gridListingPool.length));
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          <h2 className={styles.sidebarTitle}>Browse</h2>
          <div className={styles.mobileOnlyFilters}>
            <SearchWithFilters showLocation={false} />
          </div>
          <nav className={styles.categoryNav} aria-label="Categories">
            {categories.map((cat) => (
              <button key={cat.id} type="button" className={styles.categoryItem}>
                <span className={styles.catIcon}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </nav>
          <div className={styles.filtersBlock}>
            <ListingFilters filters={filters} onChange={setFilters} compact />
          </div>
        </div>
      </aside>

      <div className={styles.main}>
        <div className={styles.desktopSearch}>
          <SearchWithFilters />
        </div>
        <SuggestedCommunities variant="cards" />
        <div className={styles.gridHeader}>
          <h2>Today&apos;s listings</h2>
          <span className={styles.count}>{gridListingPool.length} near you</span>
        </div>
        <div className={styles.grid}>
          {visible.map((listing) => (
            <GridListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        {hasMore ? (
          <div className={styles.loadMore}>
            <Button variant="secondary" onClick={loadMore}>
              See more listings
            </Button>
          </div>
        ) : (
          <p className={styles.endHint}>You&apos;ve seen all listings for now.</p>
        )}
      </div>
    </div>
  );
}
