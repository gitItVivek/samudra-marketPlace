import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Search, Share2 } from 'lucide-react';
import { Button } from '@/shared/components/Button/Button';
import { formatPrice } from '@/shared/utils/format';
import { getCommunityDetail } from '@/features/community/mock';
import styles from './CommunityDetailPage.module.css';

type Tab = 'listings' | 'members' | 'rules';

export function CommunityDetailPage() {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const community = getCommunityDetail(communityId ?? 'flats-flatmates-blr');
  const [joined, setJoined] = useState(community.joined ?? false);
  const [tab, setTab] = useState<Tab>('listings');

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
        <span className={styles.badge}>
          {community.privacy === 'private' ? 'Private' : 'Public'}
        </span>
      </div>

      <div className={styles.info}>
        <h1>{community.name}</h1>
        <p className={styles.about}>{community.about}</p>
        <p className={styles.stats}>
          {(community.memberCount / 1000).toFixed(1)}k members · {community.listingCount}{' '}
          listings
          {community.since && ` · Since ${community.since}`}
        </p>
        {community.category && (
          <span className={styles.categoryTag}>{community.category}</span>
        )}
        <div className={styles.actions}>
          <Button
            variant={joined ? 'secondary' : 'primary'}
            fullWidth
            onClick={() => setJoined(!joined)}
          >
            {joined ? '✓ Joined' : 'Join'}
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
          {community.posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/listings/${post.listingId ?? 'iphone-12'}`}
                className={styles.listingRow}
              >
                <span className={styles.listingIcon}>{post.icon}</span>
                <div className={styles.listingBody}>
                  {post.price != null && (
                    <span className={styles.listingPrice}>
                      {formatPrice(post.price)}
                      {post.tag === 'Rent' ? '/mo' : ''}
                    </span>
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
                    {post.tag && <span className={styles.tag}>{post.tag}</span>}
                  </div>
                  <div className={styles.poster}>
                    <span className={styles.posterAvatar}>{post.authorInitials ?? '?'}</span>
                    <span>{post.authorName}</span>
                    {post.postedAt && <span className={styles.postedAt}>{post.postedAt}</span>}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {tab === 'members' && (
        <p className={styles.placeholder}>
          Member directory will load from the API. {(community.memberCount / 1000).toFixed(1)}k
          members in this community.
        </p>
      )}

      {tab === 'rules' && (
        <ul className={styles.rules}>
          <li>Only post listings relevant to this community.</li>
          <li>Always mention price and locality clearly.</li>
          <li>No advance payments outside Samudra chat.</li>
        </ul>
      )}

      <Link to="/sell" className={styles.fab}>
        + Post to community
      </Link>
    </div>
  );
}
