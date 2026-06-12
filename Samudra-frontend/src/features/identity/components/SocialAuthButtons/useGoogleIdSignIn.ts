import { useCallback, useEffect, useRef } from 'react';

const SCRIPT_ID = 'google-gsi-client';

function loadGoogleScript(): Promise<void> {
  if (document.getElementById(SCRIPT_ID)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google sign-in'));
    document.head.appendChild(script);
  });
}

export function useGoogleIdSignIn(onCredential: (idToken: string) => void) {
  const hiddenHostRef = useRef<HTMLDivElement>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
  const onCredentialRef = useRef(onCredential);
  onCredentialRef.current = onCredential;

  useEffect(() => {
    if (!clientId || !hiddenHostRef.current) return;

    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled || !hiddenHostRef.current) return;
        hiddenHostRef.current.innerHTML = '';
        google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (response.credential) {
              onCredentialRef.current(response.credential);
            }
          },
        });
        google.accounts.id.renderButton(hiddenHostRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          width: 320,
        });
      })
      .catch(() => {
        /* custom buttons still render; click handler surfaces errors */
      });

    return () => {
      cancelled = true;
    };
  }, [clientId]);

  const triggerGoogleSignIn = useCallback(async (): Promise<string | null> => {
    if (!clientId) {
      return 'Google sign-in is not configured yet. Add VITE_GOOGLE_CLIENT_ID to .env and restart the dev server.';
    }
    try {
      await loadGoogleScript();
      google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response.credential) {
            onCredentialRef.current(response.credential);
          }
        },
      });
      const host = hiddenHostRef.current;
      const nativeBtn = host?.querySelector<HTMLElement>('[role="button"], div[tabindex="0"]');
      if (nativeBtn) {
        nativeBtn.click();
        return null;
      }
      google.accounts.id.prompt();
      return null;
    } catch {
      return 'Could not start Google sign-in. Check your connection and try again.';
    }
  }, [clientId]);

  return { hiddenHostRef, triggerGoogleSignIn, isGoogleConfigured: Boolean(clientId) };
}
