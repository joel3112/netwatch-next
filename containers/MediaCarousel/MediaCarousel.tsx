import { ElementHTML, ElementLink, ElementSkeleton, MediaData, MediaImageRatio } from '@/types';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useFavourite } from '@/hooks/useFavourite';
import { Card, Carousel } from '@/components/display';
import { MediaHeading } from '@/containers/MediaHeading';
import { MediaCondensed } from '@/containers/MediaCondensed';
import { classes, getBreakpointConfig } from '@/utils/helpers';
import styles from '@/containers/MediaCarousel/MediaCarousel.module.scss';

export type MediaCarouselProps = typeof defaultProps &
  ElementHTML &
  ElementLink &
  ElementSkeleton & {
    items?: Array<MediaData>;
    heading?: string;
    slides?: number;
    backdrop?: boolean;
    pagination?: boolean;
    condensed?: boolean;
    autoplay?: boolean;
    loop?: boolean;
  };

const defaultProps = {};

const imageSizes: {
  [key: string]: {
    imageKey: 'image' | 'backdrop';
    configKey: 'items' | 'backdrops';
    ratio: number;
  };
} = {
  poster: {
    imageKey: 'image',
    configKey: 'items',
    ratio: MediaImageRatio.POSTER
  },
  backdrop: {
    imageKey: 'backdrop',
    configKey: 'backdrops',
    ratio: MediaImageRatio.BACKDROP
  }
};

const MediaCarousel = ({
  heading,
  href,
  items,
  slides,
  backdrop,
  pagination,
  condensed,
  autoplay,
  loop
}: MediaCarouselProps) => {
  const { key } = useBreakpoint();
  const { imageKey, configKey, ratio } = imageSizes[backdrop ? 'backdrop' : 'poster'];
  const { [configKey]: slidesPerView, spacing, offset = 0 } = getBreakpointConfig(key) || {};
  const { favouriteAction, FavouriteIcon, onToggle } = useFavourite();

  return (
    <div className={classes(styles.wrapper, styles[key])}>
      {Boolean(heading && items && items.length) && (
        <MediaHeading href={href} className={styles.heading}>
          {heading}
        </MediaHeading>
      )}

      <Carousel
        slidesPerView={slides || slidesPerView}
        spacing={spacing * 4}
        offset={offset + 1}
        navigation={!condensed}
        pagination={pagination}
        autoplay={autoplay}
        loop={loop}
        className={classes(styles.carousel)}>
        {(items || []).map((props, index) => {
          const { [imageKey]: image, id, type, name, date } = props;

          return (
            <Carousel.Item key={index}>
              {condensed ? (
                <MediaCondensed {...props} />
              ) : (
                <Card
                  href={{ pathname: '/[type]/[id]', query: { type, id } }}
                  className={styles.card}
                  skeleton={!type}>
                  <Card.Image src={image} width="100%" ratio={ratio} lazy>
                    <Card.Actions>
                      <Card.Actions.Item
                        icon={FavouriteIcon}
                        tooltip={favouriteAction(id)}
                        onClick={() => onToggle(props)}
                      />
                    </Card.Actions>
                  </Card.Image>
                  <Card.Body title={name} description={date} />
                </Card>
              )}
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

MediaCarousel.defaultProps = defaultProps;

export default MediaCarousel;
