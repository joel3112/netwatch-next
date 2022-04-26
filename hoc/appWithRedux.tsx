/* eslint-disable react/display-name */
import { ComponentType } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export const appWithRedux = (Component: ComponentType<AppProps>) => (appProps: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...(appProps as AppProps)} />
    </Provider>
  );
};
