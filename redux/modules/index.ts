import { combineReducers } from 'redux';
import scrollToReducer, { onChangeScrollToState, ScrollToState } from '@/redux/modules/scrollTo';
import themeReducer, { onChangeThemeState, ThemeState } from '@/redux/modules/theme';
import { EmptyObject } from '@/types';

export type ReduceSelector = 'scrollTo' | 'theme';
export type ReduceSelectorState = ScrollToState | ThemeState | EmptyObject;

export type ReduceSelectors = {
  scrollTo?: ScrollToState;
  theme?: ThemeState;
};

export const onChangeState = {
  scrollTo: onChangeScrollToState,
  theme: onChangeThemeState
};

export default combineReducers({
  scrollTo: scrollToReducer,
  theme: themeReducer
});
