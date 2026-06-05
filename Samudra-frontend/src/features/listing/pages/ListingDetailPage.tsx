import { Link, useNavigate, useParams } from 'react-router-dom';
import { Clock, Eye, Heart, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PageShell } from '@/shared/layout/PageShell';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { Button } from '@/shared/components/Button/Button';
import { formatPrice } from '@/shared/utils/format';
import { getListingDetail } from '@/features/listing/mock';
import styles from './ListingDetailPage.module.css';

export function ListingDetailPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const listing = getListingDetail(listingId ?? 'iphone-12');

  if (!listing) {
    return <PageShell title="Listing">Not found</PageShell>;
  }

  const footer = (
    <>
      <Button variant="icon" aria-label="Call">
        <Phone size={20} />
      </Button>
      <Button
        variant="primary"
        fullWidth
        onClick={() => navigate(`/chats/${listing.conversationId}`)}
      >
        <MessageCircle size={20} />
        Chat with seller
      </Button>
    </>
  );

  return (
    <PageShell
      title="Listing"
      rightActions="share-menu"
      stickyFooter={footer}
      hideStickyFooterOnDesktop
      noPadding
    >
      <div className={styles.detailLayout}>
      <div className={styles.gallery}>
        <span className={styles.galleryIcon}>{listing.icon}</span>
        <div className={styles.dots}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`${styles.dot} ${i === 0 ? styles.dotActive : ''}`} />
          ))}
        </div>
        <span className={styles.counter}>1 / {listing.imageCount}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.priceRow}>
          <h2 className={styles.price}>{formatPrice(listing.price)}</h2>
          <button type="button" className={styles.favBtn} aria-label="Favorite">
            <Heart size={22} />
          </button>
        </div>
        <h3 className={styles.title}>{listing.title}</h3>
        <div className={styles.meta}>
          <span>
            <MapPin size={14} />
            {listing.location}
          </span>
          <span>
            <Clock size={14} />
            {listing.postedAgo}
          </span>
          <span className={styles.views}>
            <Eye size={14} />
            {listing.views} views
          </span>
        </div>
        <section className={styles.section}>
          <h4>Description</h4>
          <p>{listing.description}</p>
        </section>
        <section className={styles.section}>
          <h4>Details</h4>
          <div className={styles.detailsGrid}>
            <div>
              <span className={styles.detailLabel}>Category</span>
              <span>{listing.category}</span>
            </div>
            <div>
              <span className={styles.detailLabel}>Condition</span>
              <span>{listing.conditionLabel}</span>
            </div>
            <div>
              <span className={styles.detailLabel}>Brand</span>
              <span>{listing.brand}</span>
            </div>
            <div>
              <span className={styles.detailLabel}>Listed</span>
              <span>{listing.listedAt}</span>
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <h4>Seller</h4>
          <Link to={`/profiles/${listing.seller.id}`} className={styles.sellerCard}>
            <Avatar initials={listing.seller.initials} />
            <div className={styles.sellerInfo}>
              <p className={styles.sellerName}>{listing.seller.name}</p>
              <p className={styles.sellerMeta}>
                Member since {listing.seller.memberSince} · {listing.seller.listingCount} listings
              </p>
              <p className={styles.sellerRating}>
                ★ {listing.seller.rating} · {listing.seller.reviewCount} reviews
              </p>
              <div className={styles.badges}>
                {listing.seller.phoneVerified && <span>Phone verified</span>}
                {listing.seller.idVerified && <span>ID verified</span>}
                {listing.seller.salesCount && <span>{listing.seller.salesCount} sales done</span>}
              </div>
            </div>
            <span className={styles.viewProfile}>View profile</span>
          </Link>
        </section>
        <section className={styles.section}>
          <h4>Meet-up location</h4>
          <div className={styles.mapPlaceholder}>
            <MapPin size={20} />
            <span>{listing.location} · ~2.4 km from you</span>
          </div>
        </section>
        <div className={styles.safety}>
          Always meet in a public place. Never pay in advance. Samudra will never ask you to
          transfer money outside the app. Report this listing if something feels off.
        </div>
        <div className={styles.desktopActions}>{footer}</div>
      </div>
      </div>
    </PageShell>
  );
}
