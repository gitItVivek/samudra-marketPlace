import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/shared/components/Button/Button';
import {
  communityFilterChips,
  popularCommunities,
  yourCommunities,
} from '@/features/community/mock';
import styles from './CommunitiesPage.module.css';

export function CommunitiesPage() {
  const [query, setQuery] = useState('');
  const [activeChip, setActiveChip] = useState('All');
  const [joined, setJoined] = useState<Record<string, boolean>>({
    'flats-flatmates-blr': true,
    'used-phones-blr': true,
  });

  const filterList = (list: typeof yourCommunities) =>
    list.filter(
      (c) =>
        (query === '' ||
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())) &&
        (activeChip === 'All' ||
          c.location?.includes(activeChip) ||
          c.category === activeChip),
    );

  const yours = filterList(yourCommunities);
  const popular = filterList(popularCommunities);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Communities</h1>
        <Link to="/communities/create" className={styles.createBtn}>
          <Plus size={18} />
          Create
        </Link>
      </header>

      <div className={styles.search}>
        <Search size={18} />
        <input
          type="search"
          placeholder="Search communities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={styles.chips}>
        {communityFilterChips.map((chip) => (
          <button
            key={chip}
            type="button"
            className={`${styles.chip} ${activeChip === chip ? styles.chipActive : ''}`}
            onClick={() => setActiveChip(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Your communities</h2>
          <Link to="/communities">See all</Link>
        </div>
        <div className={styles.cardGrid}>
          {yours.map((c) => (
            <Link key={c.id} to={`/communities/${c.id}`} className={styles.joinedCard}>
              <span className={styles.privacy}>{c.privacy === 'public' ? 'Public' : 'Private'}</span>
              <span className={styles.cardIcon}>{c.icon}</span>
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <span className={styles.members}>
                {(c.memberCount / 1000).toFixed(1)}k members
              </span>
              <span className={styles.joinedBadge}>Joined</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Popular near Bengaluru</h2>
          <Link to="/communities">See all</Link>
        </div>
        <ul className={styles.list}>
          {popular.map((c) => {
            const isJoined = joined[c.id];
            return (
              <li key={c.id} className={styles.listItem}>
                <Link to={`/communities/${c.id}`} className={styles.listMain}>
                  <span className={styles.listIcon}>{c.icon}</span>
                  <div>
                    <h3>{c.name}</h3>
                    <p className={styles.listMeta}>
                      {(c.memberCount / 1000).toFixed(1)}k members · {c.listingCount} listings ·{' '}
                      {c.privacy === 'private' ? 'Private' : 'Public'}
                    </p>
                  </div>
                </Link>
                <Button
                  variant={isJoined ? 'secondary' : 'primary'}
                  onClick={() => setJoined((prev) => ({ ...prev, [c.id]: !prev[c.id] }))}
                >
                  {isJoined ? 'Joined' : 'Join'}
                </Button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
