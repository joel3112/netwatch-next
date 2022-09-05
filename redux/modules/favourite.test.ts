import { MediaData } from '@/types';
import favouriteReducer, { actions, actionTypes, initialValue } from '@/redux/modules/favourite';

const mockMedia = { id: 1, title: 'test' } as unknown as MediaData;

describe('Test favourite redux module', () => {
  describe('reducer', () => {
    test('returns the initial state', () => {
      const result = favouriteReducer(undefined, { type: '@@INIT', item: mockMedia });

      expect(result).toStrictEqual(initialValue);
    });
    test(`returns added state with action type ${actionTypes.ADD}`, () => {
      const result1 = favouriteReducer(undefined, actions.add(mockMedia));

      expect(result1.items.length).toStrictEqual(1);

      const result2 = favouriteReducer(result1, actions.add(mockMedia));

      expect(result2.items.length).toStrictEqual(2);
    });
    test(`returns no removed state with action type ${actionTypes.ADD}`, () => {
      const result1 = favouriteReducer(undefined, actions.add(mockMedia));

      expect(result1.items.length).toStrictEqual(1);

      const result2 = favouriteReducer(result1, actions.remove(mockMedia));

      expect(result2.items.length).toStrictEqual(0);
    });
  });

  describe('actions', () => {
    test(`returns action with type ${actionTypes.ADD}`, () => {
      const result = actions.add(mockMedia);

      expect(result).toHaveProperty('type', actionTypes.ADD);
    });
    test(`returns action with type ${actionTypes.REMOVE}`, () => {
      const result = actions.remove(mockMedia);

      expect(result).toHaveProperty('type', actionTypes.REMOVE);
    });
  });
});
