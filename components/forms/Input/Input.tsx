import { useState, ChangeEvent, forwardRef, RefObject } from 'react';
import { IconType } from 'react-icons';
import { ElementHTML } from '@/types';
import { Space } from '@/components/layout';
import { Button } from '@/components/forms';
import { classes } from '@/utils/helpers';
import styles from '@/components/forms/Input/Input.module.scss';

export type InputProps = typeof defaultProps &
  ElementHTML & {
    name: string;
    value?: string;
    placeholder?: string;
    clearable?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    icon?: IconType;
    hotKey?: string;
    onChange?: (value: string) => void;
  };

const defaultProps = {
  name: ''
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, name, value, placeholder, readOnly, hotKey, disabled, icon: Icon, onChange },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string>(value || '');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      console.log('handleChange', value);

      setInputValue(value);
      onChange && onChange(value);
    };

    const handleClickIcon = () => {
      if (ref && (ref as RefObject<HTMLInputElement>).current) {
        (ref as RefObject<HTMLInputElement>).current?.focus();
      }
    };

    return (
      <Space
        align="center"
        className={classes(
          disabled && styles.disabled,
          inputValue && styles.hasValue,
          styles.wrapper
        )}>
        {Icon && (
          <Button outline ariaLabel="icon" className={styles.icon} onClick={handleClickIcon}>
            <Icon />
          </Button>
        )}

        <input
          ref={ref}
          className={classes(styles.input, className)}
          name={name}
          aria-label={name}
          placeholder={placeholder}
          autoComplete="off"
          value={inputValue}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
        />

        {hotKey && (
          <Space align="center" justify="center" className={styles.hotKey}>
            {hotKey}
          </Space>
        )}
      </Space>
    );
  }
);

Input.displayName = 'Input';
Input.defaultProps = defaultProps;

export default Input;
