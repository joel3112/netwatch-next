import { render } from '@testing-library/react';
import MediaAutocomplete from '@/containers/MediaAutocomplete/MediaAutocomplete';

describe('Tests MediaAutocomplete component', () => {
  test('renders component correctly', () => {
    const { container } = render(<MediaAutocomplete />);

    expect(container).toMatchSnapshot();
  });
});
