import { Link } from 'react-router-dom';
import styles from './PlaceholderPage.module.css';

export function MyProfilePlaceholderPage() {
  return (
    <div className={styles.page}>
      <h1>My profile</h1>
      <p>Coming soon — your account and settings.</p>
      <Link to="/profiles/rahul-k" className={styles.link}>
        View sample seller profile
      </Link>
    </div>
  );
}
