import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'icon';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  fullWidth,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
