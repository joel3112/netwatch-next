import { render, screen } from '@testing-library/react';
import Container from '@/components/layout/Container/Container';

describe('Tests Container component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Container>Test</Container>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<Container>Test</Container>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
