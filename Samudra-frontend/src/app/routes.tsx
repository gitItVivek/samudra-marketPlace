import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/shared/layout/MainLayout';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { AuthLayout } from '@/features/identity/layout/AuthLayout';
import { AuthWelcomePage } from '@/features/identity/pages/AuthWelcomePage';
import { LoginPage } from '@/features/identity/pages/LoginPage';
import { RegisterPage } from '@/features/identity/pages/RegisterPage';
import { VerifyEmailPage } from '@/features/identity/pages/VerifyEmailPage';
import { CityListingsPage, HomeRedirectPage } from '@/features/home/pages/CityListingsPage';
import { ListingDetailPage } from '@/features/listing/pages/ListingDetailPage';
import { EditListingPage } from '@/features/listing/pages/EditListingPage';
import { PostListingPage } from '@/features/listing/pages/PostListingPage';
import { ChatPage } from '@/features/messaging/pages/ChatPage';
import { SellerProfilePage } from '@/features/identity/pages/SellerProfilePage';
import { BrowseDiscoverPage } from '@/features/browse/pages/BrowseDiscoverPage';
import { ChatInboxPage } from '@/features/messaging/pages/ChatInboxPage';
import { CreateCommunityPage } from '@/features/community/pages/CreateCommunityPage';
import { MyAccountPage } from '@/features/profile/pages/MyAccountPage';
import { MyListingsPlaceholderPage } from '@/features/profile/pages/MyListingsPlaceholderPage';
import { SettingsPlaceholderPage } from '@/features/profile/pages/SettingsPlaceholderPage';
import { NotificationsPage } from '@/features/profile/pages/NotificationsPage';
import { CommunitiesPage } from '@/features/community/pages/CommunitiesPage';
import { CommunityDetailPage } from '@/features/community/pages/CommunityDetailPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<AuthWelcomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path=":citySlug/listings" element={<CityListingsPage />} />
        <Route path="home" element={<HomeRedirectPage />} />
        <Route path="browse" element={<BrowseDiscoverPage />} />
        <Route path="me" element={<MyAccountPage />} />
        <Route path="me/listings" element={<MyListingsPlaceholderPage />} />
        <Route path="me/settings" element={<SettingsPlaceholderPage />} />
        <Route path="me/notifications" element={<NotificationsPage />} />
        <Route path="listings/:listingId" element={<ListingDetailPage />} />
        <Route path="listings/:listingId/edit" element={<EditListingPage />} />
        <Route path="sell" element={<PostListingPage />} />
        <Route path="sell/:step" element={<PostListingPage />} />
        <Route path="chats" element={<ChatInboxPage />} />
        <Route path="chats/:conversationId" element={<ChatPage />} />
        <Route path="profiles/:userId" element={<SellerProfilePage />} />
        <Route path="communities" element={<CommunitiesPage />} />
        <Route path="communities/create" element={<CreateCommunityPage />} />
        <Route path="communities/:communityId" element={<CommunityDetailPage />} />
      </Route>
    </Routes>
  );
}
