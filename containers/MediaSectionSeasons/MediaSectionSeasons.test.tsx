import { render, screen } from '@testing-library/react';
import MediaSectionSeasons from '@/containers/MediaSectionSeasons/MediaSectionSeasons';
import { MediaSeason } from '@/types';

describe('Tests MediaSectionSeasons component', () => {
  const seasons: Array<MediaSeason> = [];

  test('renders component correctly', () => {
    const { container } = render(<MediaSectionSeasons seasons={seasons} mediaId={1} />);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<MediaSectionSeasons seasons={seasons} mediaId={1} />);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
