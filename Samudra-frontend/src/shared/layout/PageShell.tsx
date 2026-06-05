import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Share2, Phone } from 'lucide-react';
import styles from './PageShell.module.css';

interface PageShellProps {
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
  rightActions?: 'menu' | 'share-menu' | 'call-menu' | 'none';
  headerAction?: React.ReactNode;
  customHeader?: React.ReactNode;
  stickyFooter?: React.ReactNode;
  hideStickyFooterOnDesktop?: boolean;
  noPadding?: boolean;
}

export function PageShell({
  title,
  children,
  onBack,
  rightActions = 'menu',
  headerAction,
  customHeader,
  stickyFooter,
  hideStickyFooterOnDesktop,
  noPadding,
}: PageShellProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <div
      className={`${styles.page} ${hideStickyFooterOnDesktop ? styles.hideFooterDesktop : ''}`}
    >
      {customHeader ?? (
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={handleBack} aria-label="Go back">
          <ArrowLeft size={22} />
        </button>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.right}>
          {headerAction}
          {rightActions === 'share-menu' && (
            <>
              <button type="button" className={styles.iconBtn} aria-label="Share">
                <Share2 size={20} />
              </button>
              <button type="button" className={styles.iconBtn} aria-label="More">
                <MoreVertical size={20} />
              </button>
            </>
          )}
          {rightActions === 'call-menu' && (
            <>
              <button type="button" className={styles.iconBtn} aria-label="Call">
                <Phone size={20} />
              </button>
              <button type="button" className={styles.iconBtn} aria-label="More">
                <MoreVertical size={20} />
              </button>
            </>
          )}
          {rightActions === 'menu' && (
            <button type="button" className={styles.iconBtn} aria-label="More">
              <MoreVertical size={20} />
            </button>
          )}
        </div>
      </header>
      )}
      <div className={`${styles.content} ${noPadding ? styles.noPadding : ''}`}>{children}</div>
      {stickyFooter && <footer className={styles.footer}>{stickyFooter}</footer>}
    </div>
  );
}
