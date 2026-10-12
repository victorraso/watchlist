import { useEffect } from 'react';
import PopularShelf from '../features/movies/components/PopularShelf';
import TopRatedShelf from '../features/movies/components/TopRatedShelf';
import TrendingShelf from '../features/movies/components/TrendingShelf';
import UpcomingCarousel from '../features/movies/components/UpcomingCarousel';
import { useUpcoming } from '../features/movies/hooks/useUpcoming';

export default function HomePage() {
  const { isLoading } = useUpcoming();

  useEffect(() => {
    document.title = 'Movies Watchlist';
  }, []);

  return (
    <div className="flex flex-col gap-15 bg-stone-950">
      {isLoading ? (
        <div className="m-auto mt-50 animate-pulse text-stone-50">
          Loading...
        </div>
      ) : (
        <>
          <UpcomingCarousel />
          <div className="block h-5 sm:hidden"></div>
          <TrendingShelf />
          <TopRatedShelf />
          <PopularShelf />
        </>
      )}
    </div>
  );
}
