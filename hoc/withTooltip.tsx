/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import { ElementChildren } from '@/types';
import { Tooltip } from '@/components/overlay';

type WithTooltipProps = ElementChildren & {
  tooltip?: string;
};

export const withTooltip =
  <T extends WithTooltipProps>(Component: (x: T) => JSX.Element) =>
  ({ children, ...hocProps }: T) => {
    const { tooltip } = hocProps;

    if (!tooltip) {
      return <Component {...(hocProps as T)}>{children}</Component>;
    }

    const ComponentRef = forwardRef((props, ref) => {
      return (
        <Component {...(hocProps as T)} ref={ref}>
          {children}
        </Component>
      );
    });

    return (
      <Tooltip text={tooltip}>
        <ComponentRef />
      </Tooltip>
    );
  };
