import { Breakpoint } from '@mui/material';
import { BreakpointRule, BreakpointRules, BreakpointsRules } from '@/types';
import { mapValuesBy } from '@/utils/helpers/object';
import { BREAKPOINTS as breakpointRules } from '@/utils/constants';

export const getBreakpointConfig = (key: Breakpoint) => breakpointRules[key] as BreakpointRules;

export const getBreakpointRuleBy = (key?: BreakpointRule) =>
  mapValuesBy<BreakpointsRules, object>(breakpointRules, (value) =>
    key ? (value as BreakpointRules)[key] : value
  );
