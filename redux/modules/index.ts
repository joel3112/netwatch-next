import { combineReducers } from 'redux';
import { EmptyObject } from '@/types';
import scrollToReducer, { onChangeScrollToState, ScrollToState } from '@/redux/modules/scrollTo';
import themeReducer, { onChangeThemeState, ThemeState } from '@/redux/modules/theme';
import favouriteReducer, { onChangeFavoriteState, FavouriteState } from './favourite';

export type ReduceSelector = 'scrollTo' | 'theme' | 'favourite';
export type ReduceSelectorState = ScrollToState | ThemeState | FavouriteState | EmptyObject;

export type ReduceSelectors = {
  scrollTo?: ScrollToState;
  theme?: ThemeState;
  favourite?: FavouriteState;
};

export const onChangeState = {
  scrollTo: onChangeScrollToState,
  theme: onChangeThemeState,
  favourite: onChangeFavoriteState
};

export default combineReducers({
  scrollTo: scrollToReducer,
  theme: themeReducer,
  favourite: favouriteReducer
});
