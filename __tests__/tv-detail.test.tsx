import { render } from '@testing-library/react';
import TVDetailPage from '@/pages/tv/[tvId]';

describe('Tests tv detail page', () => {
  test('renders page correctly', () => {
    const { container } = render(<TVDetailPage />);

    expect(container).toMatchSnapshot();
  });
});
