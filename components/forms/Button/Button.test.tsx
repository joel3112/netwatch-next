import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/forms/Button/Button';

describe('Tests Button component', () => {
  const textButton = 'Cancel';

  test('renders component correctly', () => {
    const { container } = render(<Button>Test</Button>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<Button>{textButton}</Button>);

    expect(screen.getByText(textButton)).toBeInTheDocument();
  });

  test('calls onClick prop correctly', async () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>{textButton}</Button>);

    expect(handleClick).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByText(textButton));

    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  test('renders disabled correctly', () => {
    render(<Button disabled>{textButton}</Button>);

    expect(screen.getByText(textButton)).toBeDisabled();
  });
});
