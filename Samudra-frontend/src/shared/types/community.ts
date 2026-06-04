export interface CommunitySummary {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  listingCount: number;
  icon: string;
  location?: string;
  joined?: boolean;
}

export interface CommunityPost {
  id: string;
  communityId: string;
  listingId?: string;
  title: string;
  excerpt: string;
  authorName: string;
  postedAgo: string;
  icon: string;
  price?: number;
}

export interface CommunityDetail extends CommunitySummary {
  about: string;
  posts: CommunityPost[];
}
