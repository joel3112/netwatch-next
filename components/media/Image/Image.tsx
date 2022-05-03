import ImageNext from 'next/image';
import { BsImage } from 'react-icons/bs';
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
import { Space } from '@/components/layout';
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
  quality
}: ImageProps) => {
  const sizes = useSizeRatio({ width, height, ratio });

  return (
    <div role="img" aria-label={alt || 'image'} className={classes(styles.wrapper)}>
      {!skeleton && src && (
        <ImageNext
          src={src}
          layout="fill"
          className={classes(styles.image, className)}
          quality={quality}
        />
      )}

      {!skeleton && !src && (
        <Space align="center" justify="center" className={classes(styles.content, styles.empty)}>
          <BsImage />
        </Space>
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
