import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Closable from '@/components/layout/Closable/Closable';

describe('Tests Closable component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Closable heading="heading" />);

    expect(container).toMatchSnapshot();
  });

  test('renders heading correctly', () => {
    const heading = 'heading';

    render(<Closable heading={heading} />);

    expect(screen.getByText(heading)).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    const content = 'content';

    render(<Closable>{content}</Closable>);

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  test('calls onClose prop correctly', async () => {
    const handleClose = jest.fn();

    render(<Closable onClose={handleClose} />);

    expect(handleClose).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByLabelText('close'));

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
