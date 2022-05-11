import { render, screen } from '@testing-library/react';
import MediaGrid from '@/containers/MediaGrid/MediaGrid';
import { mediaMapper } from '@/utils/api';
import { mockMedias } from '@/data';

describe('Tests MediaGrid component', () => {
  test('renders component correctly', () => {
    const medias = mockMedias.movie.map(mediaMapper);

    const { container } = render(<MediaGrid items={medias} />);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const medias = mockMedias.tv.map(mediaMapper);

    render(<MediaGrid items={medias} />);

    expect(screen.getByRole('grid').childNodes.length).toBe(medias.length);
  });
});
