import themeReducer, { actions, actionTypes, initialValue, Theme } from '@/redux/modules/theme';

const darkExpected = {
  darkMode: true,
  keyMode: 'dark',
  darkModeSystem: false,
  syncSystemTheme: false
};
const lightExpected = {
  darkMode: false,
  keyMode: 'light',
  darkModeSystem: false,
  syncSystemTheme: false
};

describe('Test theme redux module', () => {
  describe('reducer', () => {
    test('returns the initial state', () => {
      const result = themeReducer(undefined, { type: '@@INIT', theme: Theme.AUTO });

      expect(result).toStrictEqual(initialValue);
    });
    test(`returns switched state with action type ${actionTypes.CHANGE}`, () => {
      const result1 = themeReducer(undefined, actions.change(Theme.DARK));

      expect(result1).toStrictEqual(darkExpected);

      const result2 = themeReducer(result1, actions.change(Theme.LIGHT));

      expect(result2).toStrictEqual(lightExpected);

      const result3 = themeReducer(result2, actions.change(Theme.AUTO));

      expect(result3).toStrictEqual(initialValue);
    });
  });

  describe('actions', () => {
    test(`returns action with type ${actionTypes.CHANGE}`, () => {
      const result = actions.change(Theme.LIGHT);

      expect(result).toHaveProperty('type', actionTypes.CHANGE);
    });
  });
});
