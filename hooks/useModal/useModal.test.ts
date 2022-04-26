import { act, renderHook } from '@testing-library/react';
import { useModal } from '@/hooks/useModal';

const openedValue = true;
const onChangeValue = jest.fn();

describe('Tests useModal hook', () => {
  test('works hook correctly', () => {
    const { result } = renderHook(() => useModal(openedValue, onChangeValue));

    expect(result.current.isOpened).toBe(openedValue);
  });

  test('works with open correctly', () => {
    const { result } = renderHook(() => useModal(openedValue, onChangeValue));

    act(() => {
      result.current.handleChange(true);
    });

    expect(result.current.isOpened).toBe(true);
  });

  test('works with close correctly', () => {
    const { result } = renderHook(() => useModal(openedValue, onChangeValue));

    act(() => {
      result.current.handleChange(false);
    });

    expect(result.current.isOpened).toBe(false);
  });
});
