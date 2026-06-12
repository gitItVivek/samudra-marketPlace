import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '@/shared/components/BottomNav/BottomNav';
import { DesktopNav } from '@/shared/components/DesktopNav/DesktopNav';
import styles from './MainLayout.module.css';

const NAV_ROUTES = ['/home', '/browse', '/me'];

export function MainLayout() {
  const { pathname } = useLocation();
  const isChatThread = pathname.startsWith('/chats/') && pathname !== '/chats';
  const showBottomNav =
    !isChatThread &&
    (NAV_ROUTES.includes(pathname) ||
      pathname === '/communities' ||
      (pathname.startsWith('/communities/') && !pathname.includes('/create')) ||
      pathname === '/chats');
  const listingDetail = pathname.startsWith('/listings/');
  const isDesktopFooterPage = listingDetail;

  return (
    <div className={styles.layout}>
      <div className={styles.shell}>
        <DesktopNav />
        <main
          className={`${styles.main} ${!showBottomNav ? styles.mainNoNav : ''} ${isDesktopFooterPage ? styles.mainWithFooter : ''}`}
        >
          <Outlet />
        </main>
        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
}
