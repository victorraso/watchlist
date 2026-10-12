export default function SearchBar({ query, setQuery }) {
  return (
    <div>
      <div className="flex flex-row items-center gap-2 rounded-full bg-stone-400/80 px-2 py-1">
        <button className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="size-7 fill-stone-950"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search movies..."
          className="py-1 text-stone-950 focus:ring-0 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
