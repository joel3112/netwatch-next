import { Action } from 'redux';

export type ScrollToState = {
  container: HTMLDivElement | null;
  scrollPosition: number;
  forceTop: boolean;
};

type ScrollToAction = Action & {
  payload: Partial<ScrollToState>;
};

// Constants
export const initialValue: ScrollToState = {
  container: null,
  scrollPosition: 0,
  forceTop: false
};

// Actions
export enum actionTypes {
  RESET = 'scrollTo/RESET',
  SCROLL = 'scrollTo/SCROLL'
}

// Reducer
export default function reducer(state = initialValue, action: ScrollToAction): ScrollToState {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.RESET:
      return { ...state, ...payload, forceTop: true };
    case actionTypes.SCROLL:
      return {
        ...state,
        ...payload,
        scrollPosition: Number(payload.scrollPosition),
        forceTop: false
      };
    default:
      return state;
  }
}

// Action creators
export const actions = {
  reset(container: HTMLDivElement): ScrollToAction {
    return { type: actionTypes.RESET, payload: { container } };
  },
  scroll(container: HTMLDivElement, position: number): ScrollToAction {
    return { type: actionTypes.SCROLL, payload: { container, scrollPosition: position } };
  }
};

// Subscribe changes
export const onChangeScrollToState = ({ scrollTo }: { scrollTo: ScrollToState }) => {
  const { container, forceTop } = scrollTo;

  if (forceTop && container) {
    container.scrollTo && container.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
