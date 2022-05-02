import { render, screen } from '@testing-library/react';
import mockMovies from '@/data/movies';
import MediaGrid from '@/containers/MediaGrid/MediaGrid';

describe('Tests MediaGrid component', () => {
  test('renders component correctly', () => {
    const { container } = render(<MediaGrid mediaKey="movie" />);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<MediaGrid mediaKey="movie" />);

    expect(screen.getByRole('grid').childNodes.length).toBe(mockMovies.length);
  });
});
