import type { SellerProfile } from '@/shared/types';

export const sellerProfiles: Record<string, SellerProfile> = {
  'rahul-k': {
    id: 'rahul-k',
    name: 'Rahul K.',
    fullName: 'Rahul Kumar',
    initials: 'RK',
    memberSince: 'Jan 2022',
    city: 'Bengaluru',
    listingCount: 24,
    rating: 4.2,
    reviewCount: 17,
    phoneVerified: true,
    idVerified: true,
    salesCount: 12,
    activeListings: 24,
    itemsSold: 12,
    yearsOnPlatform: 3,
    replyTime: 'Usually replies in 1h',
    positivePercent: 89,
    listings: [
      { id: 'iphone-12', title: 'iPhone 12', price: 14500, icon: '📱' },
      { id: 'macbook-air', title: 'MacBook Air M1', price: 52000, icon: '💻' },
      { id: 'activa-6g', title: 'Honda Activa 6G', price: 62000, icon: '🏍️', sold: true },
      { id: 'sofa-set', title: '3-seater Sofa', price: 8500, icon: '🛋️' },
      { id: 'camera', title: 'Canon EOS', price: 28000, icon: '📷' },
      { id: 'monitor', title: 'Dell 27" Monitor', price: 12000, icon: '🖥️' },
    ],
    reviews: [
      {
        id: 'r1',
        authorInitials: 'AM',
        authorName: 'Amit M.',
        postedAgo: '2 weeks ago',
        rating: 5,
        text: 'Quick to respond and item was exactly as described. Smooth handover.',
      },
      {
        id: 'r2',
        authorInitials: 'PK',
        authorName: 'Priya K.',
        postedAgo: '1 month ago',
        rating: 5,
        text: 'Honest seller. Phone was in great condition. Would buy again.',
      },
    ],
  },
};

export function getSellerProfile(id: string): SellerProfile {
  return sellerProfiles[id] ?? sellerProfiles['rahul-k'];
}
