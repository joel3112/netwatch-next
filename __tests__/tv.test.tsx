import { render } from '@testing-library/react';
import Tv from '@/pages/tv';

describe('Tests tvs page', () => {
  test('renders page correctly', () => {
    const { container } = render(<Tv />);

    expect(container).toMatchSnapshot();
  });
});
