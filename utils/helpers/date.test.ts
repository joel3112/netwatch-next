import { durationFromMinutes, formatDate, yearsFromNow } from '@/utils/helpers/date';

describe('Date helper methods', () => {
  describe('formatDate', () => {
    test('returns empty when date is null', () => {
      expect(formatDate(null, 'es')).toBe('');
    });
    test('returns formatted date', () => {
      expect(formatDate('2019-01-01', 'es')).toBe('1 ene 2019');
    });
  });

  describe('durationFromMinutes', () => {
    test('returns only minutes', () => {
      expect(durationFromMinutes(40)).toStrictEqual({ hours: 0, minutes: 40 });
    });
    test('returns only hours', () => {
      expect(durationFromMinutes(60)).toStrictEqual({ hours: 1, minutes: 0 });
    });
    test('returns hours and minutes', () => {
      expect(durationFromMinutes(78)).toStrictEqual({ hours: 1, minutes: 18 });
    });
  });

  describe('yearsFromNow', () => {
    test('returns 0 when date is null', () => {
      expect(yearsFromNow(null)).toBe(0);
    });
    test('returns years from date', () => {
      const currentYear = new Date().getFullYear();
      const date = '2019-08-01';
      const year = new Date(date).getFullYear();
      expect(yearsFromNow('2019-08-01')).toBe(currentYear - year);
    });
  });
});
