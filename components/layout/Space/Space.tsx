import React from 'react';
import cx from 'classnames';
import styles from '@/components/layout/Space/Space.module.scss';

export const positions = {
  center: 'center',
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  baseline: 'baseline'
};

export type DirectionSpace = 'row' | 'column';

export type PositionSpace = keyof typeof positions;

export type SpaceProps = RCProps.WithChildren<
  ReactComponent<{
    direction?: DirectionSpace;
    reverse?: boolean;
    wrap?: boolean;
    gap?: number | Array<number>;
    justify?: PositionSpace;
    align?: PositionSpace;
  }>
>;

const defaultProps: Partial<SpaceProps> = {
  direction: 'row'
};

const Space = ({
  className,
  children,
  style,
  direction,
  reverse,
  wrap,
  gap,
  justify,
  align
}: SpaceProps) => {
  const spacing = React.useMemo(
    () =>
      gap
        ? [gap]
            .flat()
            .map((s: number) => `${s}px`)
            .join(' ')
        : '',
    [gap]
  );

  return (
    <div className={cx(styles.spaceWrapper, className, 'wrapper')} style={style}>
      {children}

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: ${reverse ? `${direction}-reverse` : direction};
          flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
          ${gap ? `gap: ${spacing}` : ''}
          ${justify ? `justify-content: ${positions[justify]}` : ''}
          ${align ? `align-items: ${positions[align]}` : ''}
        }
      `}</style>
    </div>
  );
};

Space.defaultProps = defaultProps;

export default Space;
