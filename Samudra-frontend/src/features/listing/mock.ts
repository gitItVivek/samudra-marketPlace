import type { ListingDetail } from '@/shared/types';

export const listingDetails: Record<string, ListingDetail> = {
  'iphone-12': {
    id: 'iphone-12',
    title: 'iPhone 12 · 64GB · Space Grey · Excellent condition',
    price: 14500,
    location: 'Koramangala, Bengaluru',
    postedAgo: '2 hours ago',
    condition: 'used',
    icon: '📱',
    description:
      'Used for 18 months, no scratches on screen. Battery health 87%. Original box and charger included. Single owner, always used with case.',
    views: 128,
    category: 'Electronics',
    conditionLabel: 'Used — Good',
    brand: 'Apple',
    listedAt: 'Today, 9:30 AM',
    negotiable: true,
    imageCount: 4,
    conversationId: 'demo',
    seller: {
      id: 'rahul-k',
      name: 'Rahul K.',
      initials: 'RK',
      memberSince: 'Jan 2022',
      listingCount: 24,
      rating: 4.2,
      reviewCount: 17,
      phoneVerified: true,
      idVerified: true,
      salesCount: 12,
    },
  },
};

export function getListingDetail(id: string): ListingDetail | undefined {
  return listingDetails[id] ?? listingDetails['iphone-12'];
}
