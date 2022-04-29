import { render, screen } from '@testing-library/react';
import Grid from '@/components/layout/Grid/Grid';

const items = [...Array(3)].map((_, index) => <Grid.Item key={index}>item ${index + 1}</Grid.Item>);

describe('Tests Grid component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Grid>{items}</Grid>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const gap = 5;
    render(<Grid gap={gap}>{items}</Grid>);

    expect(screen.getByRole('grid').childNodes.length).toBe(items.length);
  });

  test('renders any children correctly', () => {
    const spacing = [5, 10];
    render(<Grid spacing={spacing} />);

    expect(screen.getByRole('grid').childNodes.length).toBe(0);
  });
});
