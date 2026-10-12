import { NavLink } from 'react-router';

export default function Logo() {
  return (
    <span className="font-logo text-2xl font-bold text-stone-50 sm:text-4xl">
      <NavLink to="/">Movies 🌶️ Watchlist</NavLink>
    </span>
  );
}
