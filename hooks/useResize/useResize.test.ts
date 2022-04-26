import { act, fireEvent, renderHook } from '@testing-library/react';
import { EmptyObject } from '@/types';
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

jest.mock('react', () => ({
  ...(jest.requireActual('react') as EmptyObject),
  useRef: jest.fn().mockImplementation(() => mockUseResizeValue)
}));

describe('Tests useResize hook', () => {
  test('works hook correctly', async () => {
    const { result } = renderHook(() => useResize(mockUseResizeValue));

    act(() => {
      windowResize(500, 1000);
    });

    expect((result.current as ClientRect).width).toBe(500);
    expect((result.current as ClientRect).height).toBe(1000);
  });
});
