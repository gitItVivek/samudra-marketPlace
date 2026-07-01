import { useCallback, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { searchListings } from '@/api/listings';
import { createInterest } from '@/api/interests';
import { GridListingCard } from '@/features/home/components/GridListingCard/GridListingCard';
import { CityLocationInput } from '@/shared/components/CityLocationInput/CityLocationInput';
import { Button } from '@/shared/components/Button/Button';
import { useAuth } from '@/features/identity/context/AuthContext';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import { mapListingSummary } from '@/shared/utils/mappers';
import type { ListingSummary } from '@/shared/types';
import styles from './BrowseDiscoverPage.module.css';

const INTEREST_CHIPS: Array<{
  label: string;
  categoryType?: string;
  listingType?: string;
  keywords?: string;
}> = [
  { label: 'Looking to buy', listingType: 'BUY', keywords: 'buy' },
  { label: 'Looking to rent', listingType: 'RENT_WANTED', keywords: 'rent' },
  { label: 'Flat / room', categoryType: 'PROPERTY', keywords: 'flatmate' },
  { label: 'Furniture', categoryType: 'FURNITURE_HOME' },
  { label: 'Electronics', categoryType: 'ELECTRONICS' },
  { label: 'Services', categoryType: 'SERVICES', listingType: 'SERVICE' },
];

export function BrowseDiscoverPage() {
  const { accessToken } = useAuth();
  const { city, state } = useBrowseFilters();
  const [query, setQuery] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [listings, setListings] = useState<ListingSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSearch = useCallback(
    (opts?: { q?: string; categoryType?: string; listingType?: string }) => {
      const q = opts?.q ?? query;
      setLoading(true);
      setError(null);
      searchListings(
        {
          city,
          state,
          q: q || undefined,
          categoryType: opts?.categoryType,
          listingType: opts?.listingType,
          page: 0,
          size: 24,
        },
        accessToken,
      )
        .then((page) => setListings(page.items.map(mapListingSummary)))
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false));
    },
    [city, state, query, accessToken],
  );

  useEffect(() => {
    runSearch();
  }, [city, state]);

  const saveExplicitInterest = async (payload: {
    categoryType?: string;
    listingType?: string;
    keywords?: string;
    customTag?: string;
  }) => {
    if (!accessToken) return;
    try {
      await createInterest(
        {
          city,
          state,
          source: 'BROWSE',
          ...payload,
        },
        accessToken,
      );
    } catch {
      /* interest save is best-effort; no UI noise */
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch({ q: query });
  };

  const handleChip = (chip: (typeof INTEREST_CHIPS)[number]) => {
    if (chip.keywords) setQuery(chip.keywords);
    runSearch({
      q: chip.keywords,
      categoryType: chip.categoryType,
      listingType: chip.listingType,
    });
    void saveExplicitInterest({
      categoryType: chip.categoryType,
      listingType: chip.listingType,
      keywords: chip.keywords,
    });
  };

  const handleCustomTag = () => {
    if (!customTag.trim()) return;
    void saveExplicitInterest({ customTag: customTag.trim(), keywords: customTag.trim() });
    runSearch({ q: customTag.trim() });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Browse & discover</h1>
        <p className={styles.subtitle}>
          Search listings and tell us what you are looking for — we will notify you when something
          new matches.
        </p>
      </header>

      <form className={styles.searchRow} onSubmit={handleSearchSubmit}>
        <CityLocationInput compact />
        <div className={styles.searchInputWrap}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <Button type="submit" variant="primary">
          Search
        </Button>
      </form>

      <section className={styles.chipsSection}>
        <h2 className={styles.sectionTitle}>What are you into?</h2>
        <div className={styles.chips}>
          {INTEREST_CHIPS.map((chip) => (
            <button key={chip.label} type="button" className={styles.chip} onClick={() => handleChip(chip)}>
              {chip.label}
            </button>
          ))}
        </div>
        <div className={styles.customRow}>
          <input
            type="text"
            placeholder="Custom (e.g. study table, tutor)"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            className={styles.customInput}
          />
          <Button type="button" variant="secondary" onClick={handleCustomTag}>
            Save interest
          </Button>
        </div>
      </section>

      <section className={styles.results}>
        <h2 className={styles.sectionTitle}>Results in {city || 'your city'}</h2>
        {loading && <p className={styles.status}>Loading…</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && listings.length === 0 && (
          <p className={styles.status}>No listings yet. Try another search or save an interest above.</p>
        )}
        <div className={styles.grid}>
          {listings.map((listing) => (
            <GridListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
