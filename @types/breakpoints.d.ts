import { Breakpoint } from '@mui/material';

export type BreakpointValues = { [key in Breakpoint]: number };

export interface BreakpointRules {
  name: Breakpoint;
  width?: number;
  items?: number;
  spacing?: number;
}

type BreakpointRule = keyof BreakpointRules;

export type BreakpointsRules = {
  [key in Breakpoint]: BreakpointRules;
};
