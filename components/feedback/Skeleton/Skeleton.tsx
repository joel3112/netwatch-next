import { Skeleton as SkeletonMUI } from '@mui/material';
import cn from 'classnames';
import { ElementChildren, ElementHTML, Rectangle } from '@/types';
import { useSizeRatio } from '@/hooks/useSizeRatio';
import styles from '@/components/feedback/Skeleton/Skeleton.module.scss';

type SkeletonVariant = 'circular' | 'heading' | 'text' | 'button' | 'paragraph' | 'default';

export type SkeletonProps = typeof defaultProps &
  ElementHTML &
  ElementChildren &
  Rectangle & {
    ratio?: number;
    variant?: SkeletonVariant;
    numOfLines?: number;
  };

const defaultProps = {
  variant: 'default'
};

const Skeleton = ({
  className,
  children,
  width,
  height,
  ratio,
  variant,
  numOfLines
}: SkeletonProps) => {
  const sizes = useSizeRatio({
    width,
    height,
    ratio: variant === 'circular' ? 1 : ratio
  });

  return (
    <div
      role="progressbar"
      aria-label="skeleton"
      className={cn(styles.skeletonWrapper, styles[variant], ratio && styles.ratio, className)}>
      {variant === 'paragraph' &&
        Array(numOfLines)
          .fill('')
          .map((_, index) => (
            <SkeletonMUI
              key={index}
              className={cn(styles.skeleton, styles.paragraphLine)}
              animation="wave">
              {children}
            </SkeletonMUI>
          ))}

      {variant !== 'paragraph' && (
        <SkeletonMUI className={styles.skeleton} animation="wave">
          {children}
        </SkeletonMUI>
      )}

      <style jsx>{`
        .${styles.skeletonWrapper} {
          width: ${sizes.width || 'auto'};
          min-width: ${sizes.width || 'auto'};
          height: ${sizes.height || 'auto'};
        }
        .${styles.skeletonWrapper}::before {
          padding-top: ${ratio ? `${100 * ratio}%` : '0'};
        }
      `}</style>
    </div>
  );
};

Skeleton.defaultProps = defaultProps;

export default Skeleton;
