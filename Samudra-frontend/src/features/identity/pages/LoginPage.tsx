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
import styles from './LoginPage.module.css';

export function LoginPage() {
  const { completeSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await authApi.loginWithEmail({ email: email.trim(), password });
      completeSignIn(response);
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Could not sign in.'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async (idToken: string) => {
    setError(null);
    setLoading(true);
    try {
      const response = await authApi.loginWithGoogle({ idToken });
      completeSignIn(response);
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Google sign-in failed.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Sign in"
      subtitle="Welcome back — enter your email and password."
      footer={
        <>
          No account? <Link to="/auth/register">Register</Link>
          {' · '}
          <Link to="/auth">Other options</Link>
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
        <FormField label="Email" htmlFor="login-email">
          <TextInput
            id="login-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </FormField>

        <FormField label="Password" htmlFor="login-password">
          <TextInput
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </FormField>

        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthCard>
  );
}
