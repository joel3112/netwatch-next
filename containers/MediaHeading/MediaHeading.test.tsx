import { render, screen } from '@testing-library/react';
import MediaHeading from '@/containers/MediaHeading/MediaHeading';

describe('Tests MediaHeading component', () => {
  test('renders component correctly', () => {
    const { container } = render(<MediaHeading>Test</MediaHeading>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<MediaHeading>Test</MediaHeading>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
