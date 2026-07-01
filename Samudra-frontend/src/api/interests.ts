import { apiFetch } from '@/api/client';
import { API_PATHS } from '@/api/paths';

export type InterestSource = 'SEARCH' | 'EXPLICIT' | 'BROWSE';

export interface UserInterestDto {
  id: string;
  city: string;
  state?: string;
  categoryType?: string;
  listingType?: string;
  keywords?: string;
  customTag?: string;
  source: InterestSource;
  notifyEnabled: boolean;
  lastNotifiedAt?: string;
  createdAt: string;
}

export interface CreateUserInterestPayload {
  city: string;
  state?: string;
  categoryType?: string;
  listingType?: string;
  keywords?: string;
  customTag?: string;
  source: InterestSource;
}

export function listMyInterests(token: string) {
  return apiFetch<UserInterestDto[]>(API_PATHS.interests.base, { token });
}

export function createInterest(payload: CreateUserInterestPayload, token: string) {
  return apiFetch<UserInterestDto>(API_PATHS.interests.base, {
    method: 'POST',
    body: JSON.stringify(payload),
    token,
  });
}

export function updateInterest(id: string, notifyEnabled: boolean, token: string) {
  return apiFetch<UserInterestDto>(API_PATHS.interests.byId(id), {
    method: 'PATCH',
    body: JSON.stringify({ notifyEnabled }),
    token,
  });
}

export function deleteInterest(id: string, token: string) {
  return apiFetch<void>(API_PATHS.interests.byId(id), { method: 'DELETE', token });
}
