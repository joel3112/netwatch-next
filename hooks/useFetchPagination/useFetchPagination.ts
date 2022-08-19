import { useState } from 'react';
import { KeyedMutator } from 'swr';
import useSWRInfinite, { SWRInfiniteFetcher, SWRInfiniteKeyLoader } from 'swr/infinite';
import { DataResponseError, MediaDataList } from '@/types';
import { useI18n } from '@/hooks/useI18n';

export type UseFetchPagination<T> = {
  size: number;
  paginationEnd: boolean;
  data: Array<T> | null;
  loading: boolean;
  error: DataResponseError | null;
  onLoadMore: () => void;
  mutate?: KeyedMutator<Array<T>>;
};

const initialData = <T>(itemsPerView?: number, placeholder?: T): Array<T> => {
  if (itemsPerView) {
    return [{} as T].multiply(itemsPerView).map((_, id) => ({
      ...(placeholder || ({} as T)),
      id
    }));
  }
  return [];
};

export const useFetchPagination = <T>(
  path: string,
  fetcher: SWRInfiniteFetcher,
  itemsPerView?: number,
  placeholder?: T
): UseFetchPagination<T> => {
  const { locale } = useI18n();
  const getKey: SWRInfiniteKeyLoader = (index, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${path}?page=${index + 1}&language=${locale}`;
  };

  const [limit, setLimit] = useState<number>(1);
  const { data, error, size, setSize, mutate } = useSWRInfinite<T>(
    getKey,
    (...args: Array<string>) => {
      return fetcher(args[0]).then((response: MediaDataList<T>) => {
        const { results, total_pages } = response || {};
        setLimit(total_pages);
        return results;
      });
    },
    {
      initialSize: 1,
      revalidateAll: false,
      persistSize: true
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isReachingEnd = size === limit;

  const onLoadMore = () => setSize(size + 1);

  return {
    data: !isLoadingMore
      ? ([] as Array<T>).concat(...(data || []))
      : ([] as Array<T>).concat(...(data || []), initialData(itemsPerView, placeholder)),
    loading: Boolean(isLoadingMore),
    error,
    size,
    paginationEnd: isReachingEnd,
    onLoadMore,
    mutate
  };
};
