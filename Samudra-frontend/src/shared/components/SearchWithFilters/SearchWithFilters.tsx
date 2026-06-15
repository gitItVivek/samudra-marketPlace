import { useState } from 'react';
import { MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import { ListingFilters } from '@/shared/components/ListingFilters/ListingFilters';
import { Button } from '@/shared/components/Button/Button';
import {
  defaultListingFilters,
  type ListingFiltersState,
} from '@/shared/types/filters';
import styles from './SearchWithFilters.module.css';

interface SearchWithFiltersProps {
  placeholder?: string;
  showLocation?: boolean;
}

function countActiveFilters(filters: ListingFiltersState): number {
  return (
    (filters.location.trim() ? 1 : 0) +
    (filters.priceMin || filters.priceMax ? 1 : 0) +
    (filters.conditions.length > 0 ? 1 : 0) +
    (filters.dateListed !== 'all' ? 1 : 0) +
    (filters.negotiableOnly ? 1 : 0) +
    (filters.sort !== 'recommended' ? 1 : 0) +
    (filters.availability !== 'available' ? 1 : 0)
  );
}

export function SearchWithFilters({
  placeholder = 'Search cars, mobiles, furniture...',
  showLocation = true,
}: SearchWithFiltersProps) {
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<ListingFiltersState>(defaultListingFilters);
  const [draftFilters, setDraftFilters] = useState<ListingFiltersState>(defaultListingFilters);

  const activeFilterCount = countActiveFilters(appliedFilters);
  const displayLocation = filtersOpen ? draftFilters.location : appliedFilters.location;

  const openFilters = () => {
    setDraftFilters(appliedFilters);
    setFiltersOpen(true);
  };

  const closeFilters = () => {
    setDraftFilters(appliedFilters);
    setFiltersOpen(false);
  };

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
    setFiltersOpen(false);
  };

  const updateLocation = (location: string) => {
    if (filtersOpen) {
      setDraftFilters((prev) => ({ ...prev, location }));
      return;
    }
    setAppliedFilters((prev) => ({ ...prev, location }));
  };

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
            <label className={styles.locationField}>
              <MapPin size={16} className={styles.locationIcon} />
              <input
                type="text"
                className={styles.locationInput}
                placeholder="City or locality"
                value={displayLocation}
                onChange={(e) => updateLocation(e.target.value)}
                aria-label="Location"
              />
            </label>
          )}
          <button
            type="button"
            className={`${styles.filterBtn} ${filtersOpen ? styles.filterBtnActive : ''}`}
            onClick={() => (filtersOpen ? closeFilters() : openFilters())}
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
          <div className={styles.backdrop} onClick={closeFilters} aria-hidden />
          <div className={styles.filtersPanel} role="dialog" aria-label="Listing filters">
            <div className={styles.filtersHead}>
              <span>Filters</span>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeFilters}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.filtersBody}>
              <ListingFilters
                filters={draftFilters}
                onChange={setDraftFilters}
                hideTitle
              />
            </div>
            <div className={styles.filtersFooter}>
              <Button variant="primary" className={styles.applyBtn} onClick={applyFilters}>
                Apply filters
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
