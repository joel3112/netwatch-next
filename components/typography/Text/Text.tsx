import { ElementChildren, ElementHTML, ElementSkeleton } from '@/types';
import { withSkeleton } from '@/hoc/withSkeleton';
import { classes } from '@/utils/helpers';
import styles from '@/components/typography/Text/Text.module.scss';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

export type TextProps = Partial<typeof defaultProps> &
  ElementHTML &
  ElementChildren<string> &
  ElementSkeleton & {
    size?: TextSize;
    bold?: boolean;
    disabled?: boolean;
    ellipsis?: boolean;
    maxLines?: number;
    truncateTo?: number;
  };

const defaultProps = {
  size: 'md'
};

const Text = ({
  className,
  style,
  children,
  size,
  ellipsis,
  maxLines,
  truncateTo,
  bold,
  disabled
}: TextProps) => {
  return (
    <span
      className={classes(
        styles.wrapper,
        className,
        size && styles[size],
        ellipsis && styles.ellipsis,
        maxLines && styles.maxLines
      )}
      style={style}>
      {truncateTo ? children && children.truncate(truncateTo) : children}

      <style jsx>{`
        .${styles.wrapper} {
          ${bold ? 'font-weight: bold;' : ''}
          ${disabled ? 'opacity: 0.5;' : ''}
          ${maxLines ? `-webkit-line-clamp: ${maxLines};` : ''}
        }
      `}</style>
    </span>
  );
};

Text.defaultProps = defaultProps;

const TextWithSkeleton = withSkeleton(Text, { variant: 'text' });

export default TextWithSkeleton;
