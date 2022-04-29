import { render, screen } from '@testing-library/react';
import Header from '@/containers/Header/Header';

describe('Tests Header component', () => {
  test('renders container correctly', () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });

  test('renders title correctly', () => {
    render(<Header />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  test('renders logo image url correctly', () => {
    render(<Header />);

    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  test('renders logo href link correctly', () => {
    render(<Header />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
