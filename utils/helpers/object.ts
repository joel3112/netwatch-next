import * as _ from 'lodash';

export const getPropValue = (
  object: object,
  path: string,
  defaultValue: unknown = undefined
): unknown => {
  return _.get(object, path, defaultValue);
};

export const isEmpty = (object: object): boolean => {
  return !(object && Object.keys(object).length);
};

export const mapValuesBy = (object: object, callback: (value: unknown) => unknown): object => {
  return _.mapValues(object, callback);
};
