import * as _ from 'lodash';

const getPropValue = (object: object, path: string, defaultValue: unknown = undefined): unknown => {
  return _.get(object, path, defaultValue);
};

const isEmpty = (object: object): boolean => {
  return !(object && Object.keys(object).length);
};

const mapValuesBy = (object: object, callback: (value: object) => unknown): object => {
  return _.mapValues(object, callback);
};

export default { getPropValue, isEmpty, mapValuesBy };
