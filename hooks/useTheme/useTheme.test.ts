import { act, renderHook, waitFor } from '@testing-library/react';
import { actions, Theme } from '@/redux/modules/theme';
import { useTheme } from '@/hooks/useTheme';

const mockStateValue = {
  keyMode: 'light',
  darkMode: false
};
const mockDispatchValue = jest.fn();

jest.mock('@/hooks/useRedux', () => ({
  useRedux: jest.fn().mockImplementation(() => ({
    state: mockStateValue,
    dispatch: mockDispatchValue
  }))
}));

describe('Tests useTheme hook', () => {
  test('works hook correctly', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe(mockStateValue.keyMode);
    expect(result.current.darkMode).toBe(mockStateValue.darkMode);
  });

  test('toggles theme correctly', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.onChangeTheme(Theme.LIGHT);
    });

    expect(mockDispatchValue).toBeCalledWith(actions.change(Theme.LIGHT));
  });

  test('toggles in theme auto sync with system mode correctly', async () => {
    const { result } = renderHook(() => useTheme());

    result.current.onChangeTheme(Theme.AUTO);

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { matches: false } }));

    await waitFor(() => {
      expect(mockDispatchValue).toBeCalledWith(actions.change(Theme.AUTO));
    });
  });
});
