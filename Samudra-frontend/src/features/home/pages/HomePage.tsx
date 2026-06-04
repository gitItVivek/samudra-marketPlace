import { AppHeader } from '@/shared/components/AppHeader/AppHeader';
import { SearchBar } from '@/features/home/components/SearchBar';
import { CategoryStrip } from '@/features/home/components/CategoryStrip';
import { HomeFeedToolbar } from '@/features/home/components/HomeFeedToolbar/HomeFeedToolbar';
import { CuratedHomeFeed } from '@/features/home/components/CuratedHomeFeed/CuratedHomeFeed';
import { GridMarketplaceFeed } from '@/features/home/components/GridMarketplaceFeed/GridMarketplaceFeed';
import { useFeedView } from '@/app/FeedViewContext';
import styles from './HomePage.module.css';

export function HomePage() {
  const { mode } = useFeedView();
  const isGrid = mode === 'grid';

  return (
    <div className={styles.page}>
      <div className="mobileOnly">
        <AppHeader />
      </div>
      {!isGrid && (
        <>
          <SearchBar />
          <CategoryStrip />
        </>
      )}
      <HomeFeedToolbar />
      {isGrid ? <GridMarketplaceFeed /> : <CuratedHomeFeed />}
    </div>
  );
}
