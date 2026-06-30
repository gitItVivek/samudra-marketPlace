import { useEffect, useRef } from 'react';

const SCRIPT_ID = 'google-gsi-client';

/** One GSI init for the whole app — avoids "initialize() called multiple times". */
let gsiInitialized = false;
const credentialHandler = { current: (_token: string) => {} };

function loadGoogleScript(): Promise<void> {
    if (document.getElementById(SCRIPT_ID)) {
        return typeof google !== 'undefined'
            ? Promise.resolve()
            : new Promise((resolve) => {
                  const existing = document.getElementById(SCRIPT_ID);
                  existing?.addEventListener('load', () => resolve(), { once: true });
              });
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

function initializeGoogleOnce(clientId: string) {
    if (gsiInitialized) return;
    google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
            if (response.credential) {
                credentialHandler.current(response.credential);
            }
        },
    });
    gsiInitialized = true;
}

function renderGoogleButton(host: HTMLElement) {
    const width = Math.max(host.parentElement?.getBoundingClientRect().width ?? 0, 200);
    host.innerHTML = '';
    google.accounts.id.renderButton(host, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        width: Math.round(width),
    });
}

/**
 * Renders Google's native sign-in button in an invisible overlay on top of our custom UI.
 * The user clicks Google's real control (not a synthetic .click()), which is reliable across browsers.
 */
export function useGoogleIdSignIn(onCredential: (idToken: string) => void) {
    const googleHostRef = useRef<HTMLDivElement>(null);
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

    credentialHandler.current = onCredential;

    useEffect(() => {
        if (!clientId || !googleHostRef.current) return;

        let cancelled = false;

        const mountButton = async () => {
            await loadGoogleScript();
            if (cancelled || !googleHostRef.current) return;

            initializeGoogleOnce(clientId);

            // Wait one frame so the grid cell has a real width before renderButton.
            requestAnimationFrame(() => {
                if (cancelled || !googleHostRef.current) return;
                renderGoogleButton(googleHostRef.current);
            });
        };

        void mountButton().catch((err) => {
            console.error('Google sign-in failed to initialize', err);
        });

        return () => {
            cancelled = true;
        };
    }, [clientId]);

    return { googleHostRef, clientId };
}
