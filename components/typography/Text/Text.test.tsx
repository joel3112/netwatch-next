import { render, screen } from '@testing-library/react';
import Text from '@/components/typography/Text/Text';

describe('Tests Text component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Text>Test</Text>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<Text>Example</Text>);

    expect(screen.getByText('Example')).toBeInTheDocument();
  });

  test('renders truncate correctly', () => {
    const message =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi eget consectetur porta, nisl nisi aliquam eros, eget tincidunt nisl nisi eget.';

    render(<Text truncateTo={10}>{message}</Text>);

    expect(screen.getByText(message.truncate(10))).toBeInTheDocument();
  });
});
