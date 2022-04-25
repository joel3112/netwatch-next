import { render, screen } from '@testing-library/react';
import Layout from '@/containers/Layout/Layout';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

describe('Tests Layout component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Layout>Content</Layout>);

    expect(container).toMatchSnapshot();
  });

  test('renders header title correctly', () => {
    render(<Layout>Content</Layout>);

    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  test('renders content correctly', () => {
    render(<Layout>Content</Layout>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
