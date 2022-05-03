import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MediaType } from '@/types/media';
import MediaPagination from '@/containers/MediaPagination/MediaPagination';
import { mockMedias } from '@/data/';

const mockMediasPerPage = [mockMedias.tv];
const mockLoadMore = jest.fn();

jest.mock('axios');

jest.mock('@/hooks/useFetchPagination', () => ({
  useFetchPagination: jest.fn().mockImplementation(() => ({
    loading: false,
    data: mockMediasPerPage,
    onLoadMore: mockLoadMore
  }))
}));

describe('Tests MediaPagination component', () => {
  test('renders component correctly', () => {
    const { container } = render(<MediaPagination mediaKey={MediaType.TV} />);

    expect(container).toMatchSnapshot();
  });

  test('renders grid correctly', () => {
    render(<MediaPagination mediaKey={MediaType.TV} />);

    expect(screen.getByText(mockMedias.tv[0].name)).toBeInTheDocument();
  });

  test('calls more data correctly', async () => {
    render(<MediaPagination mediaKey={MediaType.TV} />);

    userEvent.click(screen.getByText('list.load.more'));

    await waitFor(() => {
      expect(mockLoadMore).toHaveBeenCalled();
    });
  });
});
