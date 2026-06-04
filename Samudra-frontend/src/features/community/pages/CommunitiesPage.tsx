import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users } from 'lucide-react';
import { PageShell } from '@/shared/layout/PageShell';
import { Button } from '@/shared/components/Button/Button';
import { allCommunities } from '@/features/community/mock';
import styles from './CommunitiesPage.module.css';

export function CommunitiesPage() {
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState('');

  const filtered = allCommunities.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()),
  );

  const toggleJoin = (id: string) => {
    setJoined((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PageShell title="Communities">
      <p className={styles.intro}>
        Join local groups to see listings and posts from people near you.
      </p>
      <div className={styles.search}>
        <Search size={18} />
        <input
          type="search"
          placeholder="Search communities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ul className={styles.list}>
        {filtered.map((community) => {
          const isJoined = joined[community.id] ?? community.joined;
          return (
            <li key={community.id} className={styles.item}>
              <Link to={`/communities/${community.id}`} className={styles.itemMain}>
                <span className={styles.icon}>{community.icon}</span>
                <div>
                  <h3>{community.name}</h3>
                  <p className={styles.desc}>{community.description}</p>
                  <p className={styles.meta}>
                    <Users size={14} />
                    {community.memberCount.toLocaleString('en-IN')} members ·{' '}
                    {community.listingCount} listings
                    {community.location && ` · ${community.location}`}
                  </p>
                </div>
              </Link>
              <Button
                variant={isJoined ? 'secondary' : 'primary'}
                onClick={() => toggleJoin(community.id)}
              >
                {isJoined ? 'Joined' : 'Join'}
              </Button>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
