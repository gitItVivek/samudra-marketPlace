import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/shared/components/Button/Button';
import { searchCommunities } from '@/api/communities';
import { mapCommunitySummary } from '@/shared/utils/mappers';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import type { CommunitySummary } from '@/shared/types/community';
import styles from './CommunitiesPage.module.css';

const FILTER_CHIPS = ['All', 'Electronics', 'Property', 'Services', 'Vehicles'];

export function CommunitiesPage() {
  const { city } = useBrowseFilters();
  const [localQuery, setLocalQuery] = useState('');
  const [activeChip, setActiveChip] = useState('All');
  const [communities, setCommunities] = useState<CommunitySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    searchCommunities({
      city,
      q: localQuery || undefined,
      page: 0,
      size: 40,
    })
      .then((page) => {
        if (!cancelled) setCommunities(page.items.map(mapCommunitySummary));
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [city, localQuery]);

  const filtered = communities.filter(
    (c) =>
      activeChip === 'All' ||
      c.category?.toLowerCase().includes(activeChip.toLowerCase()) ||
      c.location?.toLowerCase().includes(activeChip.toLowerCase()),
  );

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
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setLocalQuery(localQuery)}
          onBlur={() => setLocalQuery(localQuery)}
        />
      </div>

      <div className={styles.chips}>
        {FILTER_CHIPS.map((chip) => (
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

      {error && <p>{error}</p>}
      {loading && <p>Loading communities…</p>}

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Communities in {city}</h2>
        </div>
        {!loading && filtered.length === 0 && (
          <p>No communities found. Create one to get started.</p>
        )}
        <ul className={styles.list}>
          {filtered.map((c) => (
            <li key={c.id} className={styles.listItem}>
              <Link to={`/communities/${c.slug}`} className={styles.listMain}>
                <span className={styles.listIcon}>{c.icon}</span>
                <div>
                  <h3>{c.name}</h3>
                  <p className={styles.listMeta}>
                    {c.memberCount} members · {c.listingCount} listings · {c.location}
                  </p>
                </div>
              </Link>
              <Button variant="secondary" onClick={() => {}}>
                View
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
