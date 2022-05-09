import { render, screen } from '@testing-library/react';
import MediaCarousel from '@/containers/MediaCarousel/MediaCarousel';
import { mockMedias } from '@/data';
import { mediaMapper } from '@/utils/api';

describe('Tests MediaCarousel component', () => {
  test('renders component correctly', () => {
    const medias = mockMedias.movie.map(mediaMapper);

    const { container } = render(<MediaCarousel items={medias} />);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const medias = mockMedias.tv.map(mediaMapper);

    render(<MediaCarousel items={medias} />);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
