import { ACCESS_TOKEN_STORAGE_KEY } from '@/api/sessionKeys';

/** JWT from localStorage — use when AuthContext token may be unset on first paint. */
export function getStoredAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

/** Prefer React context token; fall back to localStorage (matches interests API). */
export function resolveAuthToken(token?: string | null): string | null {
  return token ?? getStoredAccessToken();
}
