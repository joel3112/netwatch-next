import { render } from '@testing-library/react';
import Home from '@/pages/index';

describe('Index page', () => {
  test('renders page correctly', () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });
});
