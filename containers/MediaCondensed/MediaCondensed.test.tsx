import { render } from '@testing-library/react';
import MediaCondensed from '@/containers/MediaCondensed/MediaCondensed';

describe('Tests MediaCondensed component', () => {
  test('renders component correctly', () => {
    const { container } = render(
      <MediaCondensed id={1} type="movie" name="Pelicula" image="https://picsum.photos/200/300" />
    );

    expect(container).toMatchSnapshot();
  });
});
