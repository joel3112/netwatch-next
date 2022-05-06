import { BreakpointRule, BreakpointRules } from '@/types';
import { mapValuesBy } from '@/utils/helpers/object';
import { BREAKPOINTS as breakpointRules } from '@/utils/constants';

export const getBreakpointRuleBy = (key: BreakpointRule) =>
  mapValuesBy(breakpointRules, (value) => (value as BreakpointRules)[key]);
