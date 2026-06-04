import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { suggestedCommunities } from '@/features/community/mock';
import styles from './SuggestedCommunities.module.css';

interface SuggestedCommunitiesProps {
  variant?: 'strip' | 'cards';
}

export function SuggestedCommunities({ variant = 'strip' }: SuggestedCommunitiesProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Communities for you</h2>
        <Link to="/communities" className={styles.seeAll}>
          See all
        </Link>
      </div>
      <div className={variant === 'cards' ? styles.cardRow : styles.strip}>
        {suggestedCommunities.map((community) => (
          <Link
            key={community.id}
            to={`/communities/${community.id}`}
            className={variant === 'cards' ? styles.card : styles.chip}
          >
            <span className={styles.icon}>{community.icon}</span>
            <div className={styles.info}>
              <span className={styles.name}>{community.name}</span>
              <span className={styles.meta}>
                <Users size={12} />
                {community.memberCount.toLocaleString('en-IN')} members ·{' '}
                {community.listingCount} listings
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
