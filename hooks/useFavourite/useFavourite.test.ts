import { act, renderHook } from '@testing-library/react';
import { MediaData } from '@/types';
import { actions } from '@/redux/modules/favourite';
import { useFavourite } from '@/hooks/useFavourite';

const mockMedia = { id: 1, title: 'test' } as unknown as MediaData;

const mockStateValue = {
  items: []
};
const mockDispatchValue = jest.fn();

jest.mock('@/hooks/useRedux', () => ({
  useRedux: jest.fn().mockImplementation(() => ({
    state: mockStateValue,
    dispatch: mockDispatchValue
  }))
}));

describe('Tests useFavourite hook', () => {
  test('works hook correctly', () => {
    const { result } = renderHook(() => useFavourite());

    expect(result.current.items).toStrictEqual(mockStateValue.items);
  });

  test('add favourite correctly', () => {
    const { result } = renderHook(() => useFavourite());

    act(() => {
      result.current.onAdd(mockMedia);
    });

    expect(mockDispatchValue).toBeCalledWith(actions.add(mockMedia));
  });

  test('remove favourite correctly', () => {
    const { result } = renderHook(() => useFavourite());

    act(() => {
      result.current.onRemove(mockMedia);
    });

    expect(mockDispatchValue).toBeCalledWith(actions.remove(mockMedia));
  });
});
