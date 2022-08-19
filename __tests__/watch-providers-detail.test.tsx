import { render } from '@testing-library/react';
import WatchProvidersPage from '@/pages/watch/providers/[providerId]';

describe('Tests watch provider detail page', () => {
  test('renders page correctly', () => {
    const { container } = render(<WatchProvidersPage />);

    expect(container).toMatchSnapshot();
  });
});
