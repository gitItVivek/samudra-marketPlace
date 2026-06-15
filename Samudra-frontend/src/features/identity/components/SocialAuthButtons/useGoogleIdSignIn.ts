import { useCallback, useEffect } from 'react';

const SCRIPT_ID = 'google-gsi-client';
const HIDDEN_HOST_ID = 'google-gsi-hidden-host';

/** One GSI init for the whole app — avoids "initialize() called multiple times". */
let gsiInitialized = false;
let buttonReadyPromise: Promise<void> | null = null;
const credentialHandler = { current: (_token: string) => {} };

function getOrCreateHiddenHost(): HTMLDivElement {
    let host = document.getElementById(HIDDEN_HOST_ID) as HTMLDivElement | null;
    if (!host) {
        host = document.createElement('div');
        host.id = HIDDEN_HOST_ID;
        host.setAttribute('aria-hidden', 'true');
        host.style.cssText =
            'position:fixed;left:-9999px;top:0;width:320px;height:48px;overflow:hidden';
        document.body.appendChild(host);
    }
    return host;
}

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

function findNativeGoogleButton(host: HTMLElement): HTMLElement | null {
    return host.querySelector<HTMLElement>('[role="button"], div[tabindex="0"]');
}

async function waitForNativeButton(host: HTMLElement, maxMs = 3000): Promise<HTMLElement> {
    const start = Date.now();
    while (Date.now() - start < maxMs) {
        const btn = findNativeGoogleButton(host);
        if (btn) return btn;
        await new Promise((resolve) => setTimeout(resolve, 50));
    }
    throw new Error('Google button not ready');
}

function ensureGoogleButtonReady(clientId: string): Promise<void> {
    if (!buttonReadyPromise) {
        buttonReadyPromise = loadGoogleScript()
            .then(() => {
                initializeGoogleOnce(clientId);
                const host = getOrCreateHiddenHost();
                host.innerHTML = '';
                google.accounts.id.renderButton(host, {
                    type: 'standard',
                    theme: 'outline',
                    size: 'large',
                    text: 'continue_with',
                    width: 320,
                });
            })
            .then(() => waitForNativeButton(getOrCreateHiddenHost()))
            .then(() => {})
            .catch((err) => {
                buttonReadyPromise = null;
                throw err;
            });
    }
    return buttonReadyPromise;
}

export function useGoogleIdSignIn(onCredential: (idToken: string) => void) {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

    credentialHandler.current = onCredential;

    useEffect(() => {
        if (!clientId) return;
        void ensureGoogleButtonReady(clientId);
    }, [clientId]);

    const triggerGoogleSignIn = useCallback(async (): Promise<string | null> => {
        if (!clientId) {
            return 'Add VITE_GOOGLE_CLIENT_ID to .env and restart npm run dev.';
        }
        try {
            await ensureGoogleButtonReady(clientId);
            const nativeBtn = await waitForNativeButton(getOrCreateHiddenHost(), 500);
            nativeBtn.click();
            return null;
        } catch {
            return 'Could not load Google sign-in.';
        }
    }, [clientId]);

    return { triggerGoogleSignIn };
}
