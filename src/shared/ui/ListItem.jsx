import useWatchlist from '../../app/providers/watchlist-provider/useWatchlist';
import { useMovie } from '../../features/movies/hooks/useMovie';
import AddToListButton from './AddToListButton';
import PlayTrailerButton from './PlayTrailerButton';
import Poster from './Poster';

export default function ListItem({ movieId, onImageDone }) {
  const { data: movieData, isLoading: isLoadingMovie } = useMovie(movieId);
  const handleDone = () => onImageDone?.(movieData.id);

  return (
    <div>
      {!isLoadingMovie && (
        <div className="flex max-w-300 flex-row gap-5 rounded-xl bg-stone-950/70 px-3 py-4">
          <a href={`/movies/${movieData.id}`}>
            <div className="aspect-2/3 w-20 shrink-0 md:w-40">
              <img
                src={`https://image.tmdb.org/t/p/w185/${movieData?.poster_path}`}
                className="aspect-2/3 w-full rounded-md object-cover"
                onLoad={handleDone}
                onError={handleDone}
              />
            </div>
          </a>
          <div className="flex flex-col gap-1 md:gap-2">
            {/* title */}
            <span className="font-txt text-xl font-black md:mb-2 md:text-4xl">
              {movieData?.title}
            </span>
            <div className="flex flex-row gap-5">
              {/* rating */}
              <div className="flex flex-row items-center gap-1">
                <svg
                  className="size-3 fill-yellow-500 sm:size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.8c.45 0 .86.26 1.06.67l2.2 4.45 4.91.71c.46.07.84.39.98.83.14.44.02.92-.31 1.24l-3.55 3.46.84 4.89c.08.46-.11.92-.49 1.2-.38.28-.87.32-1.29.1L12 18.04l-4.35 2.29c-.42.22-.91.18-1.29-.1-.38-.28-.57-.74-.49-1.2l.84-4.89-3.55-3.46c-.33-.32-.45-.8-.31-1.24.14-.44.52-.76.98-.83l4.91-.71 2.2-4.45c.2-.41.61-.67 1.06-.67Z" />
                </svg>
                <span className="text-base text-yellow-500 md:text-xl">
                  {movieData?.vote_average.toFixed(1) ?? '-'}
                </span>
              </div>
              {/* popularity */}
              <div className="flex flex-row items-center gap-1">
                <span className="text-xs text-shadow-none md:text-base">
                  ❤️
                </span>
                <span className="text-base text-red-600 md:text-xl">
                  {movieData?.popularity.toFixed(0) ?? '-'}
                </span>
              </div>
              {/* runtime */}
              <div className="flex flex-row items-center gap-1">
                <span className="text-xs text-shadow-none md:text-base">
                  ⏳️
                </span>
                <span className="text-base text-blue-500 md:text-xl">
                  {movieData?.runtime ?? '-'} min
                </span>
              </div>
            </div>
            {/* genres */}
            <div className="flex flex-row items-center gap-2 text-nowrap">
              {movieData?.genres.map((g) => (
                <div
                  key={g.id}
                  className="w-fit rounded-md bg-orange-800/70 px-2 text-sm md:text-base"
                >
                  <span>{g.name}</span>
                </div>
              ))}
            </div>
            {/* movie overview */}
            <div className="mt-1 mb-2 text-sm md:text-base">
              {movieData?.overview}
            </div>
            {/* add remove play button */}
            <div className="flex flex-row gap-2">
              <PlayTrailerButton movie={movieData} />
              <AddToListButton movie={movieData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
