import { Link } from 'react-router-dom';
import { publicProfilePath, ROUTES } from '@/app/paths';
import { LogOut, MailWarning, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/features/identity/context/AuthContext';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { Button } from '@/shared/components/Button/Button';
import styles from './MyAccountPage.module.css';

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function MyAccountPage() {
  const { isAuthenticated, isLoading, user, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.page}>
        <p className={styles.muted}>Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className={styles.page}>
        <div className={styles.guestCard}>
          <h1>Your account</h1>
          <p className={styles.muted}>
            Sign in to post listings, message sellers, and manage your profile.
          </p>
          <Link to={ROUTES.auth}>
            <Button variant="primary" fullWidth>
              Sign in or register
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.profileCard}>
        <Avatar initials={initialsFromName(user.displayName)} size="lg" />
        <h1 className={styles.name}>{user.displayName}</h1>
        <p className={styles.email}>{user.email}</p>

        {user.isVerified ? (
          <span className={styles.verifiedBadge}>
            <ShieldCheck size={16} />
            Email verified
          </span>
        ) : (
          <Link to="/auth/verify-email" className={styles.verifyBanner}>
            <MailWarning size={18} />
            <span>
              Verify your email to unlock selling and messaging
            </span>
          </Link>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Account</h2>
        <Link to="/sell" className={styles.rowLink}>
          Post a listing
        </Link>
        <Link to="/chats" className={styles.rowLink}>
          Messages
        </Link>
        <Link to={publicProfilePath(user.id)} className={styles.rowLink}>
          Your public marketplace profile
        </Link>
      </div>

      <Button variant="outline" fullWidth onClick={() => void signOut()}>
        <LogOut size={18} />
        Sign out
      </Button>
    </div>
  );
}
