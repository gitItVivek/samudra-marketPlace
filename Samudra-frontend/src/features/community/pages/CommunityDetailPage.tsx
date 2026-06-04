import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { PageShell } from '@/shared/layout/PageShell';
import { Button } from '@/shared/components/Button/Button';
import { formatPrice } from '@/shared/utils/format';
import { getCommunityDetail } from '@/features/community/mock';
import styles from './CommunityDetailPage.module.css';

export function CommunityDetailPage() {
  const { communityId } = useParams();
  const community = getCommunityDetail(communityId ?? 'koramangala-deals');
  const [joined, setJoined] = useState(community.joined ?? false);

  const headerAction = (
    <Button variant={joined ? 'secondary' : 'primary'} onClick={() => setJoined(!joined)}>
      {joined ? 'Joined' : 'Join'}
    </Button>
  );

  return (
    <PageShell title={community.name} headerAction={headerAction}>
      <div className={styles.hero}>
        <span className={styles.icon}>{community.icon}</span>
        <div>
          <p className={styles.about}>{community.about}</p>
          <p className={styles.stats}>
            <Users size={16} />
            {community.memberCount.toLocaleString('en-IN')} members · {community.listingCount}{' '}
            active listings
            {community.location && ` · ${community.location}`}
          </p>
        </div>
      </div>

      <h2 className={styles.postsTitle}>Community posts</h2>
      <ul className={styles.posts}>
        {community.posts.map((post) => (
          <li key={post.id}>
            <Link
              to={`/listings/${post.listingId ?? 'iphone-12'}`}
              className={styles.post}
            >
              <span className={styles.postIcon}>{post.icon}</span>
              <div className={styles.postBody}>
                <h3>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <p className={styles.postMeta}>
                  {post.authorName} · {post.postedAgo}
                  {post.price != null && (
                    <span className={styles.price}> · {formatPrice(post.price)}</span>
                  )}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/communities" className={styles.backLink}>
        ← All communities
      </Link>
    </PageShell>
  );
}
