/* eslint-disable react/display-name */
import { ComponentType } from 'react';
import type { AppProps } from 'next/app';
import css from 'styled-jsx/css';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { classes } from '@/utils/helpers';

const styles = css`
  .xs {
    --size-header: 50px;
    --padding-aside: 20px;
  }
`;

export const appWithBreakpoints = (Component: ComponentType<AppProps>) => (appProps: AppProps) => {
  const { key } = useBreakpoint();

  return (
    <div className={classes(key, 'breakpoint')}>
      <Component {...(appProps as AppProps)} />

      <style jsx>{styles}</style>
    </div>
  );
};
