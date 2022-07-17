import { render, screen } from '@testing-library/react';
import MediaAutocomplete from '@/containers/MediaAutocomplete/MediaAutocomplete';

describe('Tests MediaAutocomplete component', () => {
  test('renders component correctly', () => {
    const { container } = render(<MediaAutocomplete>Test</MediaAutocomplete>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<MediaAutocomplete>Test</MediaAutocomplete>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
