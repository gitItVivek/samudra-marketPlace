import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, List, LogOut, Settings, User } from 'lucide-react';
import { ROUTES } from '@/app/paths';
import { useAuth } from '@/features/identity/context/AuthContext';
import styles from './ProfileMenu.module.css';

export function ProfileMenu() {
  const menuId = useId();
  const { user, isAuthenticated, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <User size={22} strokeWidth={2} />
      </button>

      {open && (
        <div id={menuId} className={styles.menu} role="menu">
          {!isAuthenticated || !user ? (
            <div className={styles.guestPanel}>
              <p className={styles.guestTitle}>Welcome to Samudra</p>
              <p className={styles.guestHint}>Sign in to list, message, and manage your profile.</p>
              <Link
                to={ROUTES.authRegister}
                className={styles.primaryAction}
                role="menuitem"
                onClick={close}
              >
                Sign up
              </Link>
              <Link
                to={ROUTES.authLogin}
                className={styles.secondaryAction}
                role="menuitem"
                onClick={close}
              >
                Log in
              </Link>
            </div>
          ) : (
            <ul className={styles.menuList}>
              <li>
                <Link to="/me" className={styles.menuItem} role="menuitem" onClick={close}>
                  <User size={18} />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/me/listings" className={styles.menuItem} role="menuitem" onClick={close}>
                  <List size={18} />
                  Your listings
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    to={`/profiles/${user.id}`}
                    className={styles.menuItem}
                    role="menuitem"
                    onClick={close}
                  >
                    <User size={18} />
                    Public profile
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/me/notifications"
                  className={styles.menuItem}
                  role="menuitem"
                  onClick={close}
                >
                  <Bell size={18} />
                  Notifications
                </Link>
              </li>
              <li>
                <Link to="/me/settings" className={styles.menuItem} role="menuitem" onClick={close}>
                  <Settings size={18} />
                  Settings
                </Link>
              </li>
              <li className={styles.divider} />
              <li>
                <button
                  type="button"
                  className={`${styles.menuItem} ${styles.signOut}`}
                  role="menuitem"
                  onClick={() => {
                    close();
                    void signOut();
                  }}
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
