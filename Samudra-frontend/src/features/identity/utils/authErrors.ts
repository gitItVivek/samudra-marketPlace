import { ApiError } from '@/api/client';

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    switch (error.code) {
      case 'INVALID_CREDENTIALS':
        return 'Email or password is incorrect.';
      case 'EMAIL_ALREADY_EXISTS':
        return 'An account with this email already exists.';
      case 'INVALID_GOOGLE_TOKEN':
        return 'Google sign-in failed. Please try again.';
      case 'OTP_INVALID':
        return 'That code is incorrect. Check your email and try again.';
      case 'OTP_EXPIRED':
        return 'This code has expired. Request a new one.';
      case 'OTP_RATE_LIMIT':
        return 'Too many attempts. Wait a minute and try again.';
      case 'ALREADY_VERIFIED':
        return 'Your email is already verified.';
      default:
        return error.message || fallback;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}
