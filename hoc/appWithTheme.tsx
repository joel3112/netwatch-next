/* eslint-disable react/display-name */
import { ComponentType, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import cn from 'classnames';
import { useTheme } from '@/hooks/useTheme';

export const appWithTheme = (Component: ComponentType<AppProps>) => (appProps: AppProps) => {
  const { theme: aspectMode } = useTheme();
  const [mounted, setMounted] = useState(false);

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
    <div aria-label={aspectMode} className={cn(aspectMode, 'theme')}>
      <Component {...(appProps as AppProps)} />
    </div>
  );
};
