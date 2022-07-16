import { MouseEvent, ReactElement, SetStateAction } from 'react';
import { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ElementChildren, ElementHTML, FunctionVoid } from '@/types';
import { useAppContext } from '@/hoc/appWithRef';
import { withChildrenFiltered } from '@/hoc/withChildrenFiltered';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/forms';
import { Space } from '@/components/layout';
import { classes, getPropValue } from '@/utils/helpers';
import styles from '@/components/forms/Select/Select.module.scss';

/* -------------------------------------------------------------------------- */
/** Context **/
/* -------------------------------------------------------------------------- */

type SelectContextProps = typeof defaultValue & {
  valueSelected?: string;
  onChange?: FunctionVoid<string>;
};

const defaultValue = {};

const SelectContext = createContext<SelectContextProps>(defaultValue);

const useSelectContext = () => useContext(SelectContext);

/* -------------------------------------------------------------------------- */
/** SelectItem (child component) **/
/* -------------------------------------------------------------------------- */

type SelectItemProps = ElementHTML &
  ElementChildren<string> & {
    value: string;
    onClick?: FunctionVoid<string>;
  };

const SelectItem = ({ children, className, value }: SelectItemProps) => {
  const { valueSelected, onChange } = useSelectContext();

  return (
    <MenuItem
      onClick={() => onChange && onChange(value)}
      className={classes(styles.item, valueSelected === value && styles.selected, className)}>
      {children}
    </MenuItem>
  );
};

/* -------------------------------------------------------------------------- */
/** Select (main component) **/
/* -------------------------------------------------------------------------- */

export type SelectProps = typeof defaultProps &
  ElementHTML &
  ElementChildren & {
    value?: string;
    placeholder: string;
    onChange?: FunctionVoid<unknown>;
  };

const defaultProps = {
  children: []
};

const Select = ({ className, children, value, placeholder, onChange }: SelectProps) => {
  const { appElement } = useAppContext();
  const { theme: aspectMode } = useTheme();
  const isUniqueItem = children && children.length === 1;
  const [selected, setSelected] = useState<string>(value || '');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (children) {
      setSelected(isUniqueItem ? getPropValue(children, '[0].props.value') : value || '');
    }
  }, [children, isUniqueItem, value]);

  const itemSelected = useMemo(
    () =>
      children
        ? children.find((child: ReactElement) => String(child.props.value) === String(selected))
        : {},
    [children, selected]
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isUniqueItem) setAnchorEl(event.currentTarget as unknown as SetStateAction<null>);
  };
  const handleClickItem = (identifier: string) => {
    setSelected(identifier);
    setAnchorEl(null);

    onChange && onChange(identifier);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <SelectContext.Provider
      value={{
        valueSelected: selected,
        onChange: handleClickItem
      }}>
      <div className={classes(styles.wrapper)}>
        <Button
          clear
          className={classes(styles.button, className, open && styles.opened)}
          id="selector-button"
          aria-controls={open ? 'selector-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          <Space align="center" gap={5}>
            <span className={styles.label}>
              {itemSelected ? getPropValue(itemSelected, 'props.children', '') : placeholder}
            </span>
            {!isUniqueItem && <FiChevronDown className={styles.arrow} />}
          </Space>
        </Button>

        <Menu
          id="selector-menu"
          aria-labelledby="selector-button"
          classes={{ paper: styles.paper, list: `${styles.menu} theme-${aspectMode}` }}
          container={appElement}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          {children}
        </Menu>
      </div>
    </SelectContext.Provider>
  );
};

Select.defaultProps = defaultProps;

const SelectWithChildrenFiltered = withChildrenFiltered(Select, { Item: SelectItem });

export default SelectWithChildrenFiltered;
