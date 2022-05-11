import { getBreakpointRuleBy } from '@/utils/helpers/breakpoint';

describe('Breakpoint helper methods', () => {
  describe('getBreakpointRuleBy', () => {
    test('returns items in empty object', () => {
      const expected = {
        xs: 2,
        sm: 3,
        md: 4,
        lg: 5,
        xl: 6
      };

      expect(getBreakpointRuleBy('items')).toStrictEqual(expected);
    });
    test('returns width in empty object', () => {
      const expected = {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536
      };

      expect(getBreakpointRuleBy('width')).toStrictEqual(expected);
    });
  });
});
