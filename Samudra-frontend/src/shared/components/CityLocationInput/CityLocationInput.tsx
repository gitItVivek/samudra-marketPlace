import { useEffect, useState } from 'react';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import { useCityNavigation } from '@/shared/hooks/useCityNavigation';
import { formatCityState } from '@/shared/utils/location';
import styles from './CityLocationInput.module.css';

interface CityLocationInputProps {
  className?: string;
  placeholder?: string;
  /** Compact style for search bar inline use */
  compact?: boolean;
  /** Bordered field for filter panels / sidebar */
  bordered?: boolean;
}

export function CityLocationInput({
  className,
  placeholder = 'City or City, State',
  compact = false,
  bordered = false,
}: CityLocationInputProps) {
  const { city, state } = useBrowseFilters();
  const navigateToCity = useCityNavigation();
  const committed = formatCityState(city, state);
  const [draft, setDraft] = useState(committed);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setDraft(committed);
    }
  }, [committed, isEditing]);

  const commit = () => {
    setIsEditing(false);
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(committed);
      return;
    }
    if (trimmed.toLowerCase() === committed.toLowerCase()) return;
    navigateToCity(trimmed);
  };

  return (
    <input
      type="text"
      className={`${styles.input} ${compact ? styles.compact : ''} ${bordered ? styles.bordered : ''} ${className ?? ''}`}
      placeholder={placeholder}
      value={draft}
      onChange={(e) => {
        setIsEditing(true);
        setDraft(e.target.value);
      }}
      onFocus={() => setIsEditing(true)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          (e.target as HTMLInputElement).blur();
        }
      }}
      aria-label="Current city"
    />
  );
}
