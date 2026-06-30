import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Lightbulb, MapPin } from 'lucide-react';
import { cityListingsPath } from '@/app/paths';
import { PageShell } from '@/shared/layout/PageShell';
import { Button } from '@/shared/components/Button/Button';
import { ListingStepper } from '@/features/listing/components/ListingStepper';
import { createListing } from '@/api/listings';
import { useAuth } from '@/features/identity/context/AuthContext';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import { CONDITION_UI_TO_API, uiCategoryToApi } from '@/shared/constants/categoryMapping';
import { parseCityState, formatCityState } from '@/shared/utils/location';
import type { CategoryType, ListingType, SaleType } from '@/shared/types/api';
import styles from './PostListingPage.module.css';

const CONDITIONS = ['Not applicable', 'New', 'Used — Good', 'Used — Fair', 'For parts'];
const CATEGORIES: { id: string; label: string }[] = [
  { id: 'electronics', label: 'Electronics' },
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'property', label: 'Property' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'services', label: 'Services' },
  { id: 'other', label: 'Other' },
];

const LISTING_TYPES: { id: ListingType; label: string; hint: string }[] = [
  { id: 'SELL', label: 'Selling', hint: 'I have something to sell or rent out' },
  { id: 'BUY', label: 'Looking to buy', hint: 'Want ad — looking for an item' },
  { id: 'RENT_WANTED', label: 'Looking for rent', hint: 'Flat, flatmate, room, etc.' },
  { id: 'SERVICE', label: 'Offering service', hint: 'Tutoring, repairs, and more' },
  { id: 'FREE', label: 'Giving away', hint: 'Free to a good home' },
];

function isWantAdType(listingType: ListingType) {
  return listingType === 'BUY' || listingType === 'RENT_WANTED' || listingType === 'FREE';
}

