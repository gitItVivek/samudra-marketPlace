import styles from './Avatar.module.css';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
}

export function Avatar({ initials, size = 'md', online }: AvatarProps) {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      <span className={styles.avatar}>{initials}</span>
      {online && <span className={styles.online} aria-label="Online" />}
    </div>
  );
}
