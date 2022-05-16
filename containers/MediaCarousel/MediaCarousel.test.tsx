import { render } from '@testing-library/react';
import MediaCarousel from '@/containers/MediaCarousel/MediaCarousel';
import { mockMedias } from '@/data';
import { mediaMapper } from '@/utils/api';

describe('Tests MediaCarousel component', () => {
  test('renders component correctly', () => {
    const medias = mockMedias.movies.map((item) => mediaMapper(item, 'es-ES'));

    const { container } = render(<MediaCarousel items={medias} />);

    expect(container).toMatchSnapshot();
  });
});
