import * as _ from 'lodash';

export const getPropValue = <T = object, U = unknown>(
  object: T,
  path: string,
  defaultValue?: U
): U => {
  return _.get(object, path, defaultValue);
};

export const isEmpty = <T = object>(object: T): boolean => {
  return !(object && Object.keys(object).length);
};

export const mapValuesBy = <T extends object, U extends object>(
  object: T,
  callback: (value: unknown) => unknown
): U => {
  return _.mapValues(object, callback) as U;
};
