import { UIEvent } from 'react';
import { act, renderHook } from '@testing-library/react';
import { actions } from '@/redux/modules/scrollTo';
import { useScroll } from '@/hooks/useScroll';

jest.mock('next/router', () => require('next-router-mock'));

const container = document.createElement('div');
const mockStateValue = {
  scrollPosition: 0,
  forceTop: false
};
const mockDispatchValue = jest.fn();

jest.mock('@/hooks/useRedux/useRedux', () => ({
  useRedux: jest.fn().mockImplementation(() => ({
    state: mockStateValue,
    dispatch: mockDispatchValue
  }))
}));

describe('Tests useScroll hook', () => {
  test('works hook correctly', () => {
    const { result } = renderHook(() => useScroll(container));

    expect(result.current.scrollPosition).toBe(0);
    expect(result.current.forceTop).toBeFalsy();
  });

  test('dispatches scroll position', () => {
    const { result } = renderHook(() => useScroll(container));

    act(() => {
      result.current.onScroll({ currentTarget: { scrollTop: 100 } } as UIEvent<HTMLDivElement>);
    });

    expect(mockDispatchValue).toHaveBeenCalledWith(
      actions.scroll(container as HTMLDivElement, 100)
    );
  });

  test('dispatches reset scroll position', () => {
    const { result } = renderHook(() => useScroll(container));

    act(() => {
      result.current.onResetScroll();
    });

    expect(mockDispatchValue).toHaveBeenCalledWith(actions.reset(container as HTMLDivElement));
  });
});
