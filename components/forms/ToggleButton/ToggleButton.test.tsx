import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleButton from '@/components/forms/ToggleButton/ToggleButton';

const items = [
  { label: 'Item 1', value: 'item1', selected: false },
  { label: 'Item 2', value: 'item2' }
];

const ToggleButtonItems = () => {
  return items.map(({ label, value, selected }) => (
    <ToggleButton.Item key={value} value={value} selected={selected}>
      {label}
    </ToggleButton.Item>
  ));
};

describe('Tests ToggleButton component', () => {
  test('renders component correctly', () => {
    const { container } = render(<ToggleButton>{ToggleButtonItems()}</ToggleButton>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<ToggleButton>{ToggleButtonItems()}</ToggleButton>);

    expect(screen.getAllByRole('button').length).toBe(items.length);
    expect(screen.getAllByText(/Item [1,2]/i).length).toBe(items.length);
  });

  test('renders children with child selected', () => {
    items[0].selected = true;

    render(<ToggleButton>{ToggleButtonItems()}</ToggleButton>);

    expect(screen.getByText(items[0].label)).toHaveAttribute('aria-pressed', 'true');
  });

  test('calls onChange prop and selects child', () => {
    const { label, value } = items[0];
    const handleChange = jest.fn();

    render(<ToggleButton onChange={handleChange}>{ToggleButtonItems()}</ToggleButton>);

    userEvent.click(screen.getByText(label));

    expect(handleChange).toHaveBeenCalledWith(value);
    expect(screen.getByText(label)).toHaveAttribute('aria-pressed', 'true');
  });
});
