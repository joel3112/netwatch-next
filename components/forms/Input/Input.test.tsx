import { fireEvent, render, screen } from '@testing-library/react';
import { BiSearch } from 'react-icons/bi';
import Input from '@/components/forms/Input/Input';

const name = 'name';
const placeholderText = 'placeholder';
const keyText = 'esc';
const handleChange = jest.fn();

describe('Tests Input component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Input name={name} />);

    expect(container).toMatchSnapshot();
  });

  test('renders component correctly', () => {
    render(<Input name={name} />);

    expect(screen.getByLabelText(name)).toBeInTheDocument();
  });

  test('renders component disabled correctly', () => {
    render(<Input name={name} disabled />);

    expect(screen.getByLabelText(name)).toBeDisabled();
  });

  test('renders component with placeholder correctly', () => {
    render(<Input name={name} placeholder={placeholderText} />);

    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  test('renders component with hot key correctly', () => {
    render(<Input name={name} hotKey={keyText} />);

    expect(screen.getByText(keyText)).toBeInTheDocument();
  });

  test('renders component with value correctly', () => {
    render(<Input name={name} value="test" />);

    expect(screen.getByLabelText(name)).toHaveValue('test');
  });

  test('calls onChange prop correctly', () => {
    render(<Input name={name} onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText(name), { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalled();
  });
});
