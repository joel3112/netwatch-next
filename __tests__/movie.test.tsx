import { render } from '@testing-library/react';
import MoviePage from '@/pages/movie';

describe('Tests movies page', () => {
  test('renders page correctly', () => {
    const { container } = render(<MoviePage />);

    expect(container).toMatchSnapshot();
  });
});
