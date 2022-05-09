import { Breakpoint } from '@mui/material';
import { GridSize, GridSpacing } from '@mui/material/Grid/Grid';
import { ResponsiveStyleValue } from '@mui/system';

export type BreakpointValues = { [key in Breakpoint]: number };

export interface BreakpointRules {
  name: Breakpoint;
  width: number;
  items: number;
  backdrops?: number;
  spacing: number;
  offset?: number;
}

export type BreakpointRule = keyof BreakpointRules;

export type BreakpointsRules = {
  [key in Breakpoint]?: BreakpointRules;
};

export type BreakpointSize = GridSize;

export interface Breakpoints {
  xs?: boolean | BreakpointSize;
  sm?: boolean | BreakpointSize;
  md?: boolean | BreakpointSize;
  lg?: boolean | BreakpointSize;
  xl?: boolean | BreakpointSize;
}

export type BreakpointSpacing =
  | ResponsiveStyleValue<GridSpacing>
  | Array<ResponsiveStyleValue<GridSpacing>>;
