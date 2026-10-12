import { createBrowserRouter, Navigate } from 'react-router';
import AppLayout from '../shared/ui/AppLayout';
import HomePage from '../pages/HomePage';
import BrowserPage from '../pages/BrowserPage';
import MovieDetails from '../features/movies/components/MovieDetails';
import WatchListPage from '../pages/WatchListPage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/movies" /> },
      { path: 'movies', element: <HomePage /> },
      { path: 'movies/:movieId', element: <MovieDetails /> },
      { path: 'browse', element: <BrowserPage /> },
      { path: 'watchlist', element: <WatchListPage /> },
    ],
  },
]);

export default router;
