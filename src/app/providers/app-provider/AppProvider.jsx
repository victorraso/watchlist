import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WatchlistProvider from '../watchlist-provider/WatchlistProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WatchlistProvider>{children}</WatchlistProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
