import AddToListButton from './AddToListButton';
import PlayTrailerButton from './PlayTrailerButton';

export default function Poster({ movie, genre, onImageDone }) {
  const handleDone = () => onImageDone?.(movie.id);

  return (
    <div className="group max-w-40 rounded-xs bg-stone-950 p-1 transition-all duration-100 ease-in-out hover:scale-102 hover:cursor-pointer">
      <div className="relative">
        <a href={`/movies/${movie.id}`}>
          <div className="aspect-2/3 max-w-40 overflow-hidden rounded-md">
            <img
              className="transition-all duration-500 ease-in-out group-hover:scale-107"
              src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
              onLoad={handleDone}
              onError={handleDone}
            />
          </div>
        </a>
        {/* rating */}
        <div className="absolute top-2 left-2 flex flex-row items-center justify-center gap-0.5 rounded-sm bg-stone-900/80 px-1 py-0 text-[9px] text-yellow-500/80 sm:px-2 sm:py-0.5 sm:text-xs">
          <div>
            <svg
              className="size-2 fill-yellow-500/80 sm:size-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.8c.45 0 .86.26 1.06.67l2.2 4.45 4.91.71c.46.07.84.39.98.83.14.44.02.92-.31 1.24l-3.55 3.46.84 4.89c.08.46-.11.92-.49 1.2-.38.28-.87.32-1.29.1L12 18.04l-4.35 2.29c-.42.22-.91.18-1.29-.1-.38-.28-.57-.74-.49-1.2l.84-4.89-3.55-3.46c-.33-.32-.45-.8-.31-1.24.14-.44.52-.76.98-.83l4.91-.71 2.2-4.45c.2-.41.61-.67 1.06-.67Z" />
            </svg>
          </div>
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
        <div className="opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="absolute right-10 bottom-2 sm:right-12">
            <PlayTrailerButton movie={movie} />
          </div>
          <div className="absolute right-2 bottom-2">
            <AddToListButton movie={movie} />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-1">
        <span className="overflow-hidden text-sm font-normal text-nowrap text-ellipsis transition-colors duration-700 ease-in-out group-hover:text-orange-600">
          {movie.title}
        </span>
        <span className="text-xs font-light">
          {movie.release_date.split('-')[0]} &bull; {genre}
        </span>
      </div>
    </div>
  );
}
