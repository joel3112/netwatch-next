import { Action } from 'redux';
import { ThemeMode } from '@/types';

const THEME_STORAGE_KEY = 'theme';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

export type ThemeState = {
  keyMode: ThemeMode;
  darkMode: boolean;
  darkModeSystem: boolean;
  syncSystemTheme: boolean;
};

export type ThemeAction = Action & {
  theme: ThemeMode;
  darkModeSystem?: boolean;
};

// Constants
export const isDarkModeSystem = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = () => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme) return storedTheme;
  }
  return Theme.AUTO;
};

export const isDarkMode = (key: ThemeMode) =>
  key === Theme.AUTO ? isDarkModeSystem() : key === Theme.DARK;

export const initialValue: ThemeState = {
  keyMode: defaultTheme() as ThemeMode,
  darkMode: isDarkMode(defaultTheme() as ThemeMode),
  darkModeSystem: isDarkModeSystem(),
  syncSystemTheme: true
};

// Actions
export enum actionTypes {
  CHANGE = 'theme/CHANGE'
}

// Reducer
export default function reducer(state = initialValue, action: ThemeAction): ThemeState {
  switch (action.type) {
    case actionTypes.CHANGE:
      return {
        ...state,
        keyMode: action.theme,
        darkMode: isDarkMode(action.theme as ThemeMode),
        darkModeSystem: Boolean(action.darkModeSystem),
        syncSystemTheme: action.theme === Theme.AUTO
      };
    default:
      return state;
  }
}

// Action creators
export const actions = {
  change(theme: ThemeMode, windowMatches?: boolean): ThemeAction {
    return { type: actionTypes.CHANGE, theme, darkModeSystem: Boolean(windowMatches) };
  }
};

// Subscribe changes
export const onChangeThemeState = ({ theme }: { theme: ThemeState }) => {
  const { keyMode } = theme;

  localStorage.setItem(THEME_STORAGE_KEY, keyMode);
};
