import { useState } from 'react';
import { MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import { LOCATION } from '@/features/home/mock';
import { ListingFilters } from '@/shared/components/ListingFilters/ListingFilters';
import {
  defaultListingFilters,
  type ListingFiltersState,
} from '@/shared/types/filters';
import styles from './SearchWithFilters.module.css';

interface SearchWithFiltersProps {
  placeholder?: string;
  showLocation?: boolean;
}

export function SearchWithFilters({
  placeholder = 'Search cars, mobiles, furniture...',
  showLocation = true,
}: SearchWithFiltersProps) {
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<ListingFiltersState>(defaultListingFilters);

  const activeFilterCount =
    (filters.priceMin || filters.priceMax ? 1 : 0) +
    (filters.conditions.length > 0 ? 1 : 0) +
    (filters.dateListed !== 'all' ? 1 : 0) +
    (filters.negotiableOnly ? 1 : 0) +
    (filters.sort !== 'recommended' ? 1 : 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchRow}>
        <div className={styles.search}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="search"
            placeholder={placeholder}
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {showLocation && (
            <button type="button" className={styles.location}>
              <MapPin size={16} />
              {LOCATION}
            </button>
          )}
          <button
            type="button"
            className={`${styles.filterBtn} ${filtersOpen ? styles.filterBtnActive : ''}`}
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-label="Filters"
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal size={20} />
            {activeFilterCount > 0 && (
              <span className={styles.badge}>{activeFilterCount}</span>
            )}
          </button>
        </div>
      </div>

      {filtersOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setFiltersOpen(false)}
            aria-hidden
          />
          <div className={styles.filtersPanel}>
            <div className={styles.filtersHead}>
              <span>Filters</span>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <ListingFilters filters={filters} onChange={setFilters} />
          </div>
        </>
      )}
    </div>
  );
}
