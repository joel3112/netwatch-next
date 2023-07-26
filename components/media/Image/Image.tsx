import ImageNext from 'next/image';
import {
  ElementChildren,
  ElementHTML,
  ElementLink,
  ElementSkeleton,
  RectangleRatio
} from '@/types';
import { withSkeleton } from '@/hoc/withSkeleton';
import { withNavigation } from '@/hoc/withNavigation';
import { useSizeRatio } from '@/hooks/useSizeRatio';
import { classes } from '@/utils/helpers';
import styles from '@/components/media/Image/Image.module.scss';

export type ImageProps = Partial<typeof defaultProps> &
  ElementHTML &
  ElementChildren<JSX.Element> &
  ElementSkeleton &
  ElementLink &
  RectangleRatio & {
    src: string;
    alt?: string;
    quality?: number;
    lazy?: boolean;
    onLoadingComplete?: () => void;
  };

const defaultProps = {
  alt: 'image',
  quality: 50
};

const Image = ({
  className,
  children,
  skeleton,
  src,
  width,
  height,
  ratio,
  alt,
  quality,
  lazy,
  onLoadingComplete
}: ImageProps) => {
  const sizes = useSizeRatio({ width, height, ratio });

  const handleLoad = (): void => onLoadingComplete && onLoadingComplete();

  return (
    <div role="img" aria-label={alt || 'image'} className={classes(styles.wrapper)}>
      {!skeleton && src && (
        <ImageNext
          alt={alt}
          src={src}
          priority={!lazy}
          layout="fill"
          objectFit="cover"
          loading={lazy ? 'lazy' : 'eager'}
          className={classes(styles.image, className)}
          quality={quality}
          lazyBoundary="0px"
          onLoadingComplete={handleLoad}
          unoptimized
        />
      )}

      <div className={classes(className, styles.content)}>{children}</div>

      <style jsx>{`
        .${styles.wrapper} {
          width: ${sizes.width || 'auto'};
          height: ${sizes.height || 'auto'};
          min-width: ${sizes.width || 'auto'};
        }
        .${styles.wrapper}::before {
          padding-top: ${ratio ? `${100 * ratio}%` : '0'};
        }
      `}</style>
    </div>
  );
};

Image.defaultProps = defaultProps;

const ImageWithNavigation = withNavigation<ImageProps>(Image);
const ImageWithSkeleton = withSkeleton<ImageProps>(ImageWithNavigation);

export default ImageWithSkeleton;
