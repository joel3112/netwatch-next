import { Action } from 'redux';
import { MediaData } from '@/types';

const FAVOURITE_STORAGE_KEY = 'favourites';

export type FavouriteState = {
  items: MediaData[];
};

export type FavouriteAction = Action & {
  item: MediaData;
};

// Constants
const defaultFavourite = () => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem(FAVOURITE_STORAGE_KEY);

    if (storedTheme) {
      const parsed = JSON.parse(storedTheme);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  }
  return [];
};

export const initialValue: FavouriteState = {
  items: defaultFavourite() as MediaData[]
};

// Actions
export enum actionTypes {
  ADD = 'favourite/ADD',
  REMOVE = 'favourite/REMOVE'
}

// Reducer
export default function reducer(
  state: FavouriteState = initialValue,
  action: FavouriteAction
): FavouriteState {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        items: [...state.items, action.item]
      };
    case actionTypes.REMOVE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.item.id)
      };
    default:
      return state;
  }
}

// Action creators
export const actions = {
  add: (item: MediaData): FavouriteAction => ({ type: actionTypes.ADD, item }),
  remove: (item: MediaData): FavouriteAction => ({ type: actionTypes.REMOVE, item })
};

// Subscribe changes
export const onChangeFavoriteState = ({ favourite }: { favourite: FavouriteState }) => {
  const { items } = favourite;

  localStorage.setItem(FAVOURITE_STORAGE_KEY, JSON.stringify(items));
};
