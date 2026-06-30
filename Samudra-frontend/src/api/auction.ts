import { apiFetch } from '@/api/client';
import { API_PATHS } from '@/api/paths';
import type { AuctionAlertDto, BidAnalyticsDto, BidDto } from '@/shared/types/api';

export function placeBid(listingId: string, amount: number, token: string) {
  return apiFetch<BidDto>(API_PATHS.listings.bids(listingId), {
    method: 'POST',
    body: JSON.stringify({ amount }),
    token,
  });
}

export function getBidHistory(listingId: string, token: string) {
  return apiFetch<BidDto[]>(API_PATHS.listings.bids(listingId), { token });
}

export function getBidAnalytics(listingId: string, token: string) {
  return apiFetch<BidAnalyticsDto>(API_PATHS.listings.bidAnalytics(listingId), { token });
}

export function markBidsSeen(listingId: string, token: string) {
  return apiFetch<void>(API_PATHS.listings.markBidsSeen(listingId), {
    method: 'POST',
    token,
  });
}

export function getAuctionAlerts(token: string) {
  return apiFetch<AuctionAlertDto[]>(API_PATHS.users.auctionAlerts, { token });
}
