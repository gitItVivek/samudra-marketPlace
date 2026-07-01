import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '@/shared/layout/PageShell';
import { listMyNotifications, type ListingAlertNotificationDto } from '@/api/notifications';
import { useAuth } from '@/features/identity/context/AuthContext';
import styles from './NotificationsPage.module.css';

export function NotificationsPage() {
  const { accessToken } = useAuth();
  const [alerts, setAlerts] = useState<ListingAlertNotificationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    listMyNotifications(accessToken)
      .then(setAlerts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [accessToken]);

  const formatDelivered = (iso: string) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <PageShell title="Notifications" rightActions="none">
      <div className={styles.page}>
        <p className={styles.intro}>
          Alerts appear here only when a new listing is posted that matches your saved interests.
          Searching on Browse does not create a notification by itself.
        </p>
        {loading && <p>Loading…</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && alerts.length === 0 && (
          <p>
            No listing alerts yet. Save interests on <Link to="/browse">Browse</Link> or search while
            signed in — you will be notified when a matching listing is posted.
          </p>
        )}
        <ul className={styles.list}>
          {alerts.map((alert) => (
            <li key={alert.id} className={styles.item}>
              <div className={styles.itemBody}>
                <strong>{alert.listingTitle}</strong>
                <span className={styles.meta}>
                  {alert.listingCity} · {formatDelivered(alert.deliveredAt)}
                </span>
              </div>
              <Link to={`/listings/${alert.listingId}`} className={styles.back}>
                View listing
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/me/interests" className={styles.back}>
          Manage saved interests
        </Link>
        <Link to="/me" className={styles.back}>
          Back to account
        </Link>
      </div>
    </PageShell>
  );
}
