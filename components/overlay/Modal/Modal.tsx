import { Box, Fade } from '@mui/material';
import ModalMUI from '@mui/material/Modal';
import { ElementChildren, ElementHTML, FunctionVoid } from '@/types';
import { useModal } from '@/hooks/useModal';
import { Closable } from '@/components/layout';
import { PaperBackdropProps, PaperModalProps } from '@/components/overlay/Portal/Portal';
import { classes } from '@/utils/helpers';
import styles from '@/components/overlay/Modal/Modal.module.scss';

export type ModalProps = typeof defaultProps &
  ElementHTML &
  ElementChildren & {
    heading?: string;
    opened?: boolean;
    onChange?: FunctionVoid<boolean>;
    modalConfig?: PaperModalProps;
  };

const defaultProps = {};

const Modal = ({ className, children, heading, opened, onChange, modalConfig }: ModalProps) => {
  const { isOpened, handleChange } = useModal(opened, onChange);
  const { container, BackdropProps } = modalConfig || {};

  return (
    <ModalMUI
      aria-labelledby="modal"
      open={isOpened}
      onClose={() => handleChange(false)}
      closeAfterTransition
      container={container}
      BackdropProps={BackdropProps as PaperBackdropProps}>
      <Fade in={isOpened}>
        <Box className={classes(styles.wrapper, className, 'wrapper')}>
          <Closable
            outside
            className={styles.close}
            heading={heading}
            onClose={() => handleChange(false)}>
            <div className={styles.content}>{children}</div>
          </Closable>
        </Box>
      </Fade>
    </ModalMUI>
  );
};

Modal.defaultProps = defaultProps;

export default Modal;
