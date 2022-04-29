import { FiX } from 'react-icons/fi';
import cn from 'classnames';
import { ElementChildren, ElementHTML } from '@/types';
import { Space } from '@/components/layout';
import { Button } from '@/components/forms';
import styles from '@/components/layout/Closable/Closable.module.scss';

export type ClosableProps = typeof defaultProps &
  ElementHTML &
  ElementChildren & {
    heading?: string;
    outside?: boolean;
    onClose?: () => void;
  };

const defaultProps = {};

const Closable = ({ className, children, heading, outside, onClose }: ClosableProps) => {
  return (
    <Space direction="column" className={cn(styles.wrapper, outside && styles.outside, 'wrapper')}>
      {heading && <header className={styles.header}>{heading}</header>}

      <Button ariaLabel="close" className={cn(styles.close, className)} clear onClick={onClose}>
        <FiX />
      </Button>

      <main>{children}</main>
    </Space>
  );
};

Closable.defaultProps = defaultProps;

export default Closable;
