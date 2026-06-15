export type ListingCondition = 'NEW' | 'USED_GOOD' | 'USED_FAIR' | 'FOR_PARTS';

export type ListingBadge = 'used' | 'new' | 'boosted';

export interface ListingSummary {
  id: string;
  title: string;
  price: number;
  priceLabel?: string;
  location: string;
  postedAgo: string;
  condition?: ListingBadge;
  boosted?: boolean;
  verifiedSeller?: boolean;
  negotiable?: boolean;
  icon: string;
  sellerId?: string;
}

export interface ListingDetail extends ListingSummary {
  description: string;
  views: number;
  category: string;
  conditionLabel: string;
  brand: string;
  listedAt: string;
  negotiable?: boolean;
  imageCount: number;
  seller: SellerSummary;
  conversationId: string;
}

export interface SellerSummary {
  id: string;
  name: string;
  initials: string;
  memberSince: string;
  listingCount: number;
  rating: number;
  reviewCount: number;
  phoneVerified?: boolean;
  idVerified?: boolean;
  salesCount?: number;
  online?: boolean;
}

export interface SellerProfile extends SellerSummary {
  fullName: string;
  city: string;
  activeListings: number;
  itemsSold: number;
  yearsOnPlatform: number;
  replyTime?: string;
  positivePercent?: number;
  listings: ProfileListing[];
  reviews: Review[];
}

export interface ProfileListing {
  id: string;
  title: string;
  price: number;
  icon: string;
  sold?: boolean;
}

export interface Review {
  id: string;
  authorInitials: string;
  authorName: string;
  postedAgo: string;
  rating: number;
  text: string;
}

export interface ChatMessage {
  id: string;
  type: 'received' | 'sent' | 'system';
  text: string;
  time?: string;
  senderInitials?: string;
}

export interface Conversation {
  id: string;
  listing: ListingSummary;
  participant: SellerSummary;
  messages: ChatMessage[];
}

export type CategoryId =
  | 'all'
  | 'electronics'
  | 'vehicles'
  | 'property'
  | 'furniture'
  | 'jobs'
  | 'services'
  | 'fashion'
  | 'books'
  | 'sports'
  | 'pets'
  | 'home'
  | 'appliances'
  | 'kids'
  | 'beauty'
  | 'music'
  | 'garden'
  | 'tickets'
  | 'grocery'
  | 'tools';

export interface CategoryItem {
  id: CategoryId;
  label: string;
  color: string;
  icon: string;
}

export type { CommunitySummary, CommunityPost, CommunityDetail } from './community';
