import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { FunctionGeneric } from '@/types';
import useRedux from '@/hooks/useRedux/useRedux';

const mockUseDispatchValue = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn().mockImplementation(() => mockUseDispatchValue)
}));

describe('Tests useRedux hook', () => {
  test('returns state correctly', () => {
    (useSelector as jest.Mock).mockImplementation((callback: FunctionGeneric) =>
      callback('example')
    );
    const { result } = renderHook(() => useRedux());

    expect(result.current.state).toStrictEqual('example');
  });

  test('returns state with path correctly', () => {
    (useSelector as jest.Mock).mockImplementation((callback: FunctionGeneric) =>
      callback({ theme: { mode: 'dark' } })
    );
    const { result } = renderHook(() => useRedux('theme'));

    expect(result.current.state).toStrictEqual({ mode: 'dark' });
  });

  test('returns dispatch method correctly', () => {
    const { result } = renderHook(() => useRedux());

    expect(result.current.dispatch).toStrictEqual(mockUseDispatchValue);
  });
});
