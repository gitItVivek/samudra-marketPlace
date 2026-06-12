export interface UserSummary {
  id: string;
  email: string;
  displayName: string;
  isVerified: boolean;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
  user: UserSummary;
}

export interface VerificationStatusResponse {
  isVerified: boolean;
  email: string;
}

export interface ApiErrorBody {
  status: number;
  code: string;
  message: string;
  timestamp?: string;
}

export interface RegisterEmailPayload {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginEmailPayload {
  email: string;
  password: string;
}

export interface GoogleOAuthPayload {
  idToken: string;
  password?: string;
}

export interface ConfirmEmailPayload {
  code: string;
}
