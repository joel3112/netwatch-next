import { render, screen } from '@testing-library/react';
import Heading, { HeadingSize } from '@/components/typography/Heading/Heading';

describe('Tests Heading component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Heading>Test</Heading>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<Heading>Title</Heading>);

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  [1, 2, 3, 4, 5, 6].forEach((level) => {
    test(`renders component with level ${level} correctly`, () => {
      const { container } = render(
        <Heading level={level as keyof typeof HeadingSize}>Title</Heading>
      );

      expect(container).toContainHTML(`h${level}`);
    });
  });
});
