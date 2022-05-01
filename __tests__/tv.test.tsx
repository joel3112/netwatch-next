import { render } from '@testing-library/react';
import TVPage from '@/pages/tv';

describe('Tests tvs page', () => {
  test('renders page correctly', () => {
    const { container } = render(<TVPage />);

    expect(container).toMatchSnapshot();
  });
});
