import { render, screen } from '@testing-library/react';
import Image from '@/components/media/Image/Image';

describe('Tests Image component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Image alt="img" src="https://picsum.photos/200/300" />);

    expect(container).toMatchSnapshot();
  });

  test('renders with ratio correctly', () => {
    const width = 200;
    const ratio = 1.5;

    render(<Image alt="image" src="https://picsum.photos/200/300" width={width} ratio={ratio} />);

    expect(screen.getByLabelText('image')).toHaveStyle(`width: ${width}px`);
    expect(screen.getByLabelText('image')).toHaveStyle(`height: ${width * ratio}px`);
  });
});
