import { BreakpointsRules } from '@/types';

/* -------------------------------------------------------------------------- */
/** Breakpoint **/
/* -------------------------------------------------------------------------- */

export const BREAKPOINTS: BreakpointsRules = {
  xs: {
    name: 'xs',
    width: 0,
    items: 2,
    spacing: 1,
    backdrops: 1,
    offset: 20
  },
  sm: {
    name: 'sm',
    width: 600,
    items: 4,
    backdrops: 2,
    spacing: 3
  },
  md: {
    name: 'md',
    width: 900,
    items: 4,
    backdrops: 3,
    spacing: 3
  },
  lg: {
    name: 'lg',
    width: 1200,
    items: 5,
    backdrops: 3,
    spacing: 3
  },
  xl: {
    name: 'xl',
    width: 1536,
    items: 6,
    backdrops: 3,
    spacing: 3
  }
};
