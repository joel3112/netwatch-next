import { Breakpoint } from '@mui/material';

declare global {
  namespace RCProps {
    type BreakpointValues = { [key in Breakpoint]: number };

    interface BreakpointRules {
      name: Breakpoint;
      width?: number;
      items?: number;
      spacing?: number;
    }

    type BreakpointRule = keyof BreakpointRules;

    type BreakpointsRules = {
      [key in Breakpoint]: BreakpointRules;
    };
  }
}
