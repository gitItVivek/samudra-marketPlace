import { Link } from 'react-router-dom';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  seeAllTo?: string;
}

export function SectionHeader({ title, seeAllTo }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {seeAllTo ? (
        <Link to={seeAllTo} className={styles.seeAll}>
          See all
        </Link>
      ) : (
        <span className={styles.seeAll}>See all</span>
      )}
    </div>
  );
}
