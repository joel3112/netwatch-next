import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drawer from '@/components/overlay/Drawer/Drawer';

const portalHeading = 'Panel';
const portalContent = 'Content';

const content = () => <div>{portalContent}</div>;

describe('Tests Drawer component', () => {
  test('renders component correctly', () => {
    const { container } = render(<Drawer opened>Test</Drawer>);

    expect(container).toMatchSnapshot();
  });

  test('renders component correctly', () => {
    render(
      <Drawer opened heading={portalHeading}>
        {content()}
      </Drawer>
    );

    expect(screen.getByText(portalHeading)).toBeInTheDocument();
    expect(screen.getByText(portalContent)).toBeInTheDocument();
  });

  test('closes portal correctly', async () => {
    render(
      <Drawer opened heading={portalHeading}>
        {content()}
      </Drawer>
    );

    expect(screen.getByText(portalContent)).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('close'));

    await waitFor(() => {
      expect(screen.queryByText(portalContent)).not.toBeInTheDocument();
    });
  });
});
