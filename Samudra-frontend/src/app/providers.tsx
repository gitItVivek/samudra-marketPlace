import { BrowserRouter } from 'react-router-dom';
import { FeedViewProvider } from '@/app/FeedViewContext';
import { AuthProvider } from '@/features/identity/context/AuthContext';
import { BrowseFiltersProvider } from '@/shared/context/BrowseFiltersContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BrowseFiltersProvider>
          <FeedViewProvider>{children}</FeedViewProvider>
        </BrowseFiltersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
