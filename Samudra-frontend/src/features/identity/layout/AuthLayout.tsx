import { AuthMarketingPanel } from '@/features/identity/components/AuthMarketingPanel/AuthMarketingPanel';
import { AuthGuestOnly } from '@/features/identity/components/AuthGuestOnly/AuthGuestOnly';
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
          <AuthGuestOnly />
        </div>
      </div>
    </div>
  );
}
