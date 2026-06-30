import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type FeedViewMode = 'curated' | 'grid';

const STORAGE_KEY = 'samudra-feed-view';

interface FeedViewContextValue {
  mode: FeedViewMode;
  setMode: (mode: FeedViewMode) => void;
  toggleMode: () => void;
}

const FeedViewContext = createContext<FeedViewContextValue | null>(null);

function readStoredMode(): FeedViewMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'grid' || stored === 'curated') return stored;
  } catch {
    /* ignore */
  }
  return 'curated';
}

export function FeedViewProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<FeedViewMode>(readStoredMode);

  const setMode = useCallback((next: FeedViewMode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'curated' ? 'grid' : 'curated');
  }, [mode, setMode]);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, setMode, toggleMode],
  );

  return <FeedViewContext.Provider value={value}>{children}</FeedViewContext.Provider>;
}

export function useFeedView() {
  const ctx = useContext(FeedViewContext);
  if (!ctx) {
    throw new Error('useFeedView must be used within FeedViewProvider');
  }
  return ctx;
}
