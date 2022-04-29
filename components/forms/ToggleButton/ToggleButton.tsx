import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ElementChildren, ElementHTML, FunctionVoid } from '@/types';
import { withChildrenFiltered } from '@/hoc/withChildrenFiltered';
import { Space } from '@/components/layout';
import { classes } from '@/utils/helpers';
import styles from '@/components/forms/ToggleButton/ToggleButton.module.scss';

/* -------------------------------------------------------------------------- */
/** Context **/
/* -------------------------------------------------------------------------- */

type ToggleButtonContextProps = typeof defaultValue & {
  activeButton?: string;
  onChangeButton?: FunctionVoid<string>;
};

const defaultValue = {
  activeButton: ''
};

const ToggleButtonContext = createContext<ToggleButtonContextProps>(defaultValue);

const useToggleButtonContext = () => useContext(ToggleButtonContext);

/* -------------------------------------------------------------------------- */
/** ToggleButtonItem (child component) **/
/* -------------------------------------------------------------------------- */

type ToggleButtonItemProps = ElementHTML &
  ElementChildren & {
    value: string;
    selected?: boolean;
  };

const ToggleButtonItem = ({ children, className, value, selected }: ToggleButtonItemProps) => {
  const { activeButton, onChangeButton } = useToggleButtonContext();
  const changeRef = useRef<FunctionVoid<string> | undefined>(onChangeButton);

  const changeButton = useCallback(
    () => changeRef.current && (changeRef.current as FunctionVoid<string>)(value),
    [value]
  );

  useEffect(() => {
    selected && changeButton();
  }, [changeButton, selected]);

  return (
    <button
      aria-pressed={activeButton === value}
      className={classes(styles.itemWrapper, activeButton === value && styles.selected, className)}
      onClick={changeButton}>
      {children}
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/** ToggleButton (main component) **/
/* -------------------------------------------------------------------------- */

export type ToggleButtonProps = typeof defaultProps &
  ElementHTML &
  ElementChildren<Array<JSX.Element>> & {
    onChange?: FunctionVoid<string>;
  };

const defaultProps = {};

const ToggleButton = ({ className, children, onChange }: ToggleButtonProps) => {
  const [activeButton, setActiveButton] = useState<string>(
    children && children.length ? children[0].props.value : ''
  );

  const handleChangeButton = useCallback(
    (key: string) => {
      setActiveButton(key);
      onChange && onChange(key);
    },
    [onChange]
  );

  return (
    <ToggleButtonContext.Provider value={{ activeButton, onChangeButton: handleChangeButton }}>
      <Space align="center" className={classes(styles.wrapper, className)}>
        {children}
      </Space>
    </ToggleButtonContext.Provider>
  );
};

ToggleButton.defaultProps = defaultProps;

const ToggleButtonWithChildrenFiltered = withChildrenFiltered(ToggleButton, {
  Item: ToggleButtonItem
});

export default ToggleButtonWithChildrenFiltered;
