import { Action } from 'redux';
import { EmptyObject, MediaTypeKey } from '@/types';

export type PaginationState<T = EmptyObject> = {
  [key in MediaTypeKey]?: {
    [key: string]: Array<T>;
  };
};

type PaginationAction<T = EmptyObject> = Action & {
  payload: {
    mediaType: MediaTypeKey;
    page?: number;
    items?: Array<T>;
  };
};

// Constants
export const initialValue: PaginationState = {};

// Actions
export enum actionTypes {
  ADD = 'pagination/ADD'
}

// Reducer
export default function reducer(state = initialValue, action: PaginationAction): PaginationState {
  const { payload } = action;

  if (action.type === actionTypes.ADD) {
    if (payload.mediaType && payload.page && payload.items) {
      return {
        ...state,
        [payload.mediaType]: {
          ...state[payload.mediaType],
          [Number(payload.page)]: payload.items
        }
      };
    }
  }
  return state;
}

// Action Creators
export const actions = {
  add<T>(mediaType: MediaTypeKey, page: number, items: Array<T>): PaginationAction {
    return {
      type: actionTypes.ADD,
      payload: {
        mediaType,
        page,
        items
      }
    };
  }
};
