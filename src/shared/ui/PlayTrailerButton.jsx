import useWatchlist from '../../app/providers/watchlist-provider/useWatchlist';

export default function PlayTrailerButton({ movie }) {
  const { setSelectedMovie } = useWatchlist();
  return (
    <div
      className="flex size-6 flex-col items-center justify-center rounded-full bg-orange-600 shadow-md/50 shadow-orange-600 transition-colors duration-500 ease-in-out hover:bg-orange-400 sm:right-12 sm:size-8"
      onClick={() => setSelectedMovie(movie)}
    >
      <svg
        className="size-5 fill-gray-900"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M320-200v-560l440 280-440 280Z" />
      </svg>
    </div>
  );
}
