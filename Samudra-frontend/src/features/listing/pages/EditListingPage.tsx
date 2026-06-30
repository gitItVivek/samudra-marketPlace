import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { PageShell } from '@/shared/layout/PageShell';
import { Button } from '@/shared/components/Button/Button';
import { getListing, updateListing } from '@/api/listings';
import { useAuth } from '@/features/identity/context/AuthContext';
import type { ListingDetailDto, ListingStatus } from '@/shared/types/api';
import styles from './EditListingPage.module.css';

const STATUS_OPTIONS: { value: ListingStatus; label: string }[] = [
  { value: 'ACTIVE', label: 'Active — visible in search' },
  { value: 'INACTIVE', label: 'Inactive — hidden from search' },
  { value: 'SOLD', label: 'Sold' },
];

export function EditListingPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  const [dto, setDto] = useState<ListingDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState<ListingStatus>('ACTIVE');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!listingId) return;
    let cancelled = false;
    getListing(listingId)
      .then((data) => {
        if (cancelled) return;
        setDto(data);
        setTitle(data.title);
        setDescription(data.description ?? '');
        setPrice(data.price != null ? String(data.price) : '');
        setStatus(data.status);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [listingId]);

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  if (loading) {
    return (
      <PageShell title="Edit listing" rightActions="none">
        <p className={styles.muted}>Loading…</p>
      </PageShell>
    );
  }

  if (error || !dto) {
    return (
      <PageShell title="Edit listing" rightActions="none">
        <p className={styles.error}>{error ?? 'Listing not found'}</p>
        <Link to="/me/listings">Back to your listings</Link>
      </PageShell>
    );
  }

  if (user && user.id !== dto.userId) {
    return <Navigate to={`/listings/${listingId}`} replace />;
  }

  const isAuction = dto.saleType === 'AUCTION';

  const save = async () => {
    if (!accessToken || !listingId) return;
    setSubmitting(true);
    setError(null);
    try {
      const updated = await updateListing(
        listingId,
        {
          title: title.trim(),
          description: description.trim() || undefined,
          price: isAuction ? undefined : Number(price.replace(/,/g, '')),
          status,
        },
        accessToken,
      );
      navigate(`/listings/${updated.id}`, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update listing');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell
      title="Edit listing"
      rightActions="none"
      onBack={() => navigate(`/listings/${listingId}`)}
      stickyFooter={
        <Button variant="primary" fullWidth onClick={save} disabled={submitting || !title.trim()}>
          {submitting ? 'Saving…' : 'Save changes'}
        </Button>
      }
    >
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <label className={styles.field}>
          Title <span className={styles.required}>*</span>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label className={styles.field}>
          Description
          <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        {!isAuction && (
          <label className={styles.field}>
            Price (₹)
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
        )}

        {isAuction && (
          <p className={styles.hint}>
            Auction price and timing cannot be changed here yet. You can update title, description, and
            status.
          </p>
        )}

        <div className={styles.field}>
          <span className={styles.label}>Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as ListingStatus)}>
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <p className={styles.hint}>
          Category, location, and photos cannot be edited yet — post a new listing if those need to
          change.
        </p>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </PageShell>
  );
}
