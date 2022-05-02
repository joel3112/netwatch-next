import { ThemeMode } from '@/types';
import { actions, isDarkMode, Theme, ThemeState } from '@/redux/modules/theme';
import { useRedux } from '@/hooks/useRedux';

export type UseTheme = {
  themeKey: ThemeMode;
  theme: Theme.LIGHT | Theme.DARK;
  darkMode: boolean;
  onChangeTheme: (key: ThemeMode) => void;
};

export const useTheme = (): UseTheme => {
  const { state, dispatch } = useRedux('theme');
  const { keyMode, darkMode } = state as ThemeState;

  const handleChangeTheme = (theme: ThemeMode) => {
    dispatch(actions.change(theme));
  };

  return {
    themeKey: keyMode,
    theme: isDarkMode(keyMode) ? Theme.DARK : Theme.LIGHT,
    darkMode,
    onChangeTheme: handleChangeTheme
  };
};
