import { ElementHTML, RectangleRatio } from '@/types';
import { useSizeRatio } from '@/hooks/useSizeRatio';
import { classes } from '@/utils/helpers';
import styles from '@/components/media/Video/Video.module.scss';

export type VideoProps = typeof defaultProps &
  ElementHTML &
  RectangleRatio & {
    id: string;
    autoplay?: boolean;
  };

const defaultProps = {
  ratio: 9 / 16,
  autoplay: false
};

const Video = ({ className, id, autoplay, width, height, ratio }: VideoProps) => {
  const sizes = useSizeRatio({ width, height, ratio });

  return (
    <div className={classes(styles.wrapper)} aria-label="video">
      <iframe
        className={classes(styles.video, className)}
        src={id ? `https://www.youtube.com/embed/${id}?autoplay=${+autoplay}` : ''}
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
