import { renderHook } from '@testing-library/react';
import { useSizeRatio } from '@/hooks/useSizeRatio';

describe('Tests useSize hook', () => {
  test('returns default values correctly', () => {
    const { result } = renderHook(() => useSizeRatio({ width: 100, height: 100 }));

    expect(result.current.width).toBe('100px');
    expect(result.current.height).toBe('100px');
  });

  test('returns values with modifier correctly', () => {
    const { result } = renderHook(() =>
      useSizeRatio({
        width: 100,
        ratio: 5
      })
    );

    expect(result.current.width).toBe('100px');
    expect(result.current.height).toBe(`${100 * 5}px`);
  });
});
