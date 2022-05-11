import useSWR, { BareFetcher, KeyedMutator } from 'swr';
import { DataResponse, DataResponseError, ObjectGeneric } from '@/types';

export type UseFetch<T> = {
  data: Array<ObjectGeneric> | DataResponse<T> | null;
  loading: boolean;
  error: DataResponseError | null;
  mutate?: KeyedMutator<DataResponse<T>>;
};

export const useFetch = <T>(path: string | false | null, fetcher: BareFetcher<T>): UseFetch<T> => {
  const { data, error, mutate } = useSWR<T>(path, fetcher);
  const loading = !error && !data;

  return {
    data: data as DataResponse<T>,
    loading,
    error,
    mutate: mutate as KeyedMutator<DataResponse<T>>
  };
};
