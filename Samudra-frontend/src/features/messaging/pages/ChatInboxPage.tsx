import { Link } from 'react-router-dom';
import { cityListingsPath } from '@/app/paths';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import { PageShell } from '@/shared/layout/PageShell';
import styles from './ChatInboxPage.module.css';

export function ChatInboxPage() {
  const { city } = useBrowseFilters();

  return (
    <PageShell title="Chats">
      <div className={styles.empty}>
        <p>Messaging is not available yet.</p>
        <p>Once the messaging API is live, your conversations will appear here.</p>
        <Link to={cityListingsPath(city)}>Browse listings</Link>
      </div>
    </PageShell>
  );
}
