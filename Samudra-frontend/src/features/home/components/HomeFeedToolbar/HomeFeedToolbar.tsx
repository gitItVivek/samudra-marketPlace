import { FeedViewToggle } from '@/shared/components/FeedViewToggle/FeedViewToggle';
import styles from './HomeFeedToolbar.module.css';

export function HomeFeedToolbar() {
  return (
    <div className={styles.toolbar}>
      <p className={styles.label}>Feed view</p>
      <FeedViewToggle compact />
    </div>
  );
}
