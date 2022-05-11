import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IoMdAdd } from 'react-icons/io';
import Card from '@/components/display/Card/Card';

describe('Tests Card component', () => {
  test('renders component correctly', () => {
    const { container } = render(
      <Card>
        <Card.Image src="https://picsum.photos/200/300" width={50} ratio={1} />
        <Card.Body title="Title" description="Description" />
      </Card>
    );

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(
      <Card>
        <Card.Image src="https://picsum.photos/200/300" width={50} ratio={1} />
        <Card.Body title="Title" />
      </Card>
    );

    expect(screen.getByLabelText('image')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  test('works click on action image ', async () => {
    const handleClick = jest.fn();

    render(
      <Card>
        <Card.Image src="https://picsum.photos/200/300" width={50} ratio={1}>
          <Card.Actions>
            <Card.Actions.Item onClick={handleClick} icon={IoMdAdd} />
          </Card.Actions>
        </Card.Image>
      </Card>
    );

    userEvent.click(screen.getByLabelText('action'));

    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
