import { render } from '@testing-library/react';
import MediaSection from '@/containers/MediaSection/MediaSection';
import { mockMedias } from '@/data';

describe('Tests MediaSection component', () => {
  test('renders component correctly', () => {
    const media = mockMedias.movie;
    const section = 'videos';

    const { container } = render(<MediaSection items={media[section]} section={section} />);

    expect(container).toMatchSnapshot();
  });
});
