import { act, render, waitFor } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { MediaType } from '@/types';
import MediaPagination from '@/containers/MediaPagination/MediaPagination';
import { mockMedias } from '@/data';

const mockLoadMore = jest.fn();

jest.mock('@/hooks/useFetchPagination', () => ({
  useFetchPagination: jest.fn().mockImplementation(() => ({
    loading: false,
    paginationEnd: false,
    data: [mockMedias.tv],
    onLoadMore: mockLoadMore
  }))
}));

describe('Tests MediaPagination component', () => {
  test('renders component correctly', () => {
    const { container } = render(<MediaPagination mediaKey={MediaType.TV} />);

    expect(container).toMatchSnapshot();
  });

  test('calls more data correctly', async () => {
    render(<MediaPagination mediaKey={MediaType.TV} />);

    act(() => {
      mockAllIsIntersecting(true);
    });

    await waitFor(() => {
      expect(mockLoadMore).toHaveBeenCalled();
    });
  });
});
