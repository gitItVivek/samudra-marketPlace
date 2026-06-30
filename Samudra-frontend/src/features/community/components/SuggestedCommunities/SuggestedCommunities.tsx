import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { searchCommunities } from '@/api/communities';
import { mapCommunitySummary } from '@/shared/utils/mappers';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import type { CommunitySummary } from '@/shared/types/community';
import styles from './SuggestedCommunities.module.css';

interface SuggestedCommunitiesProps {
  variant?: 'strip' | 'cards';
}

export function SuggestedCommunities({ variant = 'strip' }: SuggestedCommunitiesProps) {
  const { city } = useBrowseFilters();
  const [communities, setCommunities] = useState<CommunitySummary[]>([]);

  useEffect(() => {
    let cancelled = false;
    searchCommunities({ city, page: 0, size: 6 })
      .then((page) => {
        if (!cancelled) setCommunities(page.items.map(mapCommunitySummary));
      })
      .catch(() => {
        if (!cancelled) setCommunities([]);
      });
    return () => {
      cancelled = true;
    };
  }, [city]);

  if (communities.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Communities for you</h2>
        <Link to="/communities" className={styles.seeAll}>
          See all
        </Link>
      </div>
      <div className={variant === 'cards' ? styles.cardRow : styles.strip}>
        {communities.map((community) => (
          <Link
            key={community.id}
            to={`/communities/${community.slug}`}
            className={variant === 'cards' ? styles.card : styles.chip}
          >
            <span className={styles.icon}>{community.icon}</span>
            <div className={styles.info}>
              <span className={styles.name}>{community.name}</span>
              <span className={styles.meta}>
                <Users size={12} />
                {community.memberCount.toLocaleString('en-IN')} members · {community.listingCount}{' '}
                listings
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
