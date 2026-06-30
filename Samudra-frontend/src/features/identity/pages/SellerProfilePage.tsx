import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, Pencil } from 'lucide-react';
import { PageShell } from '@/shared/layout/PageShell';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { Button } from '@/shared/components/Button/Button';
import {
  getMyMarketplaceProfile,
  getPublicMarketplaceProfile,
  updateMyMarketplaceProfile,
} from '@/api/users';
import { useAuth } from '@/features/identity/context/AuthContext';
import styles from './SellerProfilePage.module.css';

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function SellerProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { user, accessToken, isAuthenticated } = useAuth();
  const isOwner = Boolean(userId && user?.id === userId);

  const [profile, setProfile] = useState<Awaited<ReturnType<typeof getPublicMarketplaceProfile>> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    const load = async () => {
      try {
        const data =
          isOwner && accessToken
            ? await getMyMarketplaceProfile(accessToken)
            : await getPublicMarketplaceProfile(userId);
        if (cancelled) return;
        setProfile(data);
        setBio(data.bio ?? '');
        setCity(data.city ?? '');
        setState(data.state ?? '');
        setAvatarUrl(data.avatarUrl ?? '');
        if (isOwner && !data.setupComplete) {
          setEditing(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load profile');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [userId, isOwner, accessToken]);

  const saveProfile = async () => {
    if (!accessToken) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateMyMarketplaceProfile(
        {
          bio: bio.trim() || undefined,
          city: city.trim() || undefined,
          state: state.trim() || undefined,
          avatarUrl: avatarUrl.trim() || undefined,
        },
        accessToken,
      );
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (!userId) {
    return (
      <PageShell title="Profile">
        <p>Profile not found.</p>
      </PageShell>
    );
  }

  if (loading) {
    return (
      <PageShell title="Profile">
        <p className={styles.meta}>Loading profile…</p>
      </PageShell>
    );
  }

  if (error && !profile) {
    return (
      <PageShell title="Profile">
        <p className={styles.meta}>{error}</p>
        {!isAuthenticated && (
          <Link to="/auth/login">Sign in</Link>
        )}
      </PageShell>
    );
  }

  if (!profile) return null;

  const locationLabel =
    profile.city && profile.state
      ? `${profile.city}, ${profile.state}`
      : profile.city ?? profile.state ?? null;

  return (
    <PageShell title={isOwner ? 'Your public profile' : 'Seller profile'}>
      {isOwner && profile.setupComplete && !editing && (
        <div className={styles.editRow}>
          <button type="button" className={styles.editBtn} onClick={() => setEditing(true)}>
            <Pencil size={16} />
            Edit profile
          </button>
        </div>
      )}
      <div className={styles.profileTop}>
        {profile.avatarUrl ? (
          <img src={profile.avatarUrl} alt="" className={styles.avatarImg} />
        ) : (
          <Avatar initials={initialsFromName(profile.displayName)} size="lg" />
        )}
        <h1 className={styles.name}>{profile.displayName}</h1>
        {locationLabel && (
          <p className={styles.meta}>
            <MapPin size={14} /> {locationLabel}
          </p>
        )}
        {profile.bio && !editing && <p className={styles.about}>{profile.bio}</p>}
      </div>

      <div className={styles.stats}>
        <div>
          <strong>{profile.totalListings}</strong>
          <span>Listings</span>
        </div>
      </div>

      {isOwner && !profile.setupComplete && !editing && (
        <div className={styles.setupCard}>
          <h2>Set up your public profile</h2>
          <p className={styles.meta}>
            Add a photo, bio, and city so buyers know who they are dealing with. More details
            appear as you post listings.
          </p>
          <Button variant="primary" onClick={() => setEditing(true)}>
            Get started
          </Button>
        </div>
      )}

      {isOwner && editing && (
        <form
          className={styles.setupForm}
          onSubmit={(e) => {
            e.preventDefault();
            void saveProfile();
          }}
        >
          <h2>{profile.setupComplete ? 'Edit profile' : 'Set up your public profile'}</h2>
          <label className={styles.field}>
            Bio
            <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
          </label>
          <label className={styles.field}>
            City
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <label className={styles.field}>
            State
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
          </label>
          <label className={styles.field}>
            Profile photo URL
            <input type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.formActions}>
            {profile.setupComplete && (
              <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            )}
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save profile'}
            </Button>
          </div>
        </form>
      )}

      {!isOwner && !profile.setupComplete && (
        <p className={styles.meta}>This seller has not finished setting up their profile yet.</p>
      )}
    </PageShell>
  );
}
