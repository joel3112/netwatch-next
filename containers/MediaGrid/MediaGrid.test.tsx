import { render, screen } from '@testing-library/react';
import { MediaData } from '@/types';
import MediaGrid from '@/containers/MediaGrid/MediaGrid';
import { mediaMapper } from '@/utils/api';
import { mockMedias } from '@/data';

describe('Tests MediaGrid component', () => {
  let medias: Array<MediaData> = [];

  beforeAll(() => {
    medias = mockMedias.movie.map(mediaMapper);
  });

  test('renders component correctly', () => {
    const { container } = render(<MediaGrid items={medias} />);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<MediaGrid items={medias} />);

    expect(screen.getByRole('grid').childNodes.length).toBe(medias.length);
  });
});
