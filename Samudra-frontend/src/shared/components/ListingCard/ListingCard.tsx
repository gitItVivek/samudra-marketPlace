import { Link } from 'react-router-dom';
import { BadgeCheck, MapPin } from 'lucide-react';
import { Badge } from '@/shared/components/Badge/Badge';
import { formatPrice } from '@/shared/utils/format';
import type { ListingSummary } from '@/shared/types';
import styles from './ListingCard.module.css';

interface ListingCardProps {
  listing: ListingSummary;
  compact?: boolean;
}

export function ListingCard({ listing, compact }: ListingCardProps) {
  return (
    <Link to={`/listings/${listing.id}`} className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <div className={styles.imageArea}>
        {listing.condition && (
          <span className={styles.badgeTop}>
            <Badge variant={listing.condition}>{listing.condition === 'used' ? 'Used' : 'New'}</Badge>
          </span>
        )}
        <span className={styles.icon}>{listing.icon}</span>
        {listing.boosted && (
          <span className={styles.badgeBoost}>
            <Badge variant="boosted">Boosted</Badge>
          </span>
        )}
      </div>
      <div className={styles.body}>
        <p className={styles.price}>{listing.priceLabel ?? formatPrice(listing.price)}</p>
        <p className={styles.title}>{listing.title}</p>
        {listing.verifiedSeller && (
          <p className={styles.verified}>
            <BadgeCheck size={14} />
            Verified seller
          </p>
        )}
        <p className={styles.meta}>
          <MapPin size={12} />
          {listing.location} · {listing.postedAgo}
        </p>
      </div>
    </Link>
  );
}
