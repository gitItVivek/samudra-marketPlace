import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, User, Plus, Users } from 'lucide-react';
import styles from './BottomNav.module.css';

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to="/home" className={`${styles.item} ${pathname === '/home' ? styles.active : ''}`}>
        <Home size={22} />
        <span>Home</span>
      </Link>
      <Link
        to="/communities"
        className={`${styles.item} ${pathname.startsWith('/communities') ? styles.active : ''}`}
      >
        <Users size={22} />
        <span>Groups</span>
      </Link>
      <Link to="/sell" className={styles.fab}>
        <Plus size={28} strokeWidth={2.5} />
      </Link>
      <Link
        to="/chats"
        className={`${styles.item} ${pathname.startsWith('/chats') ? styles.active : ''}`}
      >
        <MessageCircle size={22} />
        <span>Chats</span>
      </Link>
      <Link to="/me" className={`${styles.item} ${pathname === '/me' ? styles.active : ''}`}>
        <User size={22} />
        <span>Profile</span>
      </Link>
    </nav>
  );
}
