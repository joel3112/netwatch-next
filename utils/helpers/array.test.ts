import '@/utils/helpers/array';

describe('Array helper methods', () => {
  describe('isEmpty', () => {
    test('returns true in empty array', () => {
      expect([].isEmpty()).toBeTruthy();
    });
    test('returns true in array with empty values', () => {
      expect([undefined, '', null].isEmpty()).toBeTruthy();
    });
    test('returns false in array with not empty values', () => {
      expect([1, undefined, 2, '', 3].isEmpty()).toBeFalsy();
    });
  });

  describe('first', () => {
    test('returns first element in not empty array', () => {
      expect([1, 2, 3].first()).toBe(1);
    });
    test('returns undefined in empty array', () => {
      expect([].first()).toBe(undefined);
    });
  });

  describe('last', () => {
    test('returns last element in not empty array', () => {
      expect([1, 2, 3].last()).toBe(3);
    });
    test('returns undefined in empty array', () => {
      expect([].last()).toBe(undefined);
    });
  });

  describe('get', () => {
    test('returns the element by position in not empty array', () => {
      expect([1, 2, 3].get(2)).toBe(3);
    });
    test('returns the element by negative position in not empty array from the end ', () => {
      expect([1, 2, 3, 4].get(-2)).toBe(3);
    });
    test('returns undefined in empty array', () => {
      expect([].get(1)).toBe(undefined);
    });
  });

  describe('remove', () => {
    test('returns an array without element by position in not empty array', () => {
      expect([1, 2, 3].remove(1)).toStrictEqual([1, 3]);
    });
    test('returns an array without last element by higher position in not empty array', () => {
      expect([1, 2, 3].remove(10)).toStrictEqual([1, 2]);
    });
    test('returns an array with same elements by negative position in not empty array', () => {
      expect([1, 2, 3].remove(-10)).toStrictEqual([1, 2, 3]);
    });
    test('returns an empty array in empty array', () => {
      expect([].remove(1)).toStrictEqual([]);
    });
  });

  describe('uniq', () => {
    test('returns an array without duplicated elements in not empty array', () => {
      expect([1, 2, 1, 1, 3, 1].uniq()).toStrictEqual([1, 2, 3]);
    });
    test('returns an array with the same elements in not empty array', () => {
      expect([1, 2, 3].uniq()).toStrictEqual([1, 2, 3]);
    });
    test('returns an empty array in empty array', () => {
      expect([].uniq()).toStrictEqual([]);
    });
  });

  describe('compact', () => {
    test('returns an array without empty elements in not empty array', () => {
      expect([1, undefined, 2, '', 3, null].compact()).toStrictEqual([1, 2, 3]);
    });
    test('returns an array with the same elements in not empty array', () => {
      expect([1, 2, 3].compact()).toStrictEqual([1, 2, 3]);
    });
    test('returns an empty array in empty array', () => {
      expect([].compact()).toStrictEqual([]);
    });
  });

  describe('multiply', () => {
    test('returns an array (one element) with the content multiply by size', () => {
      expect([true].multiply(3)).toStrictEqual([true, true, true]);
    });
    test('returns an array (more then one element) with the content multiply by size', () => {
      expect([1, 2].multiply(2)).toStrictEqual([1, 2, 1, 2]);
    });
    test('returns an array with the same content multiply by one', () => {
      expect(['a'].multiply(1)).toStrictEqual(['a']);
    });
    test('returns an empty array multiply by zero', () => {
      expect(['hola'].multiply(0)).toStrictEqual([]);
    });
  });

  describe('truncate', () => {
    test('returns an array with specific limit size in not empty array', () => {
      expect([1, 2, 3, 4].truncate(3)).toStrictEqual([1, 2, 3]);
    });
    test('returns the same array with specific higher limit size in not empty array', () => {
      expect([1, 2, 3].truncate(10)).toStrictEqual([1, 2, 3]);
    });
    test('returns an empty array with specific negative limit size in not empty array', () => {
      expect([1, 2, 3].truncate(-5)).toStrictEqual([]);
    });
    test('returns an empty array in empty array', () => {
      expect([].truncate(3)).toStrictEqual([]);
    });
  });

  describe('split', () => {
    test('returns two arrays with specific index in not empty array', () => {
      expect([1, 2, 3, 4].split(2)).toStrictEqual([[1, 2, 3], [4]]);
    });
    test('returns two arrays with specific callback in not empty array', () => {
      expect([1, 2, 3, 4].split((i: number) => i > 2)).toStrictEqual([
        [3, 4],
        [1, 2]
      ]);
    });
    test('returns two empty arrays in empty array', () => {
      expect([].split(3)).toStrictEqual([[], []]);
    });
    test('returns the same array without criteria', () => {
      const arr = [1, 2, 3, 4];

      expect(arr.split()).toStrictEqual(arr);
    });
  });

  describe('sortObjectsBy', () => {
    test('returns array object sorted descending', () => {
      expect(
        [
          {
            name: 'b'
          },
          {
            name: 'c'
          },
          {
            name: 'a'
          }
        ].sortObjectsBy('name', true)
      ).toStrictEqual([
        {
          name: 'c'
        },
        {
          name: 'b'
        },
        {
          name: 'a'
        }
      ]);
    });
  });
  test('returns array object sorted ascending', () => {
    expect(
      [
        {
          name: 'b'
        },
        {
          name: 'c'
        },
        {
          name: 'a'
        }
      ].sortObjectsBy('name')
    ).toStrictEqual([
      {
        name: 'a'
      },
      {
        name: 'b'
      },
      {
        name: 'c'
      }
    ]);
  });
});
