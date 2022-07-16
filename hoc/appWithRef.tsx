/* eslint-disable react/display-name */
import { ComponentType, createContext, useContext, useRef } from 'react';
import type { AppProps } from 'next/app';

type AppContextProps = {
  appElement: HTMLDivElement | null;
};

const defaultValue: AppContextProps = {
  appElement: null
};

const AppContext = createContext<AppContextProps>(defaultValue);

export const useAppContext = () => useContext(AppContext);

export const appWithRef = (Component: ComponentType<AppProps>) => (appProps: AppProps) => {
  const appRef = useRef<HTMLDivElement>(null);

  return (
    <AppContext.Provider
      value={{
        appElement: appRef.current
      }}>
      <div className="app" ref={appRef}>
        <Component {...(appProps as AppProps)} />
      </div>
    </AppContext.Provider>
  );
};
