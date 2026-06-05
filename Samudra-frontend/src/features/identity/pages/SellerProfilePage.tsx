import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MessageCircle, UserPlus } from 'lucide-react';
import { PageShell } from '@/shared/layout/PageShell';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { Button } from '@/shared/components/Button/Button';
import { formatPrice } from '@/shared/utils/format';
import { getSellerProfile } from '@/features/identity/mock';
import styles from './SellerProfilePage.module.css';

type Tab = 'listings' | 'reviews' | 'about';

export function SellerProfilePage() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const profile = getSellerProfile(profileId ?? 'rahul-k');
  const [tab, setTab] = useState<Tab>('listings');

  const footer = (
    <>
      <Button variant="outline">
        <UserPlus size={18} />
        Follow
      </Button>
      <Button variant="outline" onClick={() => navigate('/chats/demo')}>
        <MessageCircle size={18} />
        Message
      </Button>
    </>
  );

  return (
    <PageShell title="Profile" stickyFooter={footer} hideStickyFooterOnDesktop>
      <div className={styles.profileTop}>
        <Avatar initials={profile.initials} size="lg" />
        <h2 className={styles.name}>{profile.fullName}</h2>
        <p className={styles.meta}>
          Member since {profile.memberSince} · {profile.city}
        </p>
        <p className={styles.rating}>
          {'★'.repeat(Math.floor(profile.rating))}
          {'☆'.repeat(5 - Math.floor(profile.rating))} · {profile.reviewCount} reviews
        </p>
      </div>

      <div className={styles.trustBadges}>
        {profile.phoneVerified && <span className={styles.badgeGreen}>Phone verified</span>}
        {profile.idVerified && <span className={styles.badgeGreen}>ID verified</span>}
        {profile.salesCount && (
          <span className={styles.badgeOrange}>{profile.salesCount} sales done</span>
        )}
        {profile.replyTime && <span className={styles.badgeBlue}>{profile.replyTime}</span>}
        {profile.positivePercent && (
          <span className={styles.badgeGrey}>{profile.positivePercent}% positive</span>
        )}
      </div>

      <div className={styles.desktopActions}>{footer}</div>

      <div className={styles.stats}>
        <div>
          <strong>{profile.activeListings}</strong>
          <span>Active listings</span>
        </div>
        <div>
          <strong>{profile.itemsSold}</strong>
          <span>Items sold</span>
        </div>
        <div>
          <strong>{profile.reviewCount}</strong>
          <span>Reviews</span>
        </div>
        <div>
          <strong>{profile.yearsOnPlatform}y</strong>
          <span>On Samudra</span>
        </div>
      </div>

      <div className={styles.tabs}>
        {(['listings', 'reviews', 'about'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'listings' && `Listings (${profile.activeListings})`}
            {t === 'reviews' && `Reviews (${profile.reviewCount})`}
            {t === 'about' && 'About'}
          </button>
        ))}
      </div>

      {tab === 'listings' && (
        <div className={styles.listingGrid}>
          {profile.listings.map((item) => (
            <Link key={item.id} to={`/listings/${item.id}`} className={styles.profileCard}>
              <div className={styles.cardImage}>
                <span>{item.icon}</span>
                {item.sold && <span className={styles.soldOverlay}>Sold</span>}
              </div>
              <p className={styles.cardPrice}>{formatPrice(item.price)}</p>
              <p className={styles.cardTitle}>{item.title}</p>
            </Link>
          ))}
        </div>
      )}

      {tab === 'reviews' && (
        <div className={styles.reviewsList}>
          {profile.reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHead}>
                <span className={styles.reviewAvatar}>{review.authorInitials}</span>
                <div>
                  <p className={styles.reviewAuthor}>{review.authorName}</p>
                  <p className={styles.reviewTime}>{review.postedAgo}</p>
                </div>
                <span className={styles.reviewStars}>{'★'.repeat(review.rating)}</span>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'about' && (
        <p className={styles.about}>
          Local seller in {profile.city}. Mostly electronics and vehicles. Prefer meeting in
          public places for handover.
        </p>
      )}

      {tab === 'listings' && (
        <section className={styles.recentReviews}>
          <div className={styles.recentHeader}>
            <h3>Recent reviews</h3>
            <button type="button" className={styles.seeAll}>
              See all {profile.reviewCount}
            </button>
          </div>
          {profile.reviews.slice(0, 2).map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHead}>
                <span className={styles.reviewAvatar}>{review.authorInitials}</span>
                <div>
                  <p className={styles.reviewAuthor}>{review.authorName}</p>
                  <p className={styles.reviewTime}>{review.postedAgo}</p>
                </div>
                <span className={styles.reviewStars}>{'★'.repeat(review.rating)}</span>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </section>
      )}
    </PageShell>
  );
}
