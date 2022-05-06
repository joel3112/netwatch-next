import paginationReducer, { actions, actionTypes, initialValue } from '@/redux/modules/pagination';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const moviesExpected = {
  movie: { 1: items }
};

describe('Test pagination redux module', () => {
  describe('reducer', () => {
    test('returns the initial state', () => {
      const result = paginationReducer(undefined, {
        type: '@@INIT',
        payload: {
          mediaType: 'movie'
        }
      });

      expect(result).toStrictEqual(initialValue);
    });
    test(`returns new state with action type ${actionTypes.ADD}`, () => {
      const result = paginationReducer(undefined, actions.add('movie', 1, items));

      expect(result).toStrictEqual(moviesExpected);
    });
  });

  describe('actions', () => {
    test(`returns action with type ${actionTypes.ADD}`, () => {
      const result = actions.add('movie', 1, items);

      expect(result).toStrictEqual({
        type: actionTypes.ADD,
        payload: {
          mediaType: 'movie',
          page: 1,
          items
        }
      });
    });
  });
});
