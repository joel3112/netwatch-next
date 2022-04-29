import { ElementHTML, Rectangle } from '@/types';
import { classes } from '@/utils/helpers';
import styles from '@/components/media/Video/Video.module.scss';
import { useSizeRatio } from '@/hooks/useSizeRatio';

export type VideoProps = typeof defaultProps &
  ElementHTML &
  Rectangle & {
    id: string;
    ratio?: number;
    autoplay?: boolean;
  };

const defaultProps = {
  ratio: 9 / 16
};

const Video = ({ className, id, autoplay, width, height, ratio }: VideoProps) => {
  const sizes = useSizeRatio({ width, height, ratio });

  return (
    <div className={classes(styles.wrapper)} aria-label="video">
      <iframe
        className={classes(styles.video, className)}
        src={id ? `https://www.youtube.com/embed/${id}?autoplay=${Number(autoplay)}` : ''}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="video"
      />

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

Video.defaultProps = defaultProps;

export default Video;
