import { ROUTES } from '@/app/paths';
import { BrandLogo } from '@/shared/components/BrandLogo/BrandLogo';
import styles from './AuthMarketingPanel.module.css';

interface AuthMarketingPanelProps {
  compact?: boolean;
}

const BULLETS = [
  'Listings without broker screenshots in your feed',
  'Buyer & seller profiles you can actually trust',
  'Post what you need — flat, flatmate, guitar lessons',
  'Communities for travel mates (no Uber roulette)',
];

export function AuthMarketingPanel({ compact }: AuthMarketingPanelProps) {
  return (
    <div className={`${styles.panel} ${compact ? styles.compact : ''}`}>
      <BrandLogo size="md" linkTo={ROUTES.landing} />

      {!compact && (
        <>
          <p className={styles.tagline}>
            The local marketplace for people who have jobs, hobbies, and zero patience for
            &ldquo;Sir one site visit?&rdquo;
          </p>
          <h2 className={styles.headline}>
            Buy. Sell. Find your people.
            <span className={styles.headlineAccent}> Without the broker tax.</span>
          </h2>
        </>
      )}

      <ul className={styles.list}>
        {BULLETS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {!compact && (
        <p className={styles.footnote}>
          Metros for working professionals. Tier-2 cities for everyone who lives there — not
          just people with LinkedIn premium.
        </p>
      )}
    </div>
  );
}
