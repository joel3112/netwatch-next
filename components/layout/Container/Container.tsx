import cn from 'classnames';
import { ElementChildren, ElementHTML } from '@/types';
import styles from '@/components/layout/Container/Container.module.scss';

export type ContainerProps = typeof defaultProps &
  ElementHTML &
  ElementChildren & {
    margins?: boolean;
  };

const defaultProps = {
  margins: false
};

const Container = ({ children, className, margins }: ContainerProps) => {
  return (
    <div className={cn(styles.wrapper, className, margins && styles.hasMargins)}>{children}</div>
  );
};

Container.defaultProps = defaultProps;

export default Container;
