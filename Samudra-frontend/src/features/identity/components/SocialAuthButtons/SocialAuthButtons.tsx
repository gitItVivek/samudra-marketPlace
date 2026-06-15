import { SOCIAL_ICONS } from '@/features/identity/constants/socialAssets';
import { useGoogleIdSignIn } from '@/features/identity/components/SocialAuthButtons/useGoogleIdSignIn';
import styles from './SocialAuthButtons.module.css';

interface SocialAuthButtonsProps {
  onGoogleCredential: (idToken: string) => void;
  disabled?: boolean;
  onError?: (message: string) => void;
}

export function SocialAuthButtons({
  onGoogleCredential,
  disabled,
  onError,
}: SocialAuthButtonsProps) {
  const { triggerGoogleSignIn } = useGoogleIdSignIn(onGoogleCredential);

  const handleGoogle = async () => {
    if (disabled) return;
    const error = await triggerGoogleSignIn();
    if (error) {
      onError?.(error);
    }
  };

  const handleFacebook = () => {
    if (disabled) return;
    onError?.('Facebook sign-in is coming soon.');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.socialBtn}
          onClick={() => void handleGoogle()}
          disabled={disabled}
          aria-label="Continue with Google"
        >
          <img src={SOCIAL_ICONS.google} alt="" className={styles.icon} />
          <span>Google</span>
        </button>
        <button
          type="button"
          className={styles.socialBtn}
          onClick={handleFacebook}
          disabled={disabled}
          aria-label="Continue with Facebook"
        >
          <img src={SOCIAL_ICONS.facebook} alt="" className={styles.icon} />
          <span>Facebook</span>
        </button>
      </div>
    </div>
  );
}
