import * as _ from 'lodash';

declare global {
  interface Array<T> {
    isEmpty(): boolean;
    first(): T;
    last(): T;
    get(position: number): T;
    remove(position: number): Array<T>;
    uniq(): Array<T>;
    compact(): Array<T>;
    multiply(size: number): Array<T>;
    truncate(limit: number): Array<T>;
    split<U>(criteria?: number | ((value: T, index: number) => U)): Array<Array<T | U>>;
    sortObjectsBy(key: keyof T, descending?: boolean): Array<T>;
  }
}

Array.prototype.isEmpty = function () {
  return _.compact(this).length === 0;
};

Array.prototype.first = function () {
  return _.head(this);
};

Array.prototype.last = function () {
  return _.last(this);
};

Array.prototype.get = function (position) {
  return _.nth(this, position);
};

Array.prototype.remove = function (position) {
  const [filtered, removed] = this.split(position);
  return [...filtered.slice(0, -1), ...removed];
};

Array.prototype.uniq = function () {
  return _.uniq(this);
};

Array.prototype.compact = function () {
  return _.compact(this);
};

Array.prototype.multiply = function (size) {
  return Array(size)
    .fill('')
    .reduce((acc) => [...acc, ...this], []);
};

Array.prototype.truncate = function (limit) {
  return this.slice(0, limit);
};

Array.prototype.split = function (criteria) {
  function _split<T>(array: Array<T>, callback: (value: T, index: number) => unknown) {
    const _array = [...array];
    return [_.remove(_array, callback), _array];
  }

  if (typeof criteria == 'function') {
    return _split(this, criteria);
  }
  if (typeof criteria == 'number') {
    const [filtered, removed] = _split(this, (_: unknown, i: number) => i <= criteria);
    return [filtered, removed];
  }
  return this;
};

Array.prototype.sortObjectsBy = function (key, descending = false) {
  return _.orderBy(this, key, descending ? 'desc' : 'asc');
};
