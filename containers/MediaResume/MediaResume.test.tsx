import { render } from '@testing-library/react';
import MediaResume from '@/containers/MediaResume/MediaResume';

describe('Tests MediaResume component', () => {
  test('renders component correctly', () => {
    const { container } = render(<MediaResume>Test</MediaResume>);

    expect(container).toMatchSnapshot();
  });
});
