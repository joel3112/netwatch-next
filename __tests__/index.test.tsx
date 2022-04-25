import { render } from '@testing-library/react';
import Home from '@/pages/index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

describe('Index page', () => {
  test('renders page correctly', () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });
});
