import { render } from '@testing-library/react';
import Movies from '@/pages/movies';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

describe('Tests movies page', () => {
  test('renders page correctly', () => {
    const { container } = render(<Movies />);

    expect(container).toMatchSnapshot();
  });
});
