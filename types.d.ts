/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CSSProperties, ReactNode } from 'react';

declare module '*module.scss' {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

export * from '@types/index';

export type ElementHTML = {
  className?: string;
  style?: CSSProperties;
};

export type ElementChildren<T = ReactNode> = {
  children?: T;
};

export type ElementSkeleton = {
  skeleton?: boolean;
};

export type ElementLink = {
  href?: string;
};

export type EmptyObject = Record<never, unknown>;
export type ObjectGeneric<T = unknown> = { [key: string]: T };
export type ObjectKeyIn<T, U = JSX.Element> = { [key in U]: T };

export type FunctionGeneric = (...arg: Array<any>) => any;
export type FunctionVoid<T> = (key: T) => void;
