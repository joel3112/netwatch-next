import { render, screen } from '@testing-library/react';
import Select from '@/components/forms/Select/Select';

describe('Tests Select component', () => {
  test('renders component correctly', () => {
    const { container } = render(
      <Select>
        <Select.Item value="1">Item 1</Select.Item>
        <Select.Item value="2">Item 2</Select.Item>
      </Select>
    );

    expect(container).toMatchSnapshot();
  });

  test('renders placeholder correctly', () => {
    const placeholder = 'Select an item';

    render(
      <Select placeholder={placeholder}>
        <Select.Item value="1">Item 1</Select.Item>
        <Select.Item value="2">Item 2</Select.Item>
      </Select>
    );

    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  test('renders selected correctly', () => {
    const placeholder = 'Select an item';

    render(
      <Select placeholder={placeholder} value="1">
        <Select.Item value="1">Item 1</Select.Item>
        <Select.Item value="2">Item 2</Select.Item>
      </Select>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
});
