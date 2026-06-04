import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/shared/layout/MainLayout';
import { HomePage } from '@/features/home/pages/HomePage';
import { ListingDetailPage } from '@/features/listing/pages/ListingDetailPage';
import { PostListingPage } from '@/features/listing/pages/PostListingPage';
import { ChatPage } from '@/features/messaging/pages/ChatPage';
import { SellerProfilePage } from '@/features/identity/pages/SellerProfilePage';
import { BrowsePlaceholderPage } from '@/features/browse/pages/BrowsePlaceholderPage';
import { MyProfilePlaceholderPage } from '@/features/profile/pages/MyProfilePlaceholderPage';
import { CommunitiesPage } from '@/features/community/pages/CommunitiesPage';
import { CommunityDetailPage } from '@/features/community/pages/CommunityDetailPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="browse" element={<BrowsePlaceholderPage />} />
        <Route path="me" element={<MyProfilePlaceholderPage />} />
        <Route path="listings/:listingId" element={<ListingDetailPage />} />
        <Route path="sell" element={<PostListingPage />} />
        <Route path="sell/:step" element={<PostListingPage />} />
        <Route path="chats/:conversationId" element={<ChatPage />} />
        <Route path="profiles/:profileId" element={<SellerProfilePage />} />
        <Route path="communities" element={<CommunitiesPage />} />
        <Route path="communities/:communityId" element={<CommunityDetailPage />} />
      </Route>
    </Routes>
  );
}
