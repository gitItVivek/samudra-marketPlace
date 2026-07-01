import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '@/shared/layout/PageShell';
import { Button } from '@/shared/components/Button/Button';
import { deleteInterest, listMyInterests, updateInterest, type UserInterestDto } from '@/api/interests';
import { useAuth } from '@/features/identity/context/AuthContext';
import styles from './NotificationsPage.module.css';

export function NotificationsPage() {
  const { accessToken } = useAuth();
  const [interests, setInterests] = useState<UserInterestDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    if (!accessToken) {
      setInterests([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    listMyInterests(accessToken)
      .then(setInterests)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [accessToken]);

  const toggleNotify = async (item: UserInterestDto) => {
    if (!accessToken) return;
    await updateInterest(item.id, !item.notifyEnabled, accessToken);
    load();
  };

  const remove = async (id: string) => {
    if (!accessToken) return;
    await deleteInterest(id, accessToken);
    load();
  };

  const label = (item: UserInterestDto) => {
    const parts = [item.city];
    if (item.keywords) parts.push(`"${item.keywords}"`);
    if (item.categoryType) parts.push(item.categoryType);
    if (item.listingType) parts.push(item.listingType);
    if (item.customTag) parts.push(item.customTag);
    return parts.join(' · ');
  };

  return (
    <PageShell title="Notifications" rightActions="none">
      <div className={styles.page}>
        <p className={styles.intro}>
          Listing alerts from your searches and Browse interests. Toggle off any you no longer want.
        </p>
        {loading && <p>Loading…</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && interests.length === 0 && (
          <p>
            No saved interests yet. Use <Link to="/browse">Browse</Link> or search while signed in.
          </p>
        )}
        <ul className={styles.list}>
          {interests.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.itemBody}>
                <strong>{label(item)}</strong>
                <span className={styles.meta}>Source: {item.source}</span>
              </div>
              <div className={styles.actions}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => void toggleNotify(item)}
                >
                  {item.notifyEnabled ? 'Alerts on' : 'Alerts off'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => void remove(item.id)}>
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/me" className={styles.back}>
          Back to account
        </Link>
      </div>
    </PageShell>
  );
}
