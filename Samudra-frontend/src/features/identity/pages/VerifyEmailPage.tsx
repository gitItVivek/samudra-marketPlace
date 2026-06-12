import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '@/app/paths';
import { MailCheck } from 'lucide-react';
import * as authApi from '@/api/auth';
import { AuthCard } from '@/features/identity/components/AuthCard/AuthCard';
import { AuthAlert } from '@/features/identity/components/AuthAlert/AuthAlert';
import { OtpInput } from '@/features/identity/components/OtpInput/OtpInput';
import { useAuth } from '@/features/identity/context/AuthContext';
import { getAuthErrorMessage } from '@/features/identity/utils/authErrors';
import { Button } from '@/shared/components/Button/Button';
import styles from './VerifyEmailPage.module.css';

const RESEND_COOLDOWN_SEC = 60;

export function VerifyEmailPage() {
  const { accessToken, user, refreshUser } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  if (!accessToken || !user) {
    return <Navigate to={ROUTES.authLogin} replace />;
  }

  if (user.isVerified) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const sendCode = async () => {
    setError(null);
    setInfo(null);
    setSending(true);
    try {
      await authApi.sendEmailVerificationOtp(accessToken);
      setInfo('Verification code sent. Check your inbox.');
      setCooldown(RESEND_COOLDOWN_SEC);
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Could not send verification code.'));
    } finally {
      setSending(false);
    }
  };

  const confirmCode = async () => {
    if (code.length !== 6) {
      setError('Enter the 6-digit code from your email.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const status = await authApi.confirmEmailVerification(accessToken, { code });
      refreshUser({ isVerified: status.isVerified });
      setInfo('Email verified! Redirecting…');
      window.setTimeout(() => {
        window.location.assign(ROUTES.home);
      }, 800);
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Could not verify code.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Verify your email"
      subtitle={`We sent a 6-digit code to ${user.email}`}
      footer={
        <Link to={ROUTES.home}>Skip for now — browse as guest</Link>
      }
    >
      <div className={styles.iconWrap}>
        <MailCheck size={28} />
      </div>

      {error && <AuthAlert message={error} />}
      {info && <p className={styles.info}>{info}</p>}

      <OtpInput value={code} onChange={setCode} disabled={loading} />

      <Button
        type="button"
        variant="primary"
        fullWidth
        disabled={loading || code.length !== 6}
        onClick={confirmCode}
      >
        {loading ? 'Verifying…' : 'Confirm code'}
      </Button>

      <Button
        type="button"
        variant="outline"
        fullWidth
        disabled={sending || cooldown > 0}
        onClick={sendCode}
      >
        {cooldown > 0
          ? `Resend code in ${cooldown}s`
          : sending
            ? 'Sending…'
            : 'Send verification code'}
      </Button>
    </AuthCard>
  );
}
