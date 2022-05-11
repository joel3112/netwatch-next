import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useFetchPagination } from '@/hooks/useFetchPagination';

const resultPage1 = [
  { id: 1, name: 'uno' },
  { id: 2, name: 'dos' }
];
const mockData = {
  results: [...resultPage1],
  total_pages: 2
};
const mockError = 'error';
const itemPlaceholder = {
  id: 0,
  name: 'placeholder media name'
};

const fetcher = (url: string) => {
  return axios
    .get(url)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

jest.mock('axios');

describe('Tests useFetchPagination hook', () => {
  test('returns data correctly', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() =>
      useFetchPagination('/api/test1', (...args) => fetcher(args[0] as string))
    );

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(resultPage1);
    });
  });

  test('returns loading correctly', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() =>
      useFetchPagination('/api/test2', (...args) => fetcher(args[0] as string))
    );

    await waitFor(() => {
      expect(result.current.loading).toBeTruthy();
    });
  });

  test('returns placeholder while loading correctly', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() =>
      useFetchPagination('/api/test3', (...args) => fetcher(args[0] as string), 1, itemPlaceholder)
    );

    await waitFor(async () => {
      await expect(result.current.data).toContainEqual(itemPlaceholder);
    });
  });

  test('returns error correctly', async () => {
    (axios.get as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useFetchPagination('/api/test4', (...args) => fetcher(args[0] as string))
    );

    await waitFor(() => {
      expect(result.current.error).toBe(mockError);
    });
  });
});
