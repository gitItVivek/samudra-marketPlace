import { MapPin, Search } from 'lucide-react';
import { CityLocationInput } from '@/shared/components/CityLocationInput/CityLocationInput';
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
        <label className={styles.location}>
          <MapPin size={16} />
          <CityLocationInput compact className={styles.locationInput} />
        </label>
      </div>
    </div>
  );
}
