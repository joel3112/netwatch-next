import { fireEvent, renderHook } from '@testing-library/react';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { BREAKPOINTS as breakpointRules } from '@/utils/constants';

describe('Tests useBreakpoint hook', () => {
  Object.entries(breakpointRules).forEach(([key, { name, width }]) => {
    test(`works hook with ${key} viewport correctly`, () => {
      window.resizeTo(800, 300);

      fireEvent.resize(window, { target: { innerWidth: width + 100 } });

      const { result } = renderHook(() => useBreakpoint());

      expect(result.current).toHaveProperty('key', name);
    });
  });
});
