import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Clock, Heart, MapPin, MessageCircle, Phone, Share2 } from 'lucide-react';
import { PageShell } from '@/shared/layout/PageShell';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { Button } from '@/shared/components/Button/Button';
import { OwnerListingMenu } from '@/features/listing/components/OwnerListingMenu/OwnerListingMenu';
import { formatPrice } from '@/shared/utils/format';
import { getListing } from '@/api/listings';
import { getBidAnalytics, getBidHistory, markBidsSeen, placeBid } from '@/api/auction';
import { mapListingDetail } from '@/shared/utils/mappers';
import { useAuth } from '@/features/identity/context/AuthContext';
import type { ListingDetail } from '@/shared/types';
import type { BidAnalyticsDto, BidDto, ListingDetailDto } from '@/shared/types/api';
import styles from './ListingDetailPage.module.css';

export function ListingDetailPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { user, accessToken, isAuthenticated } = useAuth();
  const [dto, setDto] = useState<ListingDetailDto | null>(null);
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<BidAnalyticsDto | null>(null);
  const [bids, setBids] = useState<BidDto[]>([]);

  const isOwner = Boolean(user && dto && user.id === dto.userId);
  const isAuction = dto?.saleType === 'AUCTION';

  useEffect(() => {
    if (!listingId) return;
    let cancelled = false;
    getListing(listingId)
      .then((data) => {
        if (cancelled) return;
        setDto(data);
        setListing(mapListingDetail(data));
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [listingId]);

  useEffect(() => {
    if (!listingId || !accessToken || !isOwner || !isAuction) return;
    let cancelled = false;
    Promise.all([
      getBidAnalytics(listingId, accessToken),
      getBidHistory(listingId, accessToken),
    ])
      .then(([a, b]) => {
        if (cancelled) return;
        setAnalytics(a);
        setBids(b);
        return markBidsSeen(listingId, accessToken);
      })
      .catch(() => {
        /* seller analytics optional */
      });
    return () => {
      cancelled = true;
    };
  }, [listingId, accessToken, isOwner, isAuction]);

  if (error) {
    return <PageShell title="Listing">{error}</PageShell>;
  }

  if (!listing || !dto) {
    return <PageShell title="Listing">Loading…</PageShell>;
  }

  const handlePlaceBid = async () => {
    if (!accessToken || !listingId) return;
    setBidMessage(null);
    try {
      const amount = Number(bidAmount.replace(/,/g, ''));
      await placeBid(listingId, amount, accessToken);
      setBidMessage('Bid placed successfully');
      const refreshed = await getListing(listingId);
      setDto(refreshed);
      setListing(mapListingDetail(refreshed));
      setBidAmount('');
    } catch (err) {
      setBidMessage(err instanceof Error ? err.message : 'Bid failed');
    }
  };

  const footer = isOwner ? (
    <Button variant="primary" fullWidth onClick={() => navigate(`/listings/${listingId}/edit`)}>
      Edit listing
    </Button>
  ) : (
    <>
      <Button variant="icon" aria-label="Call">
        <Phone size={20} />
      </Button>
      <Button variant="primary" fullWidth onClick={() => navigate('/chats')}>
        <MessageCircle size={20} />
        Chat with seller
      </Button>
    </>
  );

  const headerActions = isOwner ? (
    <>
      <button type="button" className={styles.headerIconBtn} aria-label="Share">
        <Share2 size={20} />
      </button>
      <OwnerListingMenu listingId={listing.id} listingTitle={listing.title} />
    </>
  ) : undefined;

  const coverUrl = dto.images.find((i) => i.cover)?.url ?? dto.images[0]?.url;

  return (
    <PageShell
      title="Listing"
      rightActions={isOwner ? 'none' : 'share-menu'}
      headerAction={headerActions}
      stickyFooter={footer}
      hideStickyFooterOnDesktop
      noPadding
    >
      <div className={styles.detailLayout}>
        <div className={styles.gallery}>
          {coverUrl ? (
            <img src={coverUrl} alt="" className={styles.galleryImage} />
          ) : (
            <span className={styles.galleryIcon}>{listing.icon}</span>
          )}
          <span className={styles.counter}>
            {dto.images.length || 1} photo{dto.images.length === 1 ? '' : 's'}
          </span>
        </div>
        <div className={styles.body}>
          <div className={styles.priceRow}>
            <h2 className={styles.price}>{listing.priceLabel ?? formatPrice(listing.price)}</h2>
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
            {isAuction && dto.auctionEndsAt && (
              <span>Auction ends {new Date(dto.auctionEndsAt).toLocaleString('en-IN')}</span>
            )}
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
                <span className={styles.detailLabel}>Sale type</span>
                <span>{dto.saleType === 'AUCTION' ? 'Auction' : 'Fixed price'}</span>
              </div>
              <div>
                <span className={styles.detailLabel}>Listed</span>
                <span>{listing.listedAt}</span>
              </div>
            </div>
          </section>

          {isAuction && !isOwner && isAuthenticated && dto.status === 'ACTIVE' && (
            <section className={styles.section}>
              <h4>Place a bid</h4>
              <div className={styles.bidRow}>
                <input
                  type="text"
                  placeholder="Amount in INR"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
                <Button variant="primary" onClick={handlePlaceBid}>
                  Bid
                </Button>
              </div>
              {bidMessage && <p>{bidMessage}</p>}
            </section>
          )}

          {isAuction && isOwner && analytics && (
            <section className={styles.section}>
              <h4>Your auction analytics</h4>
              <p>
                {analytics.totalBids} bids · {analytics.uniqueBidders} bidders · High{' '}
                {analytics.highestBid != null ? formatPrice(analytics.highestBid) : '—'}
              </p>
              {bids.length > 0 && (
                <ul>
                  {bids.map((b) => (
                    <li key={b.bidId}>
                      {formatPrice(b.amount)} · {new Date(b.createdAt).toLocaleString('en-IN')}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <section className={styles.section}>
            <h4>Seller</h4>
            <Link to={`/profiles/${listing.seller.id}`} className={styles.sellerCard}>
              <Avatar initials={listing.seller.initials} />
              <div className={styles.sellerInfo}>
                <p className={styles.sellerName}>{listing.seller.name}</p>
                <p className={styles.sellerMeta}>Seller ID {listing.seller.id.slice(0, 8)}…</p>
              </div>
              <span className={styles.viewProfile}>View profile</span>
            </Link>
          </section>
          <section className={styles.section}>
            <h4>Meet-up location</h4>
            <div className={styles.mapPlaceholder}>
              <MapPin size={20} />
              <span>{listing.location}</span>
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
