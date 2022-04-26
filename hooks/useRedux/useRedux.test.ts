import { renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { FunctionGeneric } from '@/types';
import { useRedux } from '@/hooks/useRedux';

const mockUseDispatchValue = jest.fn();

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
    (useDispatch as jest.Mock).mockImplementation(() => mockUseDispatchValue);

    const { result } = renderHook(() => useRedux());

    expect(result.current.dispatch).toStrictEqual(mockUseDispatchValue);
  });
});
