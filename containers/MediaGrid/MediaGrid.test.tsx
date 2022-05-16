import { render, screen } from '@testing-library/react';
import MediaGrid from '@/containers/MediaGrid/MediaGrid';
import { mediaMapper } from '@/utils/api';
import { mockMedias } from '@/data';

describe('Tests MediaGrid component', () => {
  test('renders component correctly', () => {
    const medias = mockMedias.movies.map((item) => mediaMapper(item, 'es-ES'));

    const { container } = render(<MediaGrid items={medias} />);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const medias = mockMedias.tvs.map((item) => mediaMapper(item, 'es-ES'));

    render(<MediaGrid items={medias} />);

    expect(screen.getByRole('grid').childNodes.length).toBe(medias.length);
  });
});
