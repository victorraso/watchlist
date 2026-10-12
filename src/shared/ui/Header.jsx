import { NavLink } from 'react-router';
import Logo from './Logo';

const navlinkCSS = ({ isActive }) =>
  isActive ? 'text-orange-500' : 'text-stone-100';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 z-999 w-full bg-linear-to-b from-stone-950/70 via-stone-950/50 to-transparent px-5 py-3">
      <div className="relative mb-2 ml-2 flex flex-row items-center gap-2 sm:ml-10">
        <span className="text-[9px] italic sm:text-xs">This page uses </span>
        <img src="/tmdb-logo.svg" className="w-20 pt-0.5 sm:w-25" />
      </div>
      <div className="item-start flex flex-col sm:flex-row sm:items-center sm:gap-10">
        <div className="hidden sm:block">
          <Logo />
        </div>
        <div className="flex flex-row items-center gap-4 sm:gap-10">
          <NavLink to="movies" className={navlinkCSS}>
            Home
          </NavLink>
          <NavLink to="browse" className={navlinkCSS}>
            Browse
          </NavLink>
          <NavLink to="watchlist" className={navlinkCSS}>
            Your WatchList
          </NavLink>
        </div>
        <div className="absolute top-6 right-7 text-2xl sm:hidden">🌶️</div>
      </div>
    </header>
  );
}
