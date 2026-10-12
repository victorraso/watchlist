import { useState } from 'react';
import useWatchlist from '../app/providers/watchlist-provider/useWatchlist';
import ListItem from '../shared/ui/ListItem';

export default function WatchListPage() {
  const { movieList } = useWatchlist();
  const [loadedIds, setLoadedIds] = useState([]);

  function handleImageDone(id) {
    setLoadedIds((prev) => {
      return [...prev, id];
    });
  }

  const AllLoaded = movieList && loadedIds.length >= movieList.length;

  return (
    <div>
      <div className="fixed inset-0 z-10">
        <img src="./background.png" className="h-full w-full object-cover" />
        <div className="absolute inset-0 z-20 bg-linear-to-b from-stone-950/50 via-stone-950/20 to-stone-950"></div>
      </div>
      {!AllLoaded && (
        <div className="relative z-50 flex animate-pulse flex-col items-center pt-20 text-stone-50 sm:pt-30">
          loading...
        </div>
      )}
      <div
        className={`relative z-50 mt-20 mb-30 flex flex-col gap-3 sm:mt-25 md:items-center ${AllLoaded ? 'block' : 'hidden'}`}
      >
        {movieList?.map((movie) => {
          return (
            <ListItem
              key={movie.id}
              movieId={movie.id}
              onImageDone={handleImageDone}
            />
          );
        })}
      </div>
    </div>
  );
}
