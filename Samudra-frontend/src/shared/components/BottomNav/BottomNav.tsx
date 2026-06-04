import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageCircle, User, Plus } from 'lucide-react';
import styles from './BottomNav.module.css';

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={`${styles.item} ${pathname === '/' ? styles.active : ''}`}>
        <Home size={22} />
        <span>Home</span>
      </Link>
      <Link to="/browse" className={`${styles.item} ${pathname === '/browse' ? styles.active : ''}`}>
        <Search size={22} />
        <span>Browse</span>
      </Link>
      <Link to="/sell" className={styles.fab}>
        <Plus size={28} strokeWidth={2.5} />
      </Link>
      <Link to="/chats/demo" className={`${styles.item} ${pathname.startsWith('/chats') ? styles.active : ''}`}>
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
