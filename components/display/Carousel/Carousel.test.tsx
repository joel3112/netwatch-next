import { render, screen } from '@testing-library/react';
import Carousel from '@/components/display/Carousel/Carousel';

const items = [...Array(3)].map((_, index) => (
  <Carousel.Item key={index}>item ${index + 1}</Carousel.Item>
));

describe('Tests Carousel component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Carousel>{items}</Carousel>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const spacing = 5;
    render(
      <Carousel spacing={spacing} navigation>
        {items}
      </Carousel>
    );

    const slides = screen.getByRole('list').childNodes[0];

    expect(slides.childNodes.length).toBe(items.length);
  });

  test('renders no children correctly', () => {
    const spacing = [5, 10];
    render(<Carousel spacing={spacing} navigation />);

    const slides = screen.getByRole('list').childNodes[0];

    expect(slides.childNodes.length).toBe(0);
  });
});
