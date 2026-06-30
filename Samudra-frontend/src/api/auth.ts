import { apiFetch } from '@/api/client';
import { API_PATHS } from '@/api/paths';
import type {
  AuthResponse,
  ConfirmEmailPayload,
  GoogleOAuthPayload,
  LoginEmailPayload,
  RegisterEmailPayload,
  VerificationStatusResponse,
} from '@/shared/types/auth';

export function registerWithEmail(payload: RegisterEmailPayload) {
  return apiFetch<AuthResponse>(API_PATHS.auth.register, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function loginWithEmail(payload: LoginEmailPayload) {
  return apiFetch<AuthResponse>(API_PATHS.auth.login, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function loginWithGoogle(payload: GoogleOAuthPayload) {
  return apiFetch<AuthResponse>(API_PATHS.auth.googleOAuth, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function logout(token: string) {
  return apiFetch<void>(API_PATHS.auth.logout, {
    method: 'POST',
    token,
  });
}

export function sendEmailVerificationOtp(token: string) {
  return apiFetch<void>(API_PATHS.auth.verifyEmailSend, {
    method: 'POST',
    token,
  });
}

export function confirmEmailVerification(token: string, payload: ConfirmEmailPayload) {
  return apiFetch<VerificationStatusResponse>(API_PATHS.auth.verifyEmailConfirm, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export function getVerificationStatus(token: string) {
  return apiFetch<VerificationStatusResponse>(API_PATHS.auth.verifyStatus, {
    method: 'GET',
    token,
  });
}
