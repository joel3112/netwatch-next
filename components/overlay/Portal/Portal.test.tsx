import { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/forms/Button/Button';
import Portal from '@/components/overlay/Portal/Portal';

const handlerText = 'Open';
const portalContent = 'Content';

const PaperMock = ({ children }: { children: ReactNode }) => (
  <div>
    <span>{children}</span>
  </div>
);

const handler = () => (
  <Portal.Handler>
    <Button>{handlerText}</Button>
  </Portal.Handler>
);
const paper = () => (
  <Portal.Paper>
    <PaperMock>{portalContent}</PaperMock>
  </Portal.Paper>
);

describe('Tests Portal component', () => {
  test('renders component correctly', () => {
    const { container } = render(
      <Portal opened>
        {handler()}
        {paper()}
      </Portal>
    );

    expect(container).toMatchSnapshot();
  });

  test('renders content correctly', () => {
    render(
      <Portal opened>
        {handler()}
        {paper()}
      </Portal>
    );

    expect(screen.getByText(portalContent)).toBeInTheDocument();
  });

  test('calls onChange prop correctly', async () => {
    const handleChange = jest.fn();

    render(
      <Portal onChange={handleChange}>
        {handler()}
        {paper()}
      </Portal>
    );

    userEvent.click(screen.getByText(handlerText));

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  test('opens paper correctly', () => {
    render(
      <Portal>
        {handler()}
        {paper()}
      </Portal>
    );

    userEvent.click(screen.getByText(handlerText));

    expect(screen.getByText(portalContent)).toBeInTheDocument();
  });
});
