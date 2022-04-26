import { act, fireEvent, renderHook } from '@testing-library/react';
import { useResize } from '@/hooks/useResize';

const container = document.body;
const mockUseResizeValue = { current: container };

const windowResize = (width: number, height: number): void => {
  Object.defineProperty(container, 'getBoundingClientRect', {
    configurable: true,
    value: jest.fn().mockImplementation(() => ({ width, height }))
  });

  fireEvent.resize(window);
};

describe('Tests useResize hook', () => {
  test('works hook correctly', async () => {
    const { result } = renderHook(() => useResize(mockUseResizeValue));

    act(() => {
      windowResize(500, 1000);
    });

    expect((result.current as DOMRect).width).toBe(500);
    expect((result.current as DOMRect).height).toBe(1000);
  });
});
