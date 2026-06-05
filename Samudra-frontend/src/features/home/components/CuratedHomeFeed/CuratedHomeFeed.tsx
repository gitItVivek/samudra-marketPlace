import { SectionHeader } from '@/shared/components/SectionHeader/SectionHeader';
import { ListingCard } from '@/shared/components/ListingCard/ListingCard';
import { TrendingCard } from '@/features/home/components/TrendingCard';
import { SuggestedCommunities } from '@/features/community/components/SuggestedCommunities/SuggestedCommunities';
import {
  LOCATION,
  nearYouListings,
  trendingListing,
  serviceListings,
} from '@/features/home/mock';
import styles from './CuratedHomeFeed.module.css';

export function CuratedHomeFeed() {
  return (
    <>
      <SuggestedCommunities />
      <section className={styles.section}>
        <SectionHeader title={`Near you · ${LOCATION}`} seeAllTo="/browse" />
        <div className={styles.grid}>
          {nearYouListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <SectionHeader title="Trending this week" seeAllTo="/browse" />
        <TrendingCard listing={trendingListing} />
      </section>
      <section className={styles.section}>
        <SectionHeader title="Services nearby" seeAllTo="/browse" />
        <div className={styles.grid}>
          {serviceListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </>
  );
}
