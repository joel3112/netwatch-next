import { screen } from '@testing-library/react';
import Layout from '@/containers/Layout/Layout';
import { renderRedux } from '@/utils/tests';

describe('Tests Layout component', () => {
  test('renders container correctly', () => {
    const { container } = renderRedux(<Layout>Content</Layout>);

    expect(container).toMatchSnapshot();
  });

  test('renders header title correctly', () => {
    renderRedux(<Layout>Content</Layout>);

    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  test('renders content correctly', () => {
    renderRedux(<Layout>Content</Layout>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
