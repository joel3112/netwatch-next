import { fireEvent, render, screen } from '@testing-library/react';
import { BiSearch } from 'react-icons/bi';
import Input from '@/components/forms/Input/Input';

const labelText = 'name';
const placeholderText = 'placeholder';
const keyText = 'esc';
const handleChange = jest.fn();

describe('Tests Input component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Input name="test" />);

    expect(container).toMatchSnapshot();
  });

  test('renders component correctly', () => {
    render(<Input name="test" />);

    expect(screen.getByLabelText(labelText)).toBeInTheDocument();
  });

  test('renders component disabled correctly', () => {
    render(<Input name="test" disabled />);

    expect(screen.getByLabelText(labelText)).toBeDisabled();
  });

  test('renders component with placeholder correctly', () => {
    render(<Input name="test" placeholder={placeholderText} />);

    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  test('renders component with hot key correctly', () => {
    render(<Input name="test" hotKey={keyText} />);

    expect(screen.getByText(keyText)).toBeInTheDocument();
  });

  test('renders component with value correctly', () => {
    render(<Input name="test" value="test" />);

    expect(screen.getByLabelText(labelText)).toHaveValue('test');
  });

  test('calls onChange prop correctly', () => {
    render(<Input name="test" onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText(labelText), { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalled();
  });

  test('focus input when clicked icon correctly', () => {
    render(<Input name="test" icon={BiSearch} />);

    fireEvent.click(screen.getByLabelText('icon'));

    expect(screen.getByLabelText(labelText)).toHaveFocus();
  });
});
