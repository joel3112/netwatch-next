import { ElementChildren, ElementHTML, ElementSkeleton, Rectangle } from '@/types';
import { withSkeleton } from '@/hoc/withSkeleton';
import { useSizeRatio } from '@/hooks/useSizeRatio';
import { classes } from '@/utils/helpers';
import styles from '@/components/media/Image/Image.module.scss';

export type ImageProps = typeof defaultProps &
  ElementHTML &
  ElementChildren<JSX.Element> &
  ElementSkeleton &
  Rectangle & {
    src: string;
    ratio?: number;
    lazy?: boolean;
    alt?: string;
  };

const defaultProps = {};

const Image = ({ className, children, src, width, height, ratio, lazy, alt }: ImageProps) => {
  const sizes = useSizeRatio({ width, height, ratio });

  return (
    <div role="img" className={classes(styles.wrapper)}>
      <div
        aria-label={alt || 'image'}
        className={classes(styles.image, className)}
        {...(lazy && { 'data-background': src })}>
        {children}
      </div>

      <style jsx>{`
        .${styles.wrapper} {
          width: ${sizes.width || 'auto'};
          height: ${sizes.height || 'auto'};
          min-width: ${sizes.width || 'auto'};
        }
        .${styles.wrapper}::before {
          padding-top: ${ratio ? `${100 * ratio}%` : '0'};
        }

        .${styles.image} {
          ${!lazy && `background-image: ${src.toBackgroundImageUrl()}`};
        }
      `}</style>
    </div>
  );
};

Image.defaultProps = defaultProps;

const ImageWithSkeleton = withSkeleton<ImageProps>(Image);

export default ImageWithSkeleton;
