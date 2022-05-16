import { render } from '@testing-library/react';
import MediaSection from '@/containers/MediaSection/MediaSection';
import { mockMedias } from '@/data';
import { MovieDetail } from '@/types';

describe('Tests MediaSection component', () => {
  test('renders component correctly', () => {
    const media = mockMedias.movie;

    const { container } = render(
      <MediaSection media={media as unknown as MovieDetail} section="videos" />
    );

    expect(container).toMatchSnapshot();
  });
});
