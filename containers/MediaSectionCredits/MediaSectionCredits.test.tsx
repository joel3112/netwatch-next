import { render } from '@testing-library/react';
import MediaSectionCredits from '@/containers/MediaSectionCredits/MediaSectionCredits';
import { mockMedias } from '@/data';
import { APIMediaDetail } from '@/types';
import { mediaDetailMapper } from '@/utils/api';
import { getPropValue } from '@/utils/helpers';

describe('Tests MediaSectionCredits component', () => {
  test('renders component correctly', () => {
    const detail = mediaDetailMapper(mockMedias.movie as unknown as APIMediaDetail, 'es');
    const cast = getPropValue(detail, 'credits.cast', []);
    const crew = getPropValue(detail, 'credits.crew', []);

    const { container } = render(<MediaSectionCredits cast={cast} crew={crew} />);

    expect(container).toMatchSnapshot();
  });
});
