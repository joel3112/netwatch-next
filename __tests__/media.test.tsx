import { render } from '@testing-library/react';
import MediaPage from '@/pages/[mediaType]';
import { MediaType } from '@/types';

describe('Tests movies page', () => {
  test('renders page correctly', () => {
    const { container } = render(<MediaPage type={MediaType.MOVIE} />);

    expect(container).toMatchSnapshot();
  });
});

describe('Tests tvs page', () => {
  test('renders page correctly', () => {
    const { container } = render(<MediaPage type={MediaType.TV} />);

    expect(container).toMatchSnapshot();
  });
});
