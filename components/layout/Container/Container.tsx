import React from 'react';
import cn from 'classnames';
import styles from '@/components/layout/Container/Container.module.scss';

export type ContainerProps = typeof defaultProps &
  RCProps.WithChildren<
    ReactComponent<{
      margins?: boolean;
    }>
  >;

const defaultProps = {
  margins: false
};

const Container = ({ children, className, margins }: ContainerProps) => {
  return (
    <div className={cn(styles.containerWrapper, className, margins && styles.hasMargins)}>
      {children}
    </div>
  );
};

Container.defaultProps = defaultProps;

export default Container;
