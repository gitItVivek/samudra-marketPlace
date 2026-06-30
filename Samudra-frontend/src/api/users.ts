import { apiFetch } from '@/api/client';
import { API_PATHS } from '@/api/paths';

export interface MarketplaceProfileDto {
  userId: string;
  displayName: string;
  bio: string | null;
  city: string | null;
  state: string | null;
  avatarUrl: string | null;
  totalListings: number;
  setupComplete: boolean;
}

export interface UpdateMarketplaceProfilePayload {
  bio?: string;
  city?: string;
  state?: string;
  avatarUrl?: string;
}

export function getMyMarketplaceProfile(token: string) {
  return apiFetch<MarketplaceProfileDto>(API_PATHS.users.myMarketplaceProfile, { token });
}

export function updateMyMarketplaceProfile(
  payload: UpdateMarketplaceProfilePayload,
  token: string,
) {
  return apiFetch<MarketplaceProfileDto>(API_PATHS.users.myMarketplaceProfile, {
    method: 'PUT',
    body: JSON.stringify(payload),
    token,
  });
}

export function getPublicMarketplaceProfile(userId: string) {
  return apiFetch<MarketplaceProfileDto>(API_PATHS.users.publicMarketplaceProfile(userId));
}
