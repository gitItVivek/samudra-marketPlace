import { BrowserRouter } from 'react-router-dom';
import { FeedViewProvider } from '@/app/FeedViewContext';
import { AuthProvider } from '@/features/identity/context/AuthContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FeedViewProvider>{children}</FeedViewProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
