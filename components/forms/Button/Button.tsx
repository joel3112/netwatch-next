import { MouseEvent, MouseEventHandler } from 'react';
import cn from 'classnames';
import { ElementChildren, ElementHTML, ElementSkeleton } from '@/types';
import { withSkeleton } from '@/hoc/withSkeleton';
import { withTooltip } from '@/hoc/withTooltip';
import styles from '@/components/forms/Button/Button.module.scss';

export type ButtonProps = Partial<typeof defaultProps> &
  ElementHTML &
  ElementChildren &
  ElementSkeleton & {
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    ariaLabel?: string;
    tooltip?: string;
    secondary?: boolean;
    clear?: boolean;
    outline?: boolean;
    disabled?: boolean;
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
  onClick
}: ButtonProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(event);
  };

  return (
    <button
      aria-label={ariaLabel || tooltip}
      className={cn(
        styles.wrapper,
        size && styles[size],
        secondary && styles.secondary,
        clear && styles.clear,
        outline && styles.outline,
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
