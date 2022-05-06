/* eslint-disable react/display-name */
import { ComponentType, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useTheme } from '@/hooks/useTheme';
import { classes } from '@/utils/helpers';

export const appWithTheme = (Component: ComponentType<AppProps>) => (appProps: AppProps) => {
  const { theme: aspectMode } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        <Component {...(appProps as AppProps)} />
      </div>
    );
  }

  return (
    <div aria-label={aspectMode} className={classes(aspectMode, 'theme')}>
      <Component {...(appProps as AppProps)} />
    </div>
  );
};
