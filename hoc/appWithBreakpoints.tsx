/* eslint-disable react/display-name */
import { ComponentType } from 'react';
import type { AppProps } from 'next/app';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { classes } from '@/utils/helpers';

export const appWithBreakpoints = (Component: ComponentType<AppProps>) => (appProps: AppProps) => {
  const { key } = useBreakpoint();

  return (
    <div className={classes(key, 'breakpoint')}>
      <Component {...(appProps as AppProps)} />
    </div>
  );
};
