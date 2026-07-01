/**
 * Backend path map — adjust here when wiring the API.
 */
export const API_PATHS = {
  auth: {
    register: '/v1/auth/register',
    login: '/v1/auth/login',
    logout: '/v1/auth/logout',
    googleOAuth: '/v1/auth/oauth/google',
    verifyEmailSend: '/v1/auth/verification/email/send',
    verifyEmailConfirm: '/v1/auth/verification/email/confirm',
    verifyStatus: '/v1/auth/verification/status',
  },
  users: {
    me: '/v1/users/me',
    myListings: '/v1/users/me/listings',
    myMarketplaceProfile: '/v1/users/me/marketplace-profile',
    publicMarketplaceProfile: (userId: string) => `/v1/users/${userId}/marketplace-profile`,
    auctionAlerts: '/v1/users/me/auction-alerts',
  },
  listings: {
    base: '/v1/listings',
    search: '/v1/search/listings',
    byId: (id: string) => `/v1/listings/${id}`,
    bids: (id: string) => `/v1/listings/${id}/bids`,
    bidAnalytics: (id: string) => `/v1/listings/${id}/bids/analytics`,
    markBidsSeen: (id: string) => `/v1/listings/${id}/bids/mark-seen`,
  },
  interests: {
    base: '/v1/me/interests',
    byId: (id: string) => `/v1/me/interests/${id}`,
  },
  notifications: {
    base: '/v1/me/notifications',
  },
  communities: {
    base: '/v1/communities',
    bySlug: (slug: string) => `/v1/communities/${slug}`,
    join: (id: string) => `/v1/communities/${id}/join`,
    members: (id: string) => `/v1/communities/${id}/members`,
    listings: (id: string) => `/v1/communities/${id}/listings`,
  },
} as const;
