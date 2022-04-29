import { cloneElement, ComponentPropsWithRef, createContext, useContext } from 'react';
import { PortalProps as PortalPropsMUI } from '@mui/material';
import cn from 'classnames';
import { ElementChildren, ElementHTML, FunctionVoid } from '@/types';
import { withChildrenFiltered } from '@/hoc/withChildrenFiltered';
import { useModal } from '@/hooks/useModal';
import styles from '@/components/overlay/Portal/Portal.module.scss';

/* -------------------------------------------------------------------------- */
/** Context **/
/* -------------------------------------------------------------------------- */

type PortalContextProps = typeof defaultValue & {
  opened?: boolean;
  onChange?: FunctionVoid<boolean>;
};

const defaultValue = {
  opened: false
};

const PortalContext = createContext<PortalContextProps>(defaultValue);

const usePortalContext = () => useContext(PortalContext);

/* -------------------------------------------------------------------------- */
/** PortalHandler (child component) **/
/* -------------------------------------------------------------------------- */

export type PortalHandlerProps = ElementHTML & Required<ElementChildren<JSX.Element>>;

const PortalHandler = ({ children: Child }: PortalHandlerProps) => {
  const { onChange } = usePortalContext();

  return cloneElement(Child, {
    ...Child.props,
    onClick: () => onChange && onChange(true)
  });
};

/* -------------------------------------------------------------------------- */
/** PortalPortal (child component) **/
/* -------------------------------------------------------------------------- */

export type PaperBackdropProps = ComponentPropsWithRef<'div'>;

export type PaperModalProps = {
  container: PortalPropsMUI['container'];
  BackdropProps: Partial<PaperBackdropProps>;
};

type PortalPaperProps = ElementHTML & Required<ElementChildren<JSX.Element>>;

const PortalPaper = ({ children: Child }: PortalPaperProps) => {
  const { opened, onChange } = usePortalContext();
  const modalConfig = {
    container: document.querySelector('.app'),
    BackdropProps: {
      classes: {
        root: styles.backdrop
      }
    }
  };

  return cloneElement(Child, {
    className: cn(styles.portalPaper, Child.props && Child.props.className),
    opened,
    onChange: () => onChange && onChange(false),
    modalConfig,
    ...Child.props
  });
};

/* -------------------------------------------------------------------------- */
/** Portal (main component) **/
/* -------------------------------------------------------------------------- */

export type PortalProps = typeof defaultProps &
  ElementHTML &
  ElementChildren<Array<JSX.Element>> & {
    opened?: boolean;
    onChange?: FunctionVoid<boolean>;
  };

const defaultProps = defaultValue;

const Portal = ({ children, opened, onChange }: PortalProps) => {
  const { isOpened, handleChange } = useModal(opened, onChange);

  return (
    <PortalContext.Provider
      value={{
        opened: isOpened,
        onChange: handleChange
      }}>
      <div className={cn(styles.portalWrapper, 'wrapper')}>{children}</div>
    </PortalContext.Provider>
  );
};

Portal.defaultProps = defaultProps;

const PortalWithChildrenFiltered = withChildrenFiltered(Portal, {
  Handler: PortalHandler,
  Paper: PortalPaper
});

export default PortalWithChildrenFiltered;
