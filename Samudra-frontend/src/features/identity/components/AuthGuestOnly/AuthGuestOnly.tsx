import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '@/app/paths';
import { useAuth } from '@/features/identity/context/AuthContext';
import { defaultListingsPath } from '@/shared/utils/defaultRoute';

/**
 * Blocks auth screens (login, register, welcome) for signed-in users.
 * Verify-email is allowed while authenticated but unverified.
 */
export function AuthGuestOnly() {
  const { isAuthenticated, isLoading } = useAuth();
  const { pathname } = useLocation();
  const isVerifyEmail = pathname === ROUTES.authVerifyEmail;

  if (isLoading) {
    return null;
  }

  if (isVerifyEmail) {
    return <Outlet />;
  }

  if (isAuthenticated) {
    return <Navigate to={defaultListingsPath()} replace />;
  }

  return <Outlet />;
}
