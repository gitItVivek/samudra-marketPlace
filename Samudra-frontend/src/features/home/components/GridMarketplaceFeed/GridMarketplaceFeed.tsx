import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { GridListingCard } from '@/features/home/components/GridListingCard/GridListingCard';
import { SuggestedCommunities } from '@/features/community/components/SuggestedCommunities/SuggestedCommunities';
import { categories, gridListingPool, GRID_PAGE_SIZE, LOCATION } from '@/features/home/mock';
import { Button } from '@/shared/components/Button/Button';
import styles from './GridMarketplaceFeed.module.css';

export function GridMarketplaceFeed() {
  const [visibleCount, setVisibleCount] = useState(GRID_PAGE_SIZE);
  const visible = gridListingPool.slice(0, visibleCount);
  const hasMore = visibleCount < gridListingPool.length;

  const loadMore = () => {
    setVisibleCount((n) => Math.min(n + GRID_PAGE_SIZE, gridListingPool.length));
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Browse</h2>
        <div className={styles.sidebarSearch}>
          <Search size={18} />
          <input type="search" placeholder="Search listings..." readOnly />
        </div>
        <p className={styles.locationLabel}>
          <MapPin size={14} />
          {LOCATION}
        </p>
        <nav className={styles.categoryNav} aria-label="Categories">
          {categories.map((cat) => (
            <button key={cat.id} type="button" className={styles.categoryItem}>
              <span className={styles.catIcon}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className={styles.main}>
        <div className={styles.mobileSearch}>
          <Search size={18} />
          <input type="search" placeholder="Search listings..." readOnly />
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
            <p className={styles.loadHint}>
              Showing {visible.length} of {gridListingPool.length} — more load when you connect the API
            </p>
          </div>
        ) : (
          <p className={styles.endHint}>You&apos;ve seen all listings for now.</p>
        )}
      </div>
    </div>
  );
}
