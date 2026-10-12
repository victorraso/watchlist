import { useEffect, useState } from 'react';
import useWatchlist from '../../app/providers/watchlist-provider/useWatchlist';
import { getToday } from '../utils/dateUtils';

const today = getToday();
const [year, month, day] = today.split('-').map(Number);
const roundedLastDecade = Math.floor(year / 10) * 10;
const decades = [];

for (let x = 1910; x <= roundedLastDecade; x += 10) {
  decades.push(x);
}

const stars = Array.from({ length: 11 }, (v, i) => {
  return i === 0 || i === 10 ? `${i}` : `${i}+`;
});

export default function FiltersBar() {
  const [isGenresOpened, setIsGenresOpened] = useState(true);
  const [isDecadesOpened, setIsDecadesOpened] = useState(true);
  const [isStarsOpened, setIsStarsOpened] = useState(true);
  const [showFilter, setShowFilter] = useState(
    window.matchMedia('(min-width: 768px)').matches,
  );

  const {
    genres,
    selectedGenres,
    setSelectedGenres,
    selectedDecade,
    setSelectedDecade,
    selectedStars,
    setSelectedStars,
  } = useWatchlist();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleChange = (e) => {
      setShowFilter(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className="mt-5 -mb-3">
      {/* filter button */}
      <button
        className="cursor-pointer sm:mb-2"
        onClick={() => setShowFilter((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="size-5 fill-orange-200"
        >
          <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
        </svg>
      </button>
      <div
        className={`grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 ${showFilter ? 'max-h-100' : 'max-h-0'} overflow-hidden transition-[max-height] duration-800`}
      >
        {/* genres */}
        <div>
          <button
            className="mb-1 flex cursor-pointer flex-row gap-2 font-bold text-orange-200"
            onClick={() => setIsGenresOpened((prev) => !prev)}
          >
            <span>Genres</span>
            <span
              className={`${isGenresOpened ? 'rotate-90' : ''} transition-transform duration-800`}
            >
              {'>'}
            </span>
          </button>
          <div
            className={`${isGenresOpened ? 'max-h-100' : 'max-h-0'} grid max-w-100 grid-cols-4 gap-1 overflow-hidden transition-[max-height] duration-800 ease-in-out`}
          >
            {genres?.genres?.map((g) => (
              <button
                key={g.name}
                className={`line-clamp-0 cursor-pointer rounded-sm ${selectedGenres.includes(g.id) ? 'bg-pink-600' : 'bg-orange-400'} px-1 py-0.5 text-xs text-nowrap text-ellipsis text-stone-950`}
                onClick={() =>
                  setSelectedGenres((prev) => {
                    if (prev.includes(g.id)) {
                      return prev.filter((id) => id !== g.id);
                    } else {
                      return [...prev, g.id];
                    }
                  })
                }
              >
                {g.name === 'Science Fiction' ? 'Sci-Fi' : g.name}
              </button>
            ))}
          </div>
        </div>
        {/* decades */}
        <div>
          <button
            className="mb-1 flex cursor-pointer flex-row gap-2 font-bold text-orange-200"
            onClick={() => setIsDecadesOpened((prev) => !prev)}
          >
            <span>Decades</span>
            <span
              className={`${isDecadesOpened ? 'rotate-90' : ''} transition-transform duration-800`}
            >
              {'>'}
            </span>
          </button>
          <div
            className={`${isDecadesOpened ? 'max-h-100' : 'max-h-0'} grid max-w-100 grid-cols-4 gap-1 overflow-hidden transition-[max-height] duration-800 ease-in-out`}
          >
            {decades.map((d) => (
              <button
                key={d}
                className={`line-clamp-1 rounded-sm px-1 py-0.5 text-xs text-ellipsis text-stone-950 ${selectedDecade === d ? 'bg-pink-600' : 'bg-orange-400'}`}
                onClick={() =>
                  setSelectedDecade(() => {
                    if (d === selectedDecade) return null;
                    else return d;
                  })
                }
              >
                {d}s
              </button>
            ))}
          </div>
        </div>
        {/* stars */}
        <div>
          <button
            className="mb-1 flex cursor-pointer flex-row gap-2 font-bold text-orange-200"
            onClick={() => setIsStarsOpened((prev) => !prev)}
          >
            <span>Stars</span>
            <span
              className={`${isStarsOpened ? 'rotate-90' : ''} transition-transform duration-800`}
            >
              {'>'}
            </span>
          </button>
          <div
            className={`${isStarsOpened ? 'max-h-100' : 'max-h-0'} grid max-w-100 grid-cols-4 gap-1 overflow-hidden transition-[max-height] duration-800 ease-in-out`}
          >
            {stars.map((s) => (
              <button
                key={s}
                className={`line-clamp-1 rounded-sm ${selectedStars === s.split('+')[0] ? 'bg-pink-600' : 'bg-orange-400'} px-1 py-0.5 text-xs text-ellipsis text-stone-950`}
                onClick={() =>
                  setSelectedStars(() => {
                    if (s.split('+')[0] === selectedStars) return null;
                    else return s.split('+')[0];
                  })
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
