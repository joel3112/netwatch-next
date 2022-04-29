import { render, screen } from '@testing-library/react';
import Image from '@/components/media/Image/Image';

describe('Tests Image component', () => {
  test('renders component correctly', () => {
    const { container } = render(
      <Image alt="img" src="https://image.tmdb.org/t/p/w500/4pCSBPHUPia93rppHF3UX4cLQ9M.jpg" />
    );

    expect(container).toMatchSnapshot();
  });

  test('renders with ratio correctly', () => {
    const width = 200;
    const ratio = 1.5;
    render(
      <Image
        alt="img"
        src="https://image.tmdb.org/t/p/w500/4pCSBPHUPia93rppHF3UX4cLQ9M.jpg"
        width={width}
        ratio={ratio}
      />
    );

    expect(screen.getByRole('img')).toHaveStyle(`width: ${width}px`);
    expect(screen.getByRole('img')).toHaveStyle(`height: ${width * ratio}px`);
  });
});
