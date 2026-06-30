import type { ListingSummary, ListingDetail } from '@/shared/types';
import type { CommunitySummary, CommunityDetail, CommunityPost } from '@/shared/types/community';
import type {
  CommunityDetailDto,
  CommunitySummaryDto,
  ListingDetailDto,
  ListingSummaryDto,
} from '@/shared/types/api';
import { categoryTypeIcon } from '@/shared/constants/categoryMapping';
import { formatTimeAgo } from '@/shared/utils/time';
import { formatPrice } from '@/shared/utils/format';

function formatLocation(city: string, state: string, locality?: string | null): string {
  if (locality) return `${locality}, ${city}`;
  return `${city}, ${state}`;
}

function resolveDisplayPrice(dto: ListingSummaryDto): { amount: number; label: string } {
  if (dto.saleType === 'AUCTION') {
    const amount = dto.currentBidAmount ?? dto.startingPrice ?? 0;
    const prefix = dto.currentBidAmount ? 'Bid' : 'From';
    return { amount, label: `${prefix} ${formatPrice(amount)}` };
  }
  const amount = dto.price ?? 0;
  return { amount, label: formatPrice(amount) };
}

export function mapListingSummary(dto: ListingSummaryDto): ListingSummary {
  const { amount, label } = resolveDisplayPrice(dto);
  return {
    id: dto.id,
    title: dto.title,
    price: amount,
    priceLabel: label,
    location: formatLocation(dto.city, dto.state, dto.locality),
    postedAgo: formatTimeAgo(dto.createdAt),
    icon: categoryTypeIcon(dto.categoryType),
    sellerId: dto.userId,
    coverImageUrl: dto.coverImageUrl,
    status: dto.status,
  };
}

export function mapListingDetail(dto: ListingDetailDto): ListingDetail {
  const summary = mapListingSummary(dto);
  return {
    ...summary,
    description: dto.description ?? '',
    views: 0,
    category: dto.categoryType.replace(/_/g, ' '),
    conditionLabel: dto.condition?.replace(/_/g, ' ') ?? '—',
    brand: '—',
    listedAt: new Date(dto.createdAt).toLocaleDateString('en-IN'),
    imageCount: dto.images.length || 1,
    seller: {
      id: dto.userId,
      name: 'Seller',
      initials: 'S',
      memberSince: formatTimeAgo(dto.createdAt),
      listingCount: 0,
      rating: 0,
      reviewCount: 0,
    },
    conversationId: '',
  };
}

export function mapCommunitySummary(dto: CommunitySummaryDto): CommunitySummary {
  return {
    id: dto.id,
    slug: dto.slug,
    name: dto.name,
    description: dto.description ?? '',
    memberCount: dto.memberCount,
    listingCount: dto.listingCount,
    icon: categoryTypeIcon(dto.categoryType),
    location: `${dto.city}, ${dto.state}`,
    privacy: 'public',
    category: dto.categoryType.replace(/_/g, ' '),
    since: new Date(dto.createdAt).getFullYear().toString(),
  };
}

export function mapCommunityDetail(
  dto: CommunityDetailDto,
  posts: CommunityPost[] = [],
): CommunityDetail {
  return {
    ...mapCommunitySummary(dto),
    about: dto.description ?? '',
    posts,
    joined: false,
  };
}

export function listingDtoToCommunityPost(dto: ListingSummaryDto, communityId: string): CommunityPost {
  const { amount } = resolveDisplayPrice(dto);
  return {
    id: dto.id,
    communityId,
    listingId: dto.id,
    title: dto.title,
    excerpt: dto.description?.slice(0, 120) ?? '',
    authorName: 'Seller',
    authorInitials: 'S',
    postedAgo: formatTimeAgo(dto.createdAt),
    icon: categoryTypeIcon(dto.categoryType),
    price: amount,
    location: formatLocation(dto.city, dto.state, dto.locality),
  };
}
