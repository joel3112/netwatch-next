/* eslint-disable react/display-name */
import { ComponentType } from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

export const appWithSWR = (Component: ComponentType<AppProps>) => (appProps: AppProps) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false
      }}>
      <Component {...(appProps as AppProps)} />
    </SWRConfig>
  );
};
