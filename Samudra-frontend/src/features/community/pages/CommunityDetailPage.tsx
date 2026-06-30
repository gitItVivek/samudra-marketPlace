import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Search, Share2 } from 'lucide-react';
import { Button } from '@/shared/components/Button/Button';
import { formatPrice } from '@/shared/utils/format';
import {
  getCommunityBySlug,
  getCommunityListings,
  joinCommunity,
} from '@/api/communities';
import { listingDtoToCommunityPost, mapCommunityDetail } from '@/shared/utils/mappers';
import { useAuth } from '@/features/identity/context/AuthContext';
import type { CommunityDetail } from '@/shared/types/community';
import styles from './CommunityDetailPage.module.css';

type Tab = 'listings' | 'members' | 'rules';

export function CommunityDetailPage() {
  const { communityId: slug } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [community, setCommunity] = useState<CommunityDetail | null>(null);
  const [communityUuid, setCommunityUuid] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);
  const [tab, setTab] = useState<Tab>('listings');
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    getCommunityBySlug(slug)
      .then(async (detail) => {
        if (cancelled) return;
        setCommunityUuid(detail.id);
        const listingsPage = await getCommunityListings(detail.id);
        const posts = listingsPage.items.map((l) => listingDtoToCommunityPost(l, detail.id));
        setCommunity(mapCommunityDetail(detail, posts));
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleJoin = async () => {
    if (!accessToken || !communityUuid) {
      navigate('/auth/login');
      return;
    }
    setJoining(true);
    try {
      await joinCommunity(communityUuid, accessToken);
      setJoined(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not join');
    } finally {
      setJoining(false);
    }
  };

  if (error) {
    return <div className={styles.page}>{error}</div>;
  }

  if (!community) {
    return <div className={styles.page}>Loading community…</div>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <button type="button" onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeft size={22} />
        </button>
        <span>Community</span>
        <div className={styles.topActions}>
          <button type="button" aria-label="Search">
            <Search size={20} />
          </button>
          <button type="button" aria-label="Share">
            <Share2 size={20} />
          </button>
        </div>
      </header>

      <div className={styles.banner}>
        <span className={styles.bannerIcon}>{community.icon}</span>
        <span className={styles.badge}>{community.privacy === 'private' ? 'Private' : 'Public'}</span>
      </div>

      <div className={styles.info}>
        <h1>{community.name}</h1>
        <p className={styles.about}>{community.about}</p>
        <p className={styles.stats}>
          {community.memberCount} members · {community.listingCount} listings
        </p>
        {community.category && <span className={styles.categoryTag}>{community.category}</span>}
        <div className={styles.actions}>
          <Button
            variant={joined ? 'secondary' : 'primary'}
            fullWidth
            onClick={handleJoin}
            disabled={joining || joined}
          >
            {joined ? '✓ Joined' : joining ? 'Joining…' : 'Join'}
          </Button>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          type="button"
          className={tab === 'listings' ? styles.tabActive : ''}
          onClick={() => setTab('listings')}
        >
          Listings ({community.listingCount})
        </button>
        <button
          type="button"
          className={tab === 'members' ? styles.tabActive : ''}
          onClick={() => setTab('members')}
        >
          Members
        </button>
        <button
          type="button"
          className={tab === 'rules' ? styles.tabActive : ''}
          onClick={() => setTab('rules')}
        >
          Rules
        </button>
      </div>

      {tab === 'listings' && (
        <ul className={styles.listings}>
          {community.posts.length === 0 && <li>No listings in this community yet.</li>}
          {community.posts.map((post) => (
            <li key={post.id}>
              <Link to={`/listings/${post.listingId}`} className={styles.listingRow}>
                <span className={styles.listingIcon}>{post.icon}</span>
                <div className={styles.listingBody}>
                  {post.price != null && (
                    <span className={styles.listingPrice}>{formatPrice(post.price)}</span>
                  )}
                  <h3>{post.title}</h3>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <div className={styles.listingMeta}>
                    {post.location && (
                      <span>
                        <MapPin size={12} />
                        {post.location}
                      </span>
                    )}
                    <span>
                      <Clock size={12} />
                      {post.postedAgo}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {tab === 'members' && (
        <p className={styles.placeholder}>
          Member directory API is available at GET /v1/communities/&#123;id&#125;/members (member-only).
        </p>
      )}

      {tab === 'rules' && (
        <ul className={styles.rules}>
          <li>Only post listings relevant to this community.</li>
          <li>Always mention price and locality clearly.</li>
        </ul>
      )}

      <Link to="/sell" className={styles.fab}>
        + Post to community
      </Link>
    </div>
  );
}
