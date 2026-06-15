import { SectionHeader } from '@/shared/components/SectionHeader/SectionHeader';
import { ListingCard } from '@/shared/components/ListingCard/ListingCard';
import { SuggestedCommunities } from '@/features/community/components/SuggestedCommunities/SuggestedCommunities';
import {
  LOCATION,
  nearYouListings,
  serviceListings,
} from '@/features/home/mock';
import styles from './CuratedHomeFeed.module.css';

export function CuratedHomeFeed() {
  return (
    <div className={styles.feed}>
      <SuggestedCommunities />
      <section className={styles.section}>
        <SectionHeader title={`Near you · ${LOCATION}`} seeAllTo="/browse" />
        <div className={styles.listingGrid}>
          {nearYouListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <SectionHeader title="Services nearby" seeAllTo="/browse" />
        <div className={styles.servicesRow}>
          {serviceListings.map((listing) => (
            <div key={listing.id} className={styles.serviceCard}>
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
