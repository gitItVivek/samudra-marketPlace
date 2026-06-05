import { useState } from 'react';
import { categories } from '@/features/home/mock';
import type { CategoryId } from '@/shared/types';
import styles from './CategoryStrip.module.css';

export function CategoryStrip() {
  const [active, setActive] = useState<CategoryId>('all');

  return (
    <div className={styles.strip}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={`${styles.item} ${active === cat.id ? styles.active : ''}`}
          onClick={() => setActive(cat.id)}
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
