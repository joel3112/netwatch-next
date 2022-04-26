import { render, screen } from '@testing-library/react';
import Header from '@/components/layout/Header/Header';

describe('Tests Header component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Header title="Header" />);

    expect(container).toMatchSnapshot();
  });

  test('renders title correctly', () => {
    render(<Header title="Header" />);

    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  test('renders logo image url correctly', () => {
    render(<Header title="Header" logoUrl="/assets/images/logo-light.png" />);

    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  test('renders logo href link correctly', () => {
    render(<Header title="Header" href="/home" />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/home');
  });
});
