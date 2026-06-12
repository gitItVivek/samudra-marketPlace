/**
 * Backend path map — adjust here when wiring the API.
 * Base URL comes from VITE_API_BASE_URL in .env.
 */
export const API_PATHS = {
  auth: {
    register: '/v1/auth/register',
    login: '/v1/auth/login',
    logout: '/v1/auth/logout',
    googleOAuth: '/v1/auth/oauth/google',
    verifyEmailSend: '/v1/auth/verification/email/send',
    verifyEmailConfirm: '/v1/auth/verification/email/confirm',
    verifyStatus: '/v1/auth/verification/status',
  },
} as const;
