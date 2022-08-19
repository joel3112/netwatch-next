import { render } from '@testing-library/react';
import MediaDetail from '@/containers/MediaDetail/MediaDetail';
import { mockMedias } from '@/data';
import { MovieDetail } from '@/types';

describe('Tests MediaDetail component', () => {
  test('renders component correctly', () => {
    const media = mockMedias.movie;

    const { container } = render(<MediaDetail media={media as unknown as MovieDetail} />);

    expect(container).toMatchSnapshot();
  });
});
