import React from 'react';

declare module '*module.scss' {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

export * from '@types/index';

export type ElementHTML = {
  className?: string;
  style?: React.CSSProperties;
};

export type ElementChildren<T = React.ReactNode> = {
  children?: T;
};

export type ElementSkeleton = {
  skeleton?: boolean;
};

export type EmptyObject = Record<never, unknown>;
export type ObjectKey<T extends object> = { [key: string]: T };
export type ObjectKeyIn<T extends object, U = JSX.Element> = { [key in U]: T };
