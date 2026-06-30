export type CommunityPrivacy = 'public' | 'private';

export interface CommunitySummary {
  id: string;
  slug: string;
  name: string;
  description: string;
  memberCount: number;
  listingCount: number;
  icon: string;
  location?: string;
  joined?: boolean;
  privacy?: CommunityPrivacy;
  category?: string;
  since?: string;
}

export interface CommunityPost {
  id: string;
  communityId: string;
  listingId?: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorInitials?: string;
  postedAgo: string;
  postedAt?: string;
  icon: string;
  price?: number;
  location?: string;
  tag?: string;
}

export interface CommunityDetail extends CommunitySummary {
  about: string;
  posts: CommunityPost[];
}
