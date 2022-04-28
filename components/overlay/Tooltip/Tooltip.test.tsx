import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '@/components/overlay/Tooltip/Tooltip';

describe('Tests Tooltip component', () => {
  test('renders component correctly', async () => {
    const { container } = render(
      <Tooltip text="Close">
        <button>X</button>
      </Tooltip>
    );

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(
      <Tooltip text="Close">
        <button>X</button>
      </Tooltip>
    );

    expect(screen.getByText('X')).toBeInTheDocument();
  });

  test('renders tooltip correctly', async () => {
    render(
      <Tooltip text="Close">
        <button>X</button>
      </Tooltip>
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.hover(screen.getByText('X'));
    });

    await waitFor(() => {
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });
});
