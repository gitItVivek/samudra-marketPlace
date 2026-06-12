import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
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
import styles from './RegisterPage.module.css';

export function RegisterPage() {
  const { completeSignIn } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (displayName.trim().length < 2) {
      setError('Display name must be at least 2 characters.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await authApi.registerWithEmail({
        email: email.trim(),
        password,
        displayName: displayName.trim(),
      });
      completeSignIn(response);
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Could not create account.'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async (idToken: string) => {
    setError(null);
    setLoading(true);
    try {
      const payload: { idToken: string; password?: string } = { idToken };
      if (password.length >= 8) {
        payload.password = password;
      }
      const response = await authApi.loginWithGoogle(payload);
      completeSignIn(response);
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Google sign-in failed.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create account"
      subtitle="Join your local marketplace in a few steps."
      footer={
        <>
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </>
      }
    >
      {error && <AuthAlert message={error} />}

      <SocialAuthButtons
        onGoogleCredential={handleGoogle}
        disabled={loading}
        onError={setError}
      />
      <AuthDivider />

      <form className={styles.form} onSubmit={handleSubmit}>
        <FormField label="Display name" htmlFor="register-name">
          <TextInput
            id="register-name"
            autoComplete="name"
            required
            minLength={2}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={loading}
          />
        </FormField>

        <FormField label="Email" htmlFor="register-email">
          <TextInput
            id="register-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="register-password"
          hint="At least 8 characters. Also used if you link Google below."
        >
          <TextInput
            id="register-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </FormField>

        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthCard>
  );
}
