import { Outlet } from 'react-router-dom';
import { AuthMarketingPanel } from '@/features/identity/components/AuthMarketingPanel/AuthMarketingPanel';
import styles from './AuthLayout.module.css';

export function AuthLayout() {
  return (
    <div className={styles.page}>
      <div className={styles.marketing}>
        <AuthMarketingPanel />
      </div>
      <div className={styles.formPanel}>
        <div className={styles.mobileBrand}>
          <AuthMarketingPanel compact />
        </div>
        <div className={styles.formInner}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
