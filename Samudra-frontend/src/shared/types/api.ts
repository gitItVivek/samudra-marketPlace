export type SaleType = 'FIXED_PRICE' | 'AUCTION';
export type ListingType = 'SELL' | 'BUY' | 'RENT_OUT' | 'RENT_WANTED' | 'SERVICE' | 'FREE';
export type ListingStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'SOLD'
  | 'INACTIVE'
  | 'REMOVED'
  | 'TAKEN_DOWN'
  | 'EXPIRED';
export type ListingCondition = 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'FOR_PARTS';
export type CategoryType =
  | 'ELECTRONICS'
  | 'VEHICLES'
  | 'PROPERTY'
  | 'FURNITURE_HOME'
  | 'FASHION'
  | 'BOOKS_MEDIA'
  | 'SPORTS_FITNESS'
  | 'SERVICES'
  | 'JOBS'
  | 'PETS'
  | 'AGRICULTURE'
  | 'OTHER';

export interface PagedResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ListingImageDto {
  url: string;
  displayOrder: number;
  cover: boolean;
}

export interface ListingSummaryDto {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  categoryType: CategoryType;
  listingType: ListingType;
  status: ListingStatus;
  saleType: SaleType;
  price: number | null;
  startingPrice: number | null;
  currentBidAmount: number | null;
  currency: string;
  city: string;
  state: string;
  locality: string | null;
  coverImageUrl: string | null;
  createdAt: string;
  auctionEndsAt: string | null;
}

export interface ListingDetailDto extends ListingSummaryDto {
  categoryId: string;
  condition: ListingCondition | null;
  latitude: number | null;
  longitude: number | null;
  images: ListingImageDto[];
  updatedAt: string;
}

export interface CreateListingPayload {
  title: string;
  description?: string;
  categoryType: CategoryType;
  listingType: ListingType;
  condition?: ListingCondition;
  saleType?: SaleType;
  price?: number;
  startingPrice?: number;
  auctionEndsAt?: string;
  currency?: string;
  city: string;
  state: string;
  locality?: string;
  latitude?: number;
  longitude?: number;
  imageUrls?: string[];
  customTag?: string;
}

export interface CommunitySummaryDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  categoryType: CategoryType;
  city: string;
  state: string;
  status: string;
  memberCount: number;
  listingCount: number;
  createdAt: string;
}

export interface CommunityDetailDto extends CommunitySummaryDto {
  createdBy: string;
  coverImageUrl: string | null;
  isPrivate: boolean;
}

export interface CreateCommunityPayload {
  name: string;
  slug: string;
  description?: string;
  categoryType: CategoryType;
  city: string;
  state: string;
}

export interface BidDto {
  bidId: string;
  listingId: string;
  bidderId: string;
  amount: number;
  createdAt: string;
}

export interface BidAnalyticsDto {
  listingId: string;
  totalBids: number;
  uniqueBidders: number;
  highestBid: number | null;
  lowestBid: number | null;
  averageBid: number | null;
  latestBidAt: string | null;
  bidsLast24h: number;
}

export interface AuctionAlertDto {
  listingId: string;
  title: string;
  currentBidAmount: number | null;
  unreadBidCount: number;
  latestBidAt: string | null;
}
