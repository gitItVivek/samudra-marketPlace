import styles from './TextInput.module.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function TextInput({ hasError, className, ...props }: TextInputProps) {
  return (
    <input
      className={`${styles.input} ${hasError ? styles.inputError : ''} ${className ?? ''}`}
      {...props}
    />
  );
}
