import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import * as authApi from '@/api/auth';
import { AuthCard } from '@/features/identity/components/AuthCard/AuthCard';
import { AuthAlert } from '@/features/identity/components/AuthAlert/AuthAlert';
import { AuthDivider } from '@/features/identity/components/AuthDivider/AuthDivider';
import { FormField } from '@/features/identity/components/FormField/FormField';
import { TextInput } from '@/features/identity/components/FormField/TextInput';
import { SocialAuthButtons } from '@/features/identity/components/SocialAuthButtons/SocialAuthButtons';
import { useAuth } from '@/features/identity/context/AuthContext';
import { getAuthErrorMessage } from '@/features/identity/utils/authErrors';
import { Button } from '@/shared/components/Button/Button';
import styles from './AuthWelcomePage.module.css';

export function AuthWelcomePage() {
  const navigate = useNavigate();
  const { completeSignIn } = useAuth();
  const [optionalPassword, setOptionalPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleCredential = useCallback(
    async (idToken: string) => {
      setError(null);
      setLoading(true);
      try {
        const payload: { idToken: string; password?: string } = { idToken };
        if (optionalPassword.trim().length >= 8) {
          payload.password = optionalPassword;
        }
        const response = await authApi.loginWithGoogle(payload);
        completeSignIn(response);
      } catch (err) {
        setError(getAuthErrorMessage(err, 'Google sign-in failed.'));
      } finally {
        setLoading(false);
      }
    },
    [completeSignIn, optionalPassword],
  );

  return (
    <AuthCard
      title="Welcome to Samudra"
      subtitle="Buy and sell in your community — sign in to get started."
      footer={
        <>
          New here? <Link to="/auth/register">Create an account</Link>
        </>
      }
    >
      {error && <AuthAlert message={error} />}

      <SocialAuthButtons
        onGoogleCredential={handleGoogleCredential}
        disabled={loading}
        onError={setError}
      />

      <FormField
        label="Optional password (new Google users)"
        htmlFor="google-password"
        hint="Skip for Google-only sign-in, or set 8+ characters to also sign in with email later."
      >
        <TextInput
          id="google-password"
          type="password"
          autoComplete="new-password"
          placeholder="Optional"
          value={optionalPassword}
          onChange={(e) => setOptionalPassword(e.target.value)}
          disabled={loading}
        />
      </FormField>

      <AuthDivider />

      <div className={styles.emailActions}>
        <Button
          variant="outline"
          fullWidth
          disabled={loading}
          onClick={() => navigate('/auth/login')}
        >
          <Mail size={18} />
          Continue with email
        </Button>
      </div>

      <p className={styles.terms}>
        By continuing, you agree to our community guidelines and terms of use.
      </p>
    </AuthCard>
  );
}
