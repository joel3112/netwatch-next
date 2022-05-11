import { Breakpoint } from '@mui/material';
import { BreakpointRule, BreakpointRules } from '@/types';
import { mapValuesBy } from '@/utils/helpers/object';
import { BREAKPOINTS as breakpointRules } from '@/utils/constants';

export const getBreakpointConfig = (key: Breakpoint) => breakpointRules[key] as BreakpointRules;

export const getBreakpointRuleBy = (key?: BreakpointRule) =>
  mapValuesBy(breakpointRules, (value) => (key ? (value as BreakpointRules)[key] : value));
