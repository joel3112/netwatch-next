import { render } from '@testing-library/react';
import MediaDetailPage from '@/pages/[mediaType]/[mediaId]';

describe('Tests movie detail page', () => {
  test('renders page correctly', () => {
    const { container } = render(<MediaDetailPage />);

    expect(container).toMatchSnapshot();
  });
});

describe('Tests tv detail page', () => {
  test('renders page correctly', () => {
    const { container } = render(<MediaDetailPage />);

    expect(container).toMatchSnapshot();
  });
});
