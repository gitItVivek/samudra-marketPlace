import { apiFetch } from '@/api/client';
import { resolveAuthToken } from '@/api/authToken';
import { API_PATHS } from '@/api/paths';

export interface ListingAlertNotificationDto {
  id: string;
  listingId: string;
  listingTitle: string;
  listingCity: string;
  deliveredAt: string;
}

export function listMyNotifications(token?: string | null) {
  const resolvedToken = resolveAuthToken(token);
  if (!resolvedToken) {
    return Promise.resolve([] as ListingAlertNotificationDto[]);
  }
  return apiFetch<ListingAlertNotificationDto[]>(API_PATHS.notifications.base, {
    token: resolvedToken,
  });
}
