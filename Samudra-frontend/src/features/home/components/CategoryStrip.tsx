import { useState } from 'react';
import { LISTING_CATEGORIES } from '@/shared/constants/categories';
import { uiCategoryToApi } from '@/shared/constants/categoryMapping';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import type { CategoryId } from '@/shared/types';
import styles from './CategoryStrip.module.css';

export function CategoryStrip() {
  const { setCategoryType } = useBrowseFilters();
  const [active, setActive] = useState<CategoryId>('all');

  return (
    <div className={styles.strip}>
      {LISTING_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={`${styles.item} ${active === cat.id ? styles.active : ''}`}
          onClick={() => {
            setActive(cat.id);
            setCategoryType(uiCategoryToApi(cat.id));
          }}
        >
          <span className={styles.iconBox} style={{ background: cat.color }}>
            <span className={styles.icon}>{cat.icon}</span>
          </span>
          <span className={styles.label}>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
