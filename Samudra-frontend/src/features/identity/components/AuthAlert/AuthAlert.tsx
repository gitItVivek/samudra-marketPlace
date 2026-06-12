import { AlertCircle } from 'lucide-react';
import styles from './AuthAlert.module.css';

interface AuthAlertProps {
  message: string;
}

export function AuthAlert({ message }: AuthAlertProps) {
  return (
    <div className={styles.alert} role="alert">
      <AlertCircle size={18} />
      <span>{message}</span>
    </div>
  );
}
