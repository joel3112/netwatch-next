import { render, screen } from '@testing-library/react';
import Skeleton from '@/components/feedback/Skeleton/Skeleton';

describe('Tests Skeleton component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Skeleton />);

    expect(container).toMatchSnapshot();
  });

  test('renders with circular variant correctly', () => {
    const width = 200;
    render(<Skeleton variant="circular" width={width} />);

    expect(screen.getByRole('progressbar')).toHaveStyle(`width: ${width}px`);
    expect(screen.getByRole('progressbar')).toHaveStyle(`height: ${width}px`);
  });
});
