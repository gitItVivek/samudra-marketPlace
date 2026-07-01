import { apiFetch } from '@/api/client';
import { getStoredAccessToken } from '@/api/authToken';
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

function resolveToken(token?: string | null): string {
  const resolved = token ?? getStoredAccessToken();
  if (!resolved) {
    throw new Error('Not signed in');
  }
  return resolved;
}

export function listMyInterests(token?: string | null) {
  return apiFetch<UserInterestDto[]>(API_PATHS.interests.base, {
    token: resolveToken(token),
  });
}

export function createInterest(payload: CreateUserInterestPayload, token?: string | null) {
  return apiFetch<UserInterestDto>(API_PATHS.interests.base, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: resolveToken(token),
  });
}

export function updateInterest(id: string, notifyEnabled: boolean, token?: string | null) {
  return apiFetch<UserInterestDto>(API_PATHS.interests.byId(id), {
    method: 'PATCH',
    body: JSON.stringify({ notifyEnabled }),
    token: resolveToken(token),
  });
}

export function deleteInterest(id: string, token?: string | null) {
  return apiFetch<void>(API_PATHS.interests.byId(id), {
    method: 'DELETE',
    token: resolveToken(token),
  });
}
