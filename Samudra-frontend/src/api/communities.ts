import { apiFetch } from '@/api/client';
import { API_PATHS } from '@/api/paths';
import type {
  CommunityDetailDto,
  CommunitySummaryDto,
  CreateCommunityPayload,
  CreateListingPayload,
  ListingDetailDto,
  ListingSummaryDto,
  PagedResponse,
} from '@/shared/types/api';

export interface CommunitySearchParams {
  city?: string;
  categoryType?: string;
  q?: string;
  page?: number;
  size?: number;
}

function toQuery(params: CommunitySearchParams): string {
  const search = new URLSearchParams();
  if (params.city) search.set('city', params.city);
  if (params.categoryType) search.set('categoryType', params.categoryType);
  if (params.q) search.set('q', params.q);
  search.set('page', String(params.page ?? 0));
  search.set('size', String(params.size ?? 20));
  return `?${search.toString()}`;
}

export function searchCommunities(params: CommunitySearchParams = {}) {
  return apiFetch<PagedResponse<CommunitySummaryDto>>(
    `${API_PATHS.communities.base}${toQuery(params)}`,
  );
}

export function getCommunityBySlug(slug: string) {
  return apiFetch<CommunityDetailDto>(API_PATHS.communities.bySlug(slug));
}

export function createCommunity(payload: CreateCommunityPayload, token: string) {
  return apiFetch<CommunityDetailDto>(API_PATHS.communities.base, {
    method: 'POST',
    body: JSON.stringify(payload),
    token,
  });
}

export function joinCommunity(communityId: string, token: string) {
  return apiFetch<void>(API_PATHS.communities.join(communityId), {
    method: 'POST',
    token,
  });
}

export function getCommunityListings(communityId: string, page = 0, size = 20) {
  return apiFetch<PagedResponse<ListingSummaryDto>>(
    `${API_PATHS.communities.listings(communityId)}?page=${page}&size=${size}`,
  );
}

export function postCommunityListing(
  communityId: string,
  payload: CreateListingPayload,
  token: string,
) {
  return apiFetch<ListingDetailDto>(API_PATHS.communities.listings(communityId), {
    method: 'POST',
    body: JSON.stringify(payload),
    token,
  });
}
