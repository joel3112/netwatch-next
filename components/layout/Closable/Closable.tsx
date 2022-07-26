import { FiX } from 'react-icons/fi';
import { ElementChildren, ElementHTML } from '@/types';
import { Space } from '@/components/layout';
import { Button } from '@/components/forms';
import { classes } from '@/utils/helpers';
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
    <Space direction="column" className={classes(styles.wrapper, outside && styles.outside)}>
      {heading && <header className={styles.header}>{heading}</header>}

      <Button
        ariaLabel="close"
        className={classes(styles.close, className)}
        clear
        onClick={onClose}>
        <FiX />
      </Button>

      {children}
    </Space>
  );
};

Closable.defaultProps = defaultProps;

export default Closable;
