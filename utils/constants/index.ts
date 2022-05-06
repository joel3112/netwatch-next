import { BreakpointsRules } from '@/types';

/* -------------------------------------------------------------------------- */
/** Breakpoint **/
/* -------------------------------------------------------------------------- */

export const BREAKPOINTS: BreakpointsRules = {
  xs: {
    name: 'xs',
    width: 0,
    next: 600,
    items: 2,
    spacing: 3
  },
  sm: {
    name: 'sm',
    width: 600,
    next: 900,
    items: 2,
    spacing: 3
  },
  md: {
    name: 'md',
    width: 900,
    next: 1200,
    items: 4,
    spacing: 3
  },
  lg: {
    name: 'lg',
    width: 1200,
    next: 1536,
    items: 5,
    spacing: 3
  },
  xl: {
    name: 'xl',
    width: 1536,
    next: 9999,
    items: 5,
    spacing: 3
  }
};
