import scrollToReducer, { actions, actionTypes, initialValue } from '@/redux/modules/scrollTo';

const container = document.createElement('div');

describe('Test scrollTo redux module', () => {
  describe('reducer', () => {
    test('returns the initial state', () => {
      const result = scrollToReducer(undefined, { type: '@@INIT', payload: { container: null } });

      expect(result).toStrictEqual(initialValue);
    });
    test(`returns new state with action type ${actionTypes.RESET}`, () => {
      const result = scrollToReducer(undefined, actions.reset(container));

      expect(result).toStrictEqual({
        container,
        forceTop: true,
        scrollPosition: 0
      });
    });
    test(`returns new state with action type ${actionTypes.SCROLL}`, () => {
      const result = scrollToReducer(undefined, actions.scroll(container, 100));

      expect(result).toStrictEqual({
        container,
        forceTop: false,
        scrollPosition: 100
      });
    });
  });

  describe('actions', () => {
    test(`returns action with type ${actionTypes.RESET}`, () => {
      const result = actions.reset(container);

      expect(result).toStrictEqual({ type: actionTypes.RESET, payload: { container } });
    });
    test(`returns action with type ${actionTypes.SCROLL}`, () => {
      const result = actions.scroll(container, 100);

      expect(result).toStrictEqual({
        type: actionTypes.SCROLL,
        payload: { container, scrollPosition: 100 }
      });
    });
  });
});
