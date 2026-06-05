import type { CommunityDetail, CommunitySummary } from '@/shared/types';

export const communityFilterChips = [
  'All',
  'Bengaluru',
  'Electronics',
  'Property',
  'Vehicles',
  'Furniture',
  'Services',
  'Fashion',
];

export const yourCommunities: CommunitySummary[] = [
  {
    id: 'flats-flatmates-blr',
    name: 'Flats & Flatmates Bangalore',
    description: 'Find roommates, PGs and rental flats',
    memberCount: 12400,
    listingCount: 847,
    icon: '🏠',
    location: 'Bengaluru',
    joined: true,
    privacy: 'public',
    category: 'Property',
    since: 'Mar 2024',
  },
  {
    id: 'used-phones-blr',
    name: 'Used Phones Bangalore',
    description: 'Buy & sell verified mobiles',
    memberCount: 8900,
    listingCount: 412,
    icon: '📱',
    location: 'Bengaluru',
    joined: true,
    privacy: 'public',
    category: 'Electronics',
    since: 'Jan 2023',
  },
];

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

export const popularCommunities: CommunitySummary[] = [
  {
    id: 'indiranagar-housing',
    name: 'Indiranagar Housing',
    description: 'Rentals & flatmates',
    memberCount: 5600,
    listingCount: 210,
    icon: '🏠',
    location: 'Indiranagar',
    privacy: 'private',
    category: 'Property',
  },
  {
    id: 'whitefield-electronics',
    name: 'Whitefield Electronics',
    description: 'Phones, laptops, gaming',
    memberCount: 1800,
    listingCount: 95,
    icon: '📱',
    location: 'Whitefield',
    privacy: 'public',
  },
  {
    id: 'jayanagar-furniture',
    name: 'Jayanagar Furniture',
    description: 'Sofas, beds, dining sets',
    memberCount: 720,
    listingCount: 64,
    icon: '🛋️',
    location: 'Jayanagar',
    privacy: 'public',
  },
  {
    id: 'bengaluru-bikes',
    name: 'Bengaluru Bikes',
    description: 'Two-wheelers & spare parts',
    memberCount: 3420,
    listingCount: 156,
    icon: '🏍️',
    location: 'Bengaluru',
    privacy: 'public',
  },
];

export const allCommunities: CommunitySummary[] = [
  ...yourCommunities,
  ...suggestedCommunities,
  ...popularCommunities,
];

const flatsListings: CommunityDetail['posts'] = [
  {
    id: 'p-rent-1',
    communityId: 'flats-flatmates-blr',
    listingId: '2bhk-rent',
    title: '2BHK furnished flat · Koramangala 5th Block',
    excerpt: 'Ready to move · Lift · Power backup',
    authorName: 'Suresh P.',
    authorInitials: 'SP',
    postedAgo: '2h ago',
    postedAt: 'Today 9:30 AM',
    icon: '🏠',
    price: 18000,
    location: 'Koramangala',
    tag: 'Rent',
  },
  {
    id: 'p-rent-2',
    communityId: 'flats-flatmates-blr',
    title: 'Single room in shared flat · HSR',
    excerpt: 'Female flatmates only · WiFi included',
    authorName: 'Anita S.',
    authorInitials: 'AS',
    postedAgo: '5h ago',
    icon: '🛏️',
    price: 12000,
    location: 'HSR Layout',
    tag: 'Rent',
  },
  {
    id: 'p-rent-3',
    communityId: 'flats-flatmates-blr',
    listingId: 'ikea-dresser',
    title: 'PG accommodation near Metro',
    excerpt: 'Food optional · 1 month deposit',
    authorName: 'Ravi T.',
    authorInitials: 'RT',
    postedAgo: '1d ago',
    icon: '🏢',
    price: 9500,
    location: 'Indiranagar',
    tag: 'Rent',
  },
];

const communityDetails: Record<string, CommunityDetail> = {
  'flats-flatmates-blr': {
    ...yourCommunities[0],
    about:
      'Find roommates, PGs and rental flats across Bangalore. Post your listings, connect with verified flatmates and landlords.',
    posts: flatsListings,
  },
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
        authorInitials: 'AS',
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
        authorInitials: 'VR',
        postedAgo: '1d ago',
        icon: '🏍️',
        price: 145000,
        listingId: 'activa-6g',
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
        authorInitials: 'RK',
        postedAgo: '5h ago',
        icon: '🏍️',
        price: 62000,
        listingId: 'activa-6g',
      },
    ],
  },
};

export function getCommunityDetail(id: string): CommunityDetail {
  const base = allCommunities.find((c) => c.id === id) ?? yourCommunities[0];
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
