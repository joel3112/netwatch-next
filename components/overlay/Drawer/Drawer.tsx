import DrawerMUI from '@mui/material/Drawer';
import { ModalProps } from '@mui/material';
import { ElementChildren, ElementHTML, FunctionVoid } from '@/types';
import { useModal } from '@/hooks/useModal';
import { Closable } from '@/components/layout';
import { PaperModalProps } from '@/components/overlay/Portal/Portal';
import { classes } from '@/utils/helpers';
import styles from '@/components/overlay/Drawer/Drawer.module.scss';

export type DrawerProps = Partial<typeof defaultProps> &
  ElementHTML &
  ElementChildren & {
    heading?: string;
    opened?: boolean;
    onChange?: FunctionVoid<boolean>;
    position?: 'left' | 'right';
    modalConfig?: PaperModalProps;
  };

const defaultProps = {
  position: 'right'
};

const Drawer = ({
  className,
  children,
  position,
  heading,
  opened,
  onChange,
  modalConfig
}: DrawerProps) => {
  const { isOpened, handleChange } = useModal(opened, onChange);

  return (
    <DrawerMUI
      aria-labelledby="drawer"
      classes={{
        paper: classes(styles.wrapper, position && styles[position], className)
      }}
      ModalProps={(modalConfig || {}) as Partial<ModalProps>}
      anchor={position}
      open={isOpened}
      onClose={() => handleChange(false)}>
      <Closable heading={heading} onClose={() => handleChange(false)}>
        <div className={styles.content}>{children}</div>
      </Closable>
    </DrawerMUI>
  );
};

Drawer.defaultProps = defaultProps;

export default Drawer;
