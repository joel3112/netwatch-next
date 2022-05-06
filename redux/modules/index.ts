import { combineReducers } from 'redux';
import { EmptyObject } from '@/types';
import scrollToReducer, { onChangeScrollToState, ScrollToState } from '@/redux/modules/scrollTo';
import themeReducer, { onChangeThemeState, ThemeState } from '@/redux/modules/theme';
import paginationReducer, { PaginationState } from '@/redux/modules/pagination';

export type ReduceSelector = 'scrollTo' | 'theme' | 'pagination';
export type ReduceSelectorState = ScrollToState | ThemeState | PaginationState | EmptyObject;

export type ReduceSelectors = {
  scrollTo?: ScrollToState;
  theme?: ThemeState;
  pagination?: PaginationState;
};

export const onChangeState = {
  scrollTo: onChangeScrollToState,
  theme: onChangeThemeState
};

export default combineReducers({
  scrollTo: scrollToReducer,
  theme: themeReducer,
  pagination: paginationReducer
});
