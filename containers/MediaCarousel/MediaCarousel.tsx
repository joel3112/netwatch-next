import { IoMdAdd } from 'react-icons/io';
import { ElementHTML, ElementSkeleton, MediaData } from '@/types';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Card, Carousel } from '@/components/display';
import { classes, getBreakpointConfig } from '@/utils/helpers';
import styles from '@/containers/MediaCarousel/MediaCarousel.module.scss';
import { Space } from '@/components/layout';
import { Heading, Text } from '@/components/typography';
import Link from 'next/link';
import { Button } from '@/components/forms';

export type MediaCarouselProps = typeof defaultProps &
  ElementHTML &
  ElementSkeleton & {
    items?: Array<MediaData>;
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
    ratio: 1.5
  },
  backdrop: {
    imageKey: 'backdrop',
    configKey: 'backdrops',
    ratio: 0.56
  }
};

const MediaCarousel = ({
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

  return (
    <div className={classes(styles.wrapper, styles[key])}>
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
          const { [imageKey]: image, type, name, description } = props;

          return (
            <Carousel.Item key={index}>
              {condensed ? (
                <>
                  <Card className={classes(styles.card, styles.condensed)} skeleton={!type}>
                    <Card.Image classes={styles.image} src={image} width="100%" height="35vh" lazy>
                      <Card.Actions>
                        <Card.Actions.Item icon={IoMdAdd} />
                      </Card.Actions>
                    </Card.Image>
                  </Card>

                  <div className={styles.info} data-swiper-parallax="-300">
                    <Heading level={2}>{name}</Heading>
                    <Text size="md" maxLines={5} className={styles.description}>
                      {description}
                    </Text>
                    <Link href="/home">
                      <a>
                        <Button size="small">Mas info</Button>
                      </a>
                    </Link>
                  </div>
                </>
              ) : (
                <Card href="/home" className={styles.card} skeleton={!type}>
                  <Card.Image src={image} width="100%" ratio={ratio} lazy>
                    <Card.Actions>
                      <Card.Actions.Item icon={IoMdAdd} />
                    </Card.Actions>
                  </Card.Image>
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
