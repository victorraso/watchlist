import { useTrending } from '../hooks/useTrending';
import Shelf from '../../../shared/ui/Shelf';

export default function TrendingShelf() {
  const { data: trendingData, isLoading: isLoadingTrending } = useTrending();

  return (
    <Shelf
      data={trendingData}
      isLoadingData={isLoadingTrending}
      title={'TRENDING'}
    />
  );
}
