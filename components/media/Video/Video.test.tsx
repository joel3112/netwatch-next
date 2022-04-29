import { render, screen } from '@testing-library/react';
import Video from '@/components/media/Video/Video';

describe('Tests Video component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Video id="6Cl8PmVm3YE" />);

    expect(container).toMatchSnapshot();
  });

  test('renders with ratio correctly', () => {
    const width = 200;
    const ratio = 1.5;

    render(<Video id="6Cl8PmVm3YE" width={width} ratio={ratio} />);

    expect(screen.getByLabelText('video')).toHaveStyle(`width: ${width}px`);
    expect(screen.getByLabelText('video')).toHaveStyle(`height: ${width * ratio}px`);
  });
});
