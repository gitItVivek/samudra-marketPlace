import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { CityLocationInput } from '@/shared/components/CityLocationInput/CityLocationInput';
import type { ListingFiltersState } from '@/shared/types/filters';
import styles from './ListingFilters.module.css';

interface ListingFiltersProps {
  filters: ListingFiltersState;
  onChange: (next: ListingFiltersState) => void;
  compact?: boolean;
  sidebar?: boolean;
  hideTitle?: boolean;
  /** When true, location field sets global browse city (not a dead filter field). */
  showBrowseLocation?: boolean;
}

const SORT_OPTIONS: { value: ListingFiltersState['sort']; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest first' },
  { value: 'price_low', label: 'Price: low to high' },
  { value: 'price_high', label: 'Price: high to low' },
  { value: 'nearest', label: 'Nearest first' },
];

const CONDITION_OPTIONS = ['New', 'Used — Good', 'Used — Fair', 'For parts'];

const DATE_OPTIONS: { value: ListingFiltersState['dateListed']; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
];

export function ListingFilters({ filters, onChange, compact, sidebar, hideTitle, showBrowseLocation }: ListingFiltersProps) {
  const [openSections, setOpenSections] = useState({
    condition: false,
    date: false,
    availability: false,
  });
  const [sortOpen, setSortOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(!sidebar);

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  };

  const toggleCondition = (label: string) => {
    const next = filters.conditions.includes(label)
      ? filters.conditions.filter((c) => c !== label)
      : [...filters.conditions, label];
    onChange({ ...filters, conditions: next });
  };

  return (
    <div className={`${styles.panel} ${compact ? styles.compact : ''} ${sidebar ? styles.sidebar : ''}`}>
      {!hideTitle && <h3 className={styles.title}>Filters</h3>}
      <div className={styles.locationField}>
        <label className={styles.locationLabel} htmlFor={sidebar ? 'sidebar-location' : 'filter-location'}>
          <MapPin size={14} />
          Current city
        </label>
        {showBrowseLocation ? (
          <CityLocationInput placeholder="City or City, State" bordered />
        ) : (
          <input
            id={sidebar ? 'sidebar-location' : 'filter-location'}
            type="text"
            className={styles.locationInput}
            placeholder="City, area, or locality"
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
          />
        )}
        <span className={styles.locationHint}>
          {showBrowseLocation ? 'Updates listings feed and URL' : 'Within 25 km'}
        </span>
      </div>

      <div className={styles.field}>
        <button
          type="button"
          className={styles.sectionHead}
          onClick={() => setSortOpen(!sortOpen)}
        >
          Sort by
          {sortOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {sortOpen && (
          <select
            className={styles.select}
            value={filters.sort}
            onChange={(e) =>
              onChange({ ...filters, sort: e.target.value as ListingFiltersState['sort'] })
            }
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className={styles.field}>
        <button
          type="button"
          className={styles.sectionHead}
          onClick={() => setPriceOpen(!priceOpen)}
        >
          Price (₹)
          {priceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {priceOpen && (
          <div className={styles.priceRow}>
            <input
              type="text"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => onChange({ ...filters, priceMin: e.target.value })}
            />
            <span>to</span>
            <input
              type="text"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => onChange({ ...filters, priceMax: e.target.value })}
            />
          </div>
        )}
      </div>

      <FilterSection
        title="Condition"
        open={openSections.condition}
        onToggle={() => toggleSection('condition')}
      >
        {CONDITION_OPTIONS.map((label) => (
          <label key={label} className={styles.checkRow}>
            <input
              type="checkbox"
              checked={filters.conditions.includes(label)}
              onChange={() => toggleCondition(label)}
            />
            {label}
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Date listed"
        open={openSections.date}
        onToggle={() => toggleSection('date')}
      >
        {DATE_OPTIONS.map((o) => (
          <label key={o.value} className={styles.radioRow}>
            <input
              type="radio"
              name="dateListed"
              checked={filters.dateListed === o.value}
              onChange={() => onChange({ ...filters, dateListed: o.value })}
            />
            {o.label}
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Availability"
        open={openSections.availability}
        onToggle={() => toggleSection('availability')}
      >
        <label className={styles.radioRow}>
          <input
            type="radio"
            name="availability"
            checked={filters.availability === 'available'}
            onChange={() => onChange({ ...filters, availability: 'available' })}
          />
          Available only
        </label>
        <label className={styles.radioRow}>
          <input
            type="radio"
            name="availability"
            checked={filters.availability === 'all'}
            onChange={() => onChange({ ...filters, availability: 'all' })}
          />
          Include sold
        </label>
        <label className={styles.checkRow}>
          <input
            type="checkbox"
            checked={filters.negotiableOnly}
            onChange={(e) => onChange({ ...filters, negotiableOnly: e.target.checked })}
          />
          Negotiable only
        </label>
      </FilterSection>
    </div>
  );
}

function FilterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <button type="button" className={styles.sectionHead} onClick={onToggle}>
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className={styles.sectionBody}>{children}</div>}
    </div>
  );
}
