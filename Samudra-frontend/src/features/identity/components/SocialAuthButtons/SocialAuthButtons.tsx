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
  const { googleHostRef } = useGoogleIdSignIn(onGoogleCredential);

  const handleFacebook = () => {
    if (disabled) return;
    onError?.('Facebook sign-in is coming soon.');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <div className={styles.googleBtnWrap}>
          <button
            type="button"
            className={styles.socialBtn}
            tabIndex={-1}
            aria-hidden="true"
            disabled
          >
            <img src={SOCIAL_ICONS.google} alt="" className={styles.icon} />
            <span>Google</span>
          </button>
          <div
            ref={googleHostRef}
            className={styles.googleOverlay}
            aria-label="Continue with Google"
            data-disabled={disabled ? 'true' : 'false'}
          />
        </div>
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
