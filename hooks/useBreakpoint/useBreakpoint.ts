import { createTheme, useMediaQuery } from '@mui/material';
import { Breakpoint, Breakpoints } from '@mui/system/createTheme/createBreakpoints';
import { BreakpointValues } from '@/types';
import { getBreakpointRuleBy } from '@/utils/helpers';

export type UseBreakpoint = {
  key: Breakpoint;
  breakpoints: Breakpoints;
  isMobile: boolean;
  isTablet: boolean;
  isSmallDesktop: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
};

export const useBreakpoint = (): UseBreakpoint => {
  const theme = createTheme({
    breakpoints: {
      values: getBreakpointRuleBy('width') as BreakpointValues
    }
  });

  const breakpointMatches: { [key: string]: boolean } = {
    xs: useMediaQuery(theme.breakpoints.between('xs', 'sm')),
    sm: useMediaQuery(theme.breakpoints.between('sm', 'md')),
    md: useMediaQuery(theme.breakpoints.between('md', 'lg')),
    lg: useMediaQuery(theme.breakpoints.between('lg', 'xl')),
    xl: useMediaQuery(theme.breakpoints.up('xl'))
  };

  return {
    breakpoints: theme.breakpoints,
    key: Object.keys(breakpointMatches).filter(
      (key) => breakpointMatches[key as Breakpoint]
    )[0] as Breakpoint,
    isMobile: breakpointMatches.xs,
    isTablet: breakpointMatches.sm,
    isSmallDesktop: breakpointMatches.md,
    isDesktop: breakpointMatches.lg,
    isLargeDesktop: breakpointMatches.xl
  };
};
