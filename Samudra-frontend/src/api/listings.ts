import { apiFetch } from '@/api/client';
import { API_PATHS } from '@/api/paths';
import type {
  CreateListingPayload,
  ListingDetailDto,
  ListingSummaryDto,
  PagedResponse,
} from '@/shared/types/api';

export interface ListingSearchParams {
  city?: string;
  state?: string;
  categoryType?: string;
  listingType?: string;
  saleType?: string;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  size?: number;
}

function toQuery(params: ListingSearchParams): string {
  const search = new URLSearchParams();
  if (params.city) search.set('city', params.city);
  if (params.state) search.set('state', params.state);
  if (params.categoryType) search.set('categoryType', params.categoryType);
  if (params.listingType) search.set('listingType', params.listingType);
  if (params.saleType) search.set('saleType', params.saleType);
  if (params.q) search.set('q', params.q);
  if (params.minPrice != null) search.set('minPrice', String(params.minPrice));
  if (params.maxPrice != null) search.set('maxPrice', String(params.maxPrice));
  if (params.sort) search.set('sort', params.sort);
  search.set('page', String(params.page ?? 0));
  search.set('size', String(params.size ?? 20));
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export function searchListings(params: ListingSearchParams = {}) {
  return apiFetch<PagedResponse<ListingSummaryDto>>(
    `${API_PATHS.listings.search}${toQuery(params)}`,
  );
}

export function getListing(id: string) {
  return apiFetch<ListingDetailDto>(API_PATHS.listings.byId(id));
}

export function createListing(payload: CreateListingPayload, token: string) {
  return apiFetch<ListingDetailDto>(API_PATHS.listings.base, {
    method: 'POST',
    body: JSON.stringify(payload),
    token,
  });
}

export function getMyListings(token: string, page = 0, size = 20) {
  return apiFetch<PagedResponse<ListingSummaryDto>>(
    `${API_PATHS.users.myListings}?page=${page}&size=${size}`,
    { token },
  );
}

export function deleteListing(id: string, token: string) {
  return apiFetch<void>(API_PATHS.listings.byId(id), { method: 'DELETE', token });
}

export interface UpdateListingPayload {
  title?: string;
  description?: string;
  price?: number;
  status?: ListingSummaryDto['status'];
}

export function updateListing(id: string, payload: UpdateListingPayload, token: string) {
  return apiFetch<ListingDetailDto>(API_PATHS.listings.byId(id), {
    method: 'PATCH',
    body: JSON.stringify(payload),
    token,
  });
}
