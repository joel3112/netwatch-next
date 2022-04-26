import { render } from '@testing-library/react';
import Movies from '@/pages/movies';

describe('Tests movies page', () => {
  test('renders page correctly', () => {
    const { container } = render(<Movies />);

    expect(container).toMatchSnapshot();
  });
});
