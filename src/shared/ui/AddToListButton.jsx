import useWatchlist from '../../app/providers/watchlist-provider/useWatchlist';

export default function AddToListButton({ movie }) {
  const { movieList, handleMovieList } = useWatchlist();

  return (
    <>
      {movieList.some((m) => m.id === movie.id) ? (
        <div
          className="group/add flex size-6 flex-col items-center justify-center rounded-full border-2 border-orange-600 bg-stone-800 transition-all duration-500 ease-in-out hover:border-none hover:bg-red-600 sm:size-8"
          onClick={() => handleMovieList(movie)}
        >
          <svg
            className="size-5 fill-orange-600 transition-colors duration-300 ease-in-out group-hover/add:fill-stone-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          >
            <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
          </svg>
        </div>
      ) : (
        <div
          className="group/add flex size-6 flex-col items-center justify-center rounded-full border-2 border-stone-500 bg-stone-800 transition-all duration-500 ease-in-out hover:border-none hover:bg-orange-400 sm:size-8"
          onClick={() => handleMovieList(movie)}
        >
          <svg
            className="size-5 fill-stone-50 transition-colors duration-300 ease-in-out group-hover/add:fill-stone-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </div>
      )}
    </>
  );
}
