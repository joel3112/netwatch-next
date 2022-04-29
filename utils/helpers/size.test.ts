import { modifierRatio, validateSize } from '@/utils/helpers/size';

describe('Size helper methods', () => {
  describe('modifierRatio', () => {
    test('returns size ratio respect width', () => {
      expect(modifierRatio('width', 100, 0.5)).toBe(200);
    });
    test('returns size ratio respect height', () => {
      expect(modifierRatio('height', 100, 0.5)).toBe(50);
    });
    test('returns default size', () => {
      expect(modifierRatio('width', 'auto')).toBe('auto');
    });
  });

  describe('validateSize', () => {
    test('returns size with suffix px', () => {
      expect(validateSize(100)).toBe('100px');
    });
    test('returns default size', () => {
      expect(validateSize('auto')).toBe('auto');
    });
  });
});
