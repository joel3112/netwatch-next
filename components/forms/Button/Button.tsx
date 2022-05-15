import { MouseEvent, MouseEventHandler } from 'react';
import { ElementChildren, ElementHTML, ElementSkeleton } from '@/types';
import { withSkeleton } from '@/hoc/withSkeleton';
import { withTooltip } from '@/hoc/withTooltip';
import { classes } from '@/utils/helpers';
import styles from '@/components/forms/Button/Button.module.scss';

export type ButtonProps = Partial<typeof defaultProps> &
  ElementHTML &
  ElementChildren &
  ElementSkeleton & {
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    ariaLabel?: string;
    tooltip?: string;
    secondary?: boolean;
    light?: boolean;
    dark?: boolean;
    clear?: boolean;
    outline?: boolean;
    disabled?: boolean;
    rounded?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };

const defaultProps = {
  size: 'medium'
};

const Button = ({
  className,
  children,
  ariaLabel,
  size,
  secondary,
  clear,
  outline,
  disabled,
  tooltip,
  rounded,
  light,
  dark,
  onClick
}: ButtonProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    onClick && onClick(event);
  };

  return (
    <button
      aria-label={ariaLabel || tooltip}
      className={classes(
        styles.wrapper,
        size && styles[size],
        secondary && styles.secondary,
        light && styles.light,
        dark && styles.dark,
        clear && styles.clear,
        outline && styles.outline,
        rounded && styles.rounded,
        className
      )}
      disabled={disabled}
      onClick={handleClick}>
      {children}
    </button>
  );
};

Button.defaultProps = defaultProps;

const ButtonWithTooltip = withTooltip<ButtonProps>(Button);
const ButtonWithSkeleton = withSkeleton<ButtonProps>(ButtonWithTooltip, { variant: 'button' });

export default ButtonWithSkeleton;
