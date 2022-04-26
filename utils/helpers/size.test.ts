import utils from '@/utils/helpers/size';

describe('Size helper methods', () => {
  describe('modifierRatio', () => {
    test('returns size ratio respect width', () => {
      expect(utils.modifierRatio('width', 100, 0.5)).toBe(200);
    });
    test('returns size ratio respect height', () => {
      expect(utils.modifierRatio('height', 100, 0.5)).toBe(50);
    });
    test('returns default size', () => {
      expect(utils.modifierRatio('width', 'auto')).toBe('auto');
    });
  });

  describe('validateSize', () => {
    test('returns size with suffix px', () => {
      expect(utils.validateSize(100)).toBe('100px');
    });
    test('returns default size', () => {
      expect(utils.validateSize('auto')).toBe('auto');
    });
  });
});
