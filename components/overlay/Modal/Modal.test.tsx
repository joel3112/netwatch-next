import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '@/components/overlay/Modal/Modal';

const portalContent = 'Content';

const content = () => <div>{portalContent}</div>;

describe('Tests Modal component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Modal opened>Test</Modal>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<Modal opened>{content()}</Modal>);

    expect(screen.getByText(portalContent)).toBeInTheDocument();
  });

  test('closes portal correctly', async () => {
    render(<Modal opened>{content()}</Modal>);

    expect(screen.getByText(portalContent)).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('close'));

    await waitFor(() => {
      expect(screen.queryByText(portalContent)).not.toBeInTheDocument();
    });
  });
});
