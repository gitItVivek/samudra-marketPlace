import { MapPin, Search } from 'lucide-react';
import { LOCATION } from '@/features/home/mock';
import styles from './SearchBar.module.css';

export function SearchBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="search"
          placeholder="Search cars, mobiles, furniture..."
          className={styles.input}
          readOnly
        />
        <button type="button" className={styles.location}>
          <MapPin size={16} />
          {LOCATION}
        </button>
      </div>
    </div>
  );
}
