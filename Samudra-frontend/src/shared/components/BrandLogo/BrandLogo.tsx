import { Link } from 'react-router-dom';
import { BRAND_LOGO_SVG } from '@/shared/constants/brandAssets';
import styles from './BrandLogo.module.css';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  linkTo?: string;
  className?: string;
}

export function BrandLogo({ size = 'md', linkTo, className }: BrandLogoProps) {
  const content = (
    <span className={`${styles.brand} ${styles[size]} ${className ?? ''}`}>
      <img src={BRAND_LOGO_SVG} alt="" className={styles.icon} />
      <span className={styles.wordmark}>
        <span className={styles.name}>samudra</span>
        <span className={styles.market}>market</span>
      </span>
    </span>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className={styles.link} aria-label="Samudra Market home">
        {content}
      </Link>
    );
  }

  return content;
}
