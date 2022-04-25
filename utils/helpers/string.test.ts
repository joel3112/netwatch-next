import '@/utils/helpers/string';

describe('String helper methods', () => {
  describe('truncate', () => {
    test('returns a shorter string with limit length', () => {
      expect('Hola mundo'.truncate(7)).toBe('Hola...');
    });
    test('returns a longer string with higher limit length', () => {
      expect('Hola mundo'.truncate(25)).toBe('Hola mundo');
    });
    test('returns a shorter string with negative limit length', () => {
      expect('Hola mundo'.truncate(-5)).toBe('...');
    });
  });

  describe('toCamelCase', () => {
    test('returns a string with format camel case', () => {
      expect('test component'.toCamelCase()).toBe('testComponent');
    });
  });

  describe('toKebabCase', () => {
    test('returns a string with format kebab case', () => {
      expect('test component'.toKebabCase()).toBe('test-component');
    });
  });

  describe('removeSpecialCharacters', () => {
    [
      { text: 'año', removed: 'ñ letter', result: 'ano' },
      { text: 'vergüenza', removed: 'umlaut', result: 'vergueenza' },
      { text: 'aplicación', removed: 'accent mark', result: 'aplicacion' },
      { text: 'äßç', removed: 'another special characters', result: 'aessc' }
    ].forEach(({ text, removed, result }) => {
      test(`returns a string without "${removed}" in word ${text}`, () => {
        expect(text.removeSpecialCharacters()).toBe(result);
      });
    });
  });

  describe('isUrl', () => {
    [
      { text: 'http://www.google.com', correct: true },
      { text: 'facebook.com', correct: false }
    ].forEach(({ text, correct }) => {
      test(`returns ${correct} in word with ${correct ? 'correct' : 'incorrect'} format`, () => {
        expect(text.isUrl()).toBe(correct);
      });
    });
  });

  describe('toBackgroundImageUrl', () => {
    test('returns a background image format in word with correct format url', () => {
      const url = 'http://www.images.com/image1.png';
      expect(url.toBackgroundImageUrl()).toBe(`url(${url})`);
    });
    test('returns a empty string in word with incorrect format url', () => {
      expect('facebook.com'.toBackgroundImageUrl()).toBe('');
    });
    test('returns a empty string in empty word', () => {
      expect(''.toBackgroundImageUrl()).toBe('');
    });
  });
});
