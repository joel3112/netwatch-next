import useSWR, { BareFetcher, KeyedMutator } from 'swr';
import { DataResponse, DataResponseError, ObjectGeneric } from '@/types';

export type UseFetch<T> = {
  data: Array<ObjectGeneric> | DataResponse<T> | null;
  loading: boolean;
  error: DataResponseError | null;
  mutate?: KeyedMutator<DataResponse<T>>;
};

const initialData = (itemsPerView?: number, placeholder?: ObjectGeneric) =>
  itemsPerView
    ? [{}].multiply(itemsPerView).map((_, i) => ({
        id: i,
        ...(placeholder || {})
      }))
    : null;

export const useFetch = <T>(
  path: string,
  fetcher: BareFetcher<T>,
  itemsPerView?: number,
  placeholder?: ObjectGeneric
): UseFetch<T> => {
  const { data, error, mutate } = useSWR<T>(path, fetcher);
  const loading = !error && !data;

  return {
    data: loading ? initialData(itemsPerView, placeholder) : (data as DataResponse<T>),
    loading,
    error,
    mutate: mutate as KeyedMutator<DataResponse<T>>
  };
};
