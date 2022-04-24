import { render, screen } from '@testing-library/react';
import Space, { positions, DirectionSpace, PositionSpace } from '@/components/layout/Space/Space';

describe('Tests Space component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Space>Test</Space>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<Space>Test</Space>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  (['row', 'column'] as Array<DirectionSpace>).forEach((direction) => {
    test(`renders with style "flex-direction: ${direction}" with direction prop to ${direction}`, () => {
      render(<Space direction={direction}>Test</Space>);

      expect(screen.getByText('Test')).toHaveStyle(`flex-direction: ${direction}`);
    });
  });

  (['row', 'column'] as Array<DirectionSpace>).forEach((direction) => {
    test(`renders with style "flex-direction: ${direction}-reverse" with direction prop to ${direction} and reverse prop to true`, () => {
      render(
        <Space direction={direction} reverse>
          Test
        </Space>
      );

      expect(screen.getByText('Test')).toHaveStyle(`flex-direction: ${direction}-reverse`);
    });
  });

  (Object.keys(positions) as Array<PositionSpace>).forEach((justify) => {
    test(`renders with style "justify-content: ${positions[justify]}" with justify prop to ${justify}`, () => {
      render(<Space justify={justify}>Test</Space>);

      expect(screen.getByText('Test')).toHaveStyle(`justify-content: ${positions[justify]}`);
    });
  });

  (Object.keys(positions) as Array<PositionSpace>).forEach((align) => {
    test(`renders with style "align-items: ${positions[align]}" with align prop to ${align}`, () => {
      render(<Space align={align}>Test</Space>);

      expect(screen.getByText('Test')).toHaveStyle(`align-items: ${positions[align]}`);
    });
  });

  ['nowrap', 'wrap'].forEach((wrap, index) => {
    test(`renders with style "flex-wrap: ${wrap}" with wrap prop to ${Boolean(index)}`, () => {
      render(<Space wrap={Boolean(index)}>Test</Space>);

      expect(screen.getByText('Test')).toHaveStyle(`flex-wrap: ${wrap}`);
    });
  });

  test('renders with style "gap" with gap prop', () => {
    const gap = 5;
    render(<Space gap={gap}>Test</Space>);

    expect(screen.getByText('Test')).toHaveStyle(`gap: ${gap}px`);
  });

  test('renders with style "gap" with gap prop with multiple value', () => {
    const gap = [5, 10];
    render(<Space gap={gap}>Test</Space>);

    expect(screen.getByText('Test')).toHaveStyle(`gap: ${gap[0]}px ${gap[1]}px`);
  });
});
