import { useState } from 'react';
import Shelf from '../../../shared/ui/Shelf';
import { useTopRated } from '../hooks/useTopRated';

export default function TopRatedShelf() {
  const [page, setPage] = useState(1);
  const { data: topRatedData, isLoading, isFetching } = useTopRated(page);
  return (
    <Shelf
      data={topRatedData}
      isLoadingData={isLoading}
      isFetchingData={isFetching}
      title={'TOP RATED'}
      seePages={true}
      page={page}
      setPage={setPage}
    />
  );
}
