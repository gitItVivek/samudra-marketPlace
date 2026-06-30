/** App route constants — update links here when paths change. */
export function citySlugFromName(city: string): string {
  return city.trim().toLowerCase().replace(/\s+/g, '-');
}

export function cityNameFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function cityListingsPath(city: string): string {
  return `/${citySlugFromName(city)}/listings`;
}

export const ROUTES = {
  landing: '/',
  /** @deprecated use cityListingsPath(city) */
  home: '/delhi/listings',
  auth: '/auth',
  authLogin: '/auth/login',
  authRegister: '/auth/register',
  authVerifyEmail: '/auth/verify-email',
  me: '/me',
  sell: '/sell',
  communities: '/communities',
} as const;

export function publicProfilePath(userId: string): string {
  return `/profiles/${userId}`;
}
