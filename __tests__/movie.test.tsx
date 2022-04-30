import { render } from '@testing-library/react';
import Movie from '@/pages/movie';

describe('Tests movies page', () => {
  test('renders page correctly', () => {
    const { container } = render(<Movie />);

    expect(container).toMatchSnapshot();
  });
});
