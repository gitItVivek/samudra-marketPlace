import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/paths';
import { useAuth } from '@/features/identity/context/AuthContext';
import { defaultListingsPath } from '@/shared/utils/defaultRoute';
import { BrandLogo } from '@/shared/components/BrandLogo/BrandLogo';
import styles from './LandingHeader.module.css';

export function LandingHeader() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <BrandLogo size="sm" linkTo={ROUTES.landing} />

        <nav className={styles.nav} aria-label="Landing sections">
          <a href="#why" className={styles.navLink}>
            Why Samudra
          </a>
          <a href="#features" className={styles.navLink}>
            Features
          </a>
          <a href="#communities" className={styles.navLink}>
            Communities
          </a>
          <a href="#cities" className={styles.navLink}>
            Cities
          </a>
        </nav>

        <div className={styles.actions}>
          {!isLoading && isAuthenticated ? (
            <Link to={defaultListingsPath()} className={styles.signUpLink}>
              Go to listings
            </Link>
          ) : (
            <>
              <Link to={ROUTES.authLogin} className={styles.loginLink}>
                Log in
              </Link>
              <Link to={ROUTES.authRegister} className={styles.signUpLink}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
