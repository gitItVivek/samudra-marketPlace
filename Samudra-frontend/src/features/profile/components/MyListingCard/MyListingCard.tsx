import { Link } from 'react-router-dom';
import { formatPrice } from '@/shared/utils/format';
import type { ListingSummary } from '@/shared/types';
import styles from './MyListingCard.module.css';

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Active',
  DRAFT: 'Draft',
  SOLD: 'Sold',
  INACTIVE: 'Inactive',
  REMOVED: 'Removed',
  TAKEN_DOWN: 'Taken down',
  EXPIRED: 'Expired',
};

interface MyListingCardProps {
  listing: ListingSummary;
}

export function MyListingCard({ listing }: MyListingCardProps) {
  const statusLabel = STATUS_LABELS[listing.status ?? 'ACTIVE'] ?? listing.status;

  return (
    <Link to={`/listings/${listing.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {listing.coverImageUrl ? (
          <img src={listing.coverImageUrl} alt="" className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.icon}>{listing.icon}</span>
          </div>
        )}
        <span className={styles.status}>{statusLabel}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.price}>{listing.priceLabel ?? formatPrice(listing.price)}</p>
        <h3 className={styles.title}>{listing.title}</h3>
        <p className={styles.location}>{listing.location}</p>
        <p className={styles.posted}>{listing.postedAgo}</p>
      </div>
    </Link>
  );
}