export function PostListingPage() {
  const navigate = useNavigate();
  const { step: stepParam } = useParams();
  const { accessToken } = useAuth();
  const { city, state } = useBrowseFilters();
  const parsed = stepParam ? parseInt(stepParam, 10) : 2;
  const step = Number.isNaN(parsed) ? 2 : parsed;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('property');
  const [listingType, setListingType] = useState<ListingType>('RENT_WANTED');
  const [condition, setCondition] = useState('Not applicable');
  const [customTag, setCustomTag] = useState('');
  const [price, setPrice] = useState('');
  const [locationInput, setLocationInput] = useState(() => formatCityState(city, state));
  const [saleType, setSaleType] = useState<SaleType>('FIXED_PRICE');
  const [startingPrice, setStartingPrice] = useState('');
  const [auctionEndsAt, setAuctionEndsAt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wantAd = isWantAdType(listingType);
  const showAuction = !wantAd && listingType === 'SELL';

  useEffect(() => {
    setLocationInput(formatCityState(city, state));
  }, [city, state]);

  const goStep = (n: number) => navigate(n === 2 ? '/sell' : `/sell/${n}`);

  const publish = async () => {
    if (!accessToken) {
      navigate('/auth/login');
      return;
    }
    setSubmitting(true);
    setError(null);
    const { city: listingCity, state: listingState } = parseCityState(locationInput);
    const categoryType = uiCategoryToApi(category) as CategoryType;
    const conditionApi =
      condition !== 'Not applicable' ? CONDITION_UI_TO_API[condition] : undefined;

    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || undefined,
        categoryType,
        listingType,
        condition: conditionApi as 'NEW' | 'GOOD' | 'FAIR' | 'FOR_PARTS' | undefined,
        saleType: showAuction ? saleType : 'FIXED_PRICE',
        currency: 'INR',
        city: listingCity,
        state: listingState,
        imageUrls: imageUrl.trim() ? [imageUrl.trim()] : undefined,
        customTag: customTag.trim() || undefined,
        ...(wantAd
          ? {}
          : saleType === 'FIXED_PRICE'
            ? { price: Number(price.replace(/,/g, '')) }
            : {
                startingPrice: Number(startingPrice.replace(/,/g, '')),
                auctionEndsAt: new Date(auctionEndsAt).toISOString(),
              }),
      };
      const created = await createListing(payload, accessToken);
      navigate(`/listings/${created.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create listing');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell
      title="Post a listing"
      rightActions="none"
      onBack={() => navigate(cityListingsPath(city))}
      stickyFooter={
        step === 2 ? (
          <Button variant="primary" fullWidth onClick={() => goStep(3)} disabled={!title.trim()}>
            Next — Review
            <ArrowRight size={18} />
          </Button>
        ) : (
          <div className={styles.navFooter}>
            <Button variant="outline" onClick={() => goStep(2)}>
              Back
            </Button>
            <Button variant="primary" fullWidth onClick={publish} disabled={submitting}>
              {submitting ? 'Publishing…' : 'Publish listing'}
            </Button>
          </div>
        )
      }
    >
      <ListingStepper currentStep={step} />

      {step === 2 && (
        <div className={styles.form}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>What are you posting?</span>
            <div className={styles.pills}>
              {LISTING_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.pill} ${listingType === t.id ? styles.pillActive : ''}`}
                  onClick={() => setListingType(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className={styles.hint}>
              {LISTING_TYPES.find((t) => t.id === listingType)?.hint}
            </p>
          </div>

          <label className={styles.field}>
            Title <span className={styles.required}>*</span>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Category</span>
            <div className={styles.pills}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`${styles.pill} ${category === c.id ? styles.pillActive : ''}`}
                  onClick={() => setCategory(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <label className={styles.field}>
            Custom tag (optional)
            <input
              type="text"
              placeholder="e.g. flatmate, PG, urgent"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
            />
          </label>

          {showAuction && (
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Sale type</span>
              <div className={styles.pills}>
                <button
                  type="button"
                  className={`${styles.pill} ${saleType === 'FIXED_PRICE' ? styles.pillActive : ''}`}
                  onClick={() => setSaleType('FIXED_PRICE')}
                >
                  Fixed price
                </button>
                <button
                  type="button"
                  className={`${styles.pill} ${saleType === 'AUCTION' ? styles.pillActive : ''}`}
                  onClick={() => setSaleType('AUCTION')}
                >
                  Auction
                </button>
              </div>
            </div>
          )}

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Condition (optional)</span>
            <div className={styles.pills}>
              {CONDITIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${styles.pill} ${condition === c ? styles.pillActive : ''}`}
                  onClick={() => setCondition(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <label className={styles.field}>
            Description
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          {!wantAd && saleType === 'FIXED_PRICE' ? (
            <label className={styles.field}>
              Price <span className={styles.required}>*</span>
              <div className={styles.priceInput}>
                <span>₹</span>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
            </label>
          ) : !wantAd ? (
            <>
              <label className={styles.field}>
                Starting price <span className={styles.required}>*</span>
                <div className={styles.priceInput}>
                  <span>₹</span>
                  <input
                    type="text"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                  />
                </div>
              </label>
              <label className={styles.field}>
                Auction ends at <span className={styles.required}>*</span>
                <input
                  type="datetime-local"
                  value={auctionEndsAt}
                  onChange={(e) => setAuctionEndsAt(e.target.value)}
                />
              </label>
            </>
          ) : null}

          <label className={styles.field}>
            Image URL (optional)
            <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </label>

          <label className={styles.field}>
            Location <span className={styles.required}>*</span>
            <div className={styles.locationInput}>
              <MapPin size={18} />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="City, State"
              />
            </div>
            <p className={styles.hint}>
              Where this listing applies. Defaults to your current city — change if the item is elsewhere.
            </p>
          </label>
        </div>
      )}

      {step === 3 && (
        <div className={styles.placeholder}>
          <p>Review your listing</p>
          <p className={styles.hint}>
            <Lightbulb size={14} /> {title || 'Untitled'} ·{' '}
            {LISTING_TYPES.find((t) => t.id === listingType)?.label}
            {customTag ? ` · ${customTag}` : ''}
          </p>
          {error && <p className={styles.hint}>{error}</p>}
        </div>
      )}
    </PageShell>
  );
}
