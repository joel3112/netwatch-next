import { render } from '@testing-library/react';
import PersonDetailPage from '@/pages/person/[personId]';

describe('Tests person detail page', () => {
  test('renders page correctly', () => {
    const { container } = render(<PersonDetailPage />);

    expect(container).toMatchSnapshot();
  });
});
