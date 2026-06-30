import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { ListingSummary } from '@/shared/types';
import styles from './TrendingCard.module.css';

interface TrendingCardProps {
  listing: ListingSummary;
}

export function TrendingCard({ listing }: TrendingCardProps) {
  return (
    <Link to={`/listings/${listing.id}`} className={styles.card}>
      <div className={styles.iconArea}>
        <span className={styles.icon}>{listing.icon}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.price}>{listing.priceLabel ?? `₹${listing.price.toLocaleString('en-IN')}/mo`}</p>
        <p className={styles.title}>{listing.title}</p>
        <p className={styles.desc}>Fully furnished · Ready to move</p>
        <div className={styles.seller}>
          <span className={styles.sellerAvatar}>SP</span>
          <span>Suresh P.</span>
          <Star size={12} fill="#eab308" color="#eab308" />
          <span>4.8 · {listing.location}</span>
        </div>
      </div>
    </Link>
  );
}
