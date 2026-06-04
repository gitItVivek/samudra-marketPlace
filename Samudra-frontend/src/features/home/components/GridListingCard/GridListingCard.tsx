import { Link } from 'react-router-dom';
import { formatPrice } from '@/shared/utils/format';
import type { ListingSummary } from '@/shared/types';
import styles from './GridListingCard.module.css';

interface GridListingCardProps {
  listing: ListingSummary;
}

export function GridListingCard({ listing }: GridListingCardProps) {
  return (
    <Link to={`/listings/${listing.id}`} className={styles.card}>
      <div className={styles.image}>
        <span className={styles.icon}>{listing.icon}</span>
      </div>
      <p className={styles.price}>{listing.priceLabel ?? formatPrice(listing.price)}</p>
      <p className={styles.title}>{listing.title}</p>
      <p className={styles.location}>{listing.location}</p>
    </Link>
  );
}
