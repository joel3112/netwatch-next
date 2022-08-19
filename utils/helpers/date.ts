import { DateTime, Duration, DurationObjectUnits } from 'luxon';

export const formatDate = (date: string | null, locale: string): string => {
  return date ? DateTime.fromISO(date).setLocale(locale).toLocaleString(DateTime.DATE_MED) : '';
};

export const durationFromMinutes = (minutes: number): DurationObjectUnits => {
  return Duration.fromObject({ minutes }).shiftTo('hours', 'minutes').toObject();
};

export const yearsFromNow = (date: string | null, end?: string | null): number => {
  if (!date) {
    return 0;
  }
  if (end) {
    return Math.floor(
      Math.abs(DateTime.fromISO(date).diff(DateTime.fromISO(end), ['years']).years)
    );
  }
  return Math.floor(Math.abs(DateTime.fromISO(date).diffNow('years').years));
};
