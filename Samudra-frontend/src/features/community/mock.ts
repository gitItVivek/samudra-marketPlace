import type { CommunityDetail, CommunitySummary } from '@/shared/types';

export const suggestedCommunities: CommunitySummary[] = [
  {
    id: 'koramangala-deals',
    name: 'Koramangala Deals',
    description: 'Local buys & sells in Koramangala',
    memberCount: 1240,
    listingCount: 89,
    icon: '🏘️',
    location: 'Koramangala',
  },
  {
    id: 'bengaluru-bikes',
    name: 'Bengaluru Bikes',
    description: 'Two-wheelers & spare parts',
    memberCount: 3420,
    listingCount: 156,
    icon: '🏍️',
    location: 'Bengaluru',
  },
  {
    id: 'startup-flea',
    name: 'Startup Flea Market',
    description: 'Office gear, monitors, chairs',
    memberCount: 890,
    listingCount: 42,
    icon: '💼',
    location: 'HSR / Bellandur',
  },
  {
    id: 'pet-adoptions',
    name: 'Pet Adoptions BLR',
    description: 'Adopt, don’t shop — verified posts',
    memberCount: 2100,
    listingCount: 28,
    icon: '🐾',
    location: 'Bengaluru',
  },
];

export const allCommunities: CommunitySummary[] = [
  ...suggestedCommunities,
  {
    id: 'indiranagar-housing',
    name: 'Indiranagar Housing',
    description: 'Rentals & flatmates',
    memberCount: 5600,
    listingCount: 210,
    icon: '🏠',
    location: 'Indiranagar',
  },
  {
    id: 'whitefield-electronics',
    name: 'Whitefield Electronics',
    description: 'Phones, laptops, gaming',
    memberCount: 1800,
    listingCount: 95,
    icon: '📱',
    location: 'Whitefield',
  },
  {
    id: 'jayanagar-furniture',
    name: 'Jayanagar Furniture',
    description: 'Sofas, beds, dining sets',
    memberCount: 720,
    listingCount: 64,
    icon: '🛋️',
    location: 'Jayanagar',
  },
];

const communityDetails: Record<string, CommunityDetail> = {
  'koramangala-deals': {
    ...suggestedCommunities[0],
    about:
      'A trusted neighbourhood group for Koramangala residents. Post items you want to sell or give away — no spam, no advance payments.',
    posts: [
      {
        id: 'p1',
        communityId: 'koramangala-deals',
        title: 'Moving sale — study table + chair',
        excerpt: 'IKEA desk, barely used. Pickup 5th Block.',
        authorName: 'Anita S.',
        postedAgo: '3h ago',
        icon: '🪑',
        price: 4500,
        listingId: 'ikea-dresser',
      },
      {
        id: 'p2',
        communityId: 'koramangala-deals',
        title: 'Royal Enfield Classic 350',
        excerpt: '2019 model, 18k km, single owner.',
        authorName: 'Vikram R.',
        postedAgo: '1d ago',
        icon: '🏍️',
        price: 145000,
        listingId: 'activa-6g',
      },
      {
        id: 'p3',
        communityId: 'koramangala-deals',
        title: 'Kids bicycle — age 6–9',
        excerpt: 'Good condition, helmet included.',
        authorName: 'Meera K.',
        postedAgo: '2d ago',
        icon: '🚲',
        price: 2200,
        listingId: 'kids-cycle',
      },
    ],
  },
  'bengaluru-bikes': {
    ...suggestedCommunities[1],
    about: 'Everything on two wheels. Helmet and RC checks encouraged before meetups.',
    posts: [
      {
        id: 'p4',
        communityId: 'bengaluru-bikes',
        title: 'Activa 6G — low mileage',
        excerpt: '2022, serviced at agency.',
        authorName: 'Rahul K.',
        postedAgo: '5h ago',
        icon: '🏍️',
        price: 62000,
        listingId: 'activa-6g',
      },
      {
        id: 'p5',
        communityId: 'bengaluru-bikes',
        title: 'Riding jacket — size L',
        excerpt: 'Barely worn, CE armour.',
        authorName: 'Arjun P.',
        postedAgo: '12h ago',
        icon: '🧥',
        price: 3500,
      },
    ],
  },
};

export function getCommunityDetail(id: string): CommunityDetail {
  const base = allCommunities.find((c) => c.id === id) ?? suggestedCommunities[0];
  return (
    communityDetails[id] ?? {
      ...base,
      about: `${base.name} is a local Samudra community for ${base.description}.`,
      posts: [
        {
          id: 'default',
          communityId: base.id,
          title: 'Welcome to the community',
          excerpt: 'Browse listings shared by members here.',
          authorName: 'Samudra',
          postedAgo: '1w ago',
          icon: base.icon,
        },
      ],
    }
  );
}
