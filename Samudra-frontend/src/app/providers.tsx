import { BrowserRouter } from 'react-router-dom';
import { FeedViewProvider } from '@/app/FeedViewContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <FeedViewProvider>{children}</FeedViewProvider>
    </BrowserRouter>
  );
}
