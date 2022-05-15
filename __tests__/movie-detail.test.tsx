import { render } from '@testing-library/react';
import MovieDetailPage from '@/pages/movie/[movieId]';

describe('Tests movie detail page', () => {
  test('renders page correctly', () => {
    const { container } = render(<MovieDetailPage />);

    expect(container).toMatchSnapshot();
  });
});
