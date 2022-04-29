import { BreakpointsRules } from '@/types';

/* -------------------------------------------------------------------------- */
/** Breakpoint **/
/* -------------------------------------------------------------------------- */

export const BREAKPOINTS: BreakpointsRules = {
  xs: {
    name: 'xs',
    width: 0,
    items: 30,
    spacing: 3
  },
  sm: {
    name: 'sm',
    width: 600,
    items: 20,
    spacing: 3
  },
  md: {
    name: 'md',
    width: 900,
    items: 15,
    spacing: 3
  },
  lg: {
    name: 'lg',
    width: 1200,
    items: 12,
    spacing: 3
  },
  xl: {
    name: 'xl',
    width: 1536,
    items: 10,
    spacing: 3
  }
};
