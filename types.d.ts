import React from 'react';
import { CSSProperties } from 'react';

declare module '*module.scss' {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

declare global {
  type ReactComponent<T> = T & {
    className?: string;
    style?: CSSRules;
  };

  namespace RCProps {
    type CSSRules = CSSProperties;

    type Object<T = unknown> = { [key: string]: T };
    type ObjectKeyIn<T = unknown, U = JSX.Element> = { [key in U]: T };

    type WithChildren<T, U = React.ReactNode> = T & { children?: U };

    type WithSkeleton<T> = T & { skeleton?: boolean };
  }
}
