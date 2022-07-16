import { render, screen } from '@testing-library/react';
import { APIMediaDetail, MediaSeason } from '@/types';
import MediaSectionSeasons from '@/containers/MediaSectionSeasons/MediaSectionSeasons';
import { seasonMapper } from '@/utils/api';
import { getPropValue } from '@/utils/helpers';
import { mockMedias } from '@/data';

describe('Tests MediaSectionSeasons component', () => {
  const detail = mockMedias.tv as unknown as APIMediaDetail;
  const seasons: Array<MediaSeason> = getPropValue(detail, 'seasons', []).map(seasonMapper);

  test('renders component correctly', () => {
    const { container } = render(<MediaSectionSeasons seasons={seasons} mediaId={1} />);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<MediaSectionSeasons seasons={seasons} mediaId={1} />);

    expect(screen.getByText(seasons[0].name)).toBeInTheDocument();
  });
});
