import { render } from '@testing-library/react';
import FavouritesPage from '@/pages/favourites';

describe('Tests favourites page', () => {
  test('renders page correctly', () => {
    const { container } = render(<FavouritesPage />);

    expect(container).toMatchSnapshot();
  });
});
