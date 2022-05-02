import { render } from '@testing-library/react';
import HomePage from '@/pages/index';

describe('Index page', () => {
  test('renders page correctly', () => {
    const { container } = render(<HomePage />);

    expect(container).toMatchSnapshot();
  });
});
