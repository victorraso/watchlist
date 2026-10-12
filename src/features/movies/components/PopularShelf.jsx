import { useState } from 'react';
import Shelf from '../../../shared/ui/Shelf';
import { usePopular } from '../hooks/usePopular';

export default function PopularShelf() {
  const [page, setPage] = useState(1);
  const { data: popularData, isLoading, isFetching } = usePopular(page);

  return (
    <Shelf
      data={popularData}
      isLoadingData={isLoading}
      isFetchingData={isFetching}
      title={'POPULAR MOVIES'}
      seePages={true}
      page={page}
      setPage={setPage}
    />
  );
}
