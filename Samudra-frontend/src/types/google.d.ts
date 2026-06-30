export {};

declare global {
  interface CredentialResponse {
    credential?: string;
    select_by?: string;
  }

  interface GoogleAccountsId {
    initialize(config: {
      client_id: string;
      callback: (response: CredentialResponse) => void;
      auto_select?: boolean;
      cancel_on_tap_outside?: boolean;
    }): void;
    renderButton(
      parent: HTMLElement,
      options: {
        type?: 'standard' | 'icon';
        theme?: 'outline' | 'filled_blue' | 'filled_black';
        size?: 'large' | 'medium' | 'small';
        text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
        shape?: 'rectangular' | 'pill' | 'circle' | 'square';
        width?: number;
        logo_alignment?: 'left' | 'center';
      },
    ): void;
    prompt(): void;
  }

  interface GoogleAccounts {
    id: GoogleAccountsId;
  }

  interface GoogleNamespace {
    accounts: GoogleAccounts;
  }

  const google: GoogleNamespace;
}
