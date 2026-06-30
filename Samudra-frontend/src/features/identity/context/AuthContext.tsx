import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/paths';
import { defaultListingsPath } from '@/shared/utils/defaultRoute';
import * as authApi from '@/api/auth';
import type { AuthResponse, UserSummary } from '@/shared/types/auth';

const TOKEN_KEY = 'samudra_access_token';
const USER_KEY = 'samudra_user';

interface AuthContextValue {
  user: UserSummary | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  completeSignIn: (response: AuthResponse, redirectTo?: string) => void;
  signOut: () => Promise<void>;
  refreshUser: (patch: Partial<UserSummary>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): UserSummary | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserSummary;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );
  const [user, setUser] = useState<UserSummary | null>(() => readStoredUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const persistSession = useCallback((response: AuthResponse) => {
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    setAccessToken(response.accessToken);
    setUser(response.user);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAccessToken(null);
    setUser(null);
  }, []);

  const completeSignIn = useCallback(
    (response: AuthResponse, redirectTo?: string) => {
      persistSession(response);
      if (redirectTo) {
        navigate(redirectTo, { replace: true });
        return;
      }
      if (!response.user.isVerified) {
        navigate(ROUTES.authVerifyEmail, { replace: true });
        return;
      }
      navigate(defaultListingsPath(), { replace: true });
    },
    [navigate, persistSession],
  );

  const signOut = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        await authApi.logout(token);
      } catch {
        /* still clear local session */
      }
    }
    clearSession();
    navigate(ROUTES.landing, { replace: true });
  }, [clearSession, navigate]);

  const refreshUser = useCallback((patch: Partial<UserSummary>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      localStorage.setItem(USER_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(accessToken && user),
      isLoading,
      completeSignIn,
      signOut,
      refreshUser,
    }),
    [user, accessToken, isLoading, completeSignIn, signOut, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
