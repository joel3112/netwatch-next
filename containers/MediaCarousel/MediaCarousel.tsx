import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { IconType } from 'react-icons';
import { IoMdAdd } from 'react-icons/io';
import { RiPlayFill } from 'react-icons/ri';
import { ElementHTML, ElementSkeleton, MediaData, MediaTypeKey } from '@/types';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Space } from '@/components/layout';
import { Text } from '@/components/typography';
import { Button } from '@/components/forms';
import { Card, Carousel } from '@/components/display';
import { classes, getBreakpointConfig } from '@/utils/helpers';
import styles from '@/containers/MediaCarousel/MediaCarousel.module.scss';

/* -------------------------------------------------------------------------- */
/** CarouselItemActions (child component) **/
/* -------------------------------------------------------------------------- */

type ItemActions = { id: string; icon: IconType };

type CarouselItemActionsProps = ElementHTML & {
  actions?: Array<ItemActions>;
};

const defaultActions = [{ id: 'list', icon: IoMdAdd }];

const CarouselItemActions = ({ className, actions = defaultActions }: CarouselItemActionsProps) => (
  <Card.Actions className={className}>
    {actions.map(({ id, icon }) => (
      <Card.Actions.Item key={id} icon={icon} />
    ))}
  </Card.Actions>
);

/* -------------------------------------------------------------------------- */
/** CarouselItemInfo (main component) **/
/* -------------------------------------------------------------------------- */

type CarouselItemInfoProps = {
  id?: number;
  type?: MediaTypeKey;
  name: string;
  description?: string;
};

const CarouselItemInfo = ({ name, description }: CarouselItemInfoProps) => {
  const { t } = useTranslation();

  const actions: Array<ItemActions> = [...defaultActions, { id: 'watch', icon: RiPlayFill }];

  return (
    <div className={styles.info} data-swiper-parallax="-300">
      <Text className={styles.title}>{name}</Text>

      <Text size="sm" maxLines={4} className={styles.description}>
        {description}
      </Text>

      <Space align="center" gap={8}>
        <CarouselItemActions className={styles.actionsInfo} actions={actions} />

        <Link href="/">
          <a>
            <Button rounded className={styles.buttonInfo}>
              {t('item.action.more')}
            </Button>
          </a>
        </Link>
      </Space>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/** Container (main component) **/
/* -------------------------------------------------------------------------- */

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
  const { key, isMobile } = useBreakpoint();
  const { imageKey, configKey, ratio } = imageSizes[backdrop ? 'backdrop' : 'poster'];
  const { [configKey]: slidesPerView, spacing, offset = 0 } = getBreakpointConfig(key) || {};

  return (
    <div className={classes(styles.wrapper, styles[key])}>
      <Carousel
        slidesPerView={slides || slidesPerView}
        spacing={spacing * 4}
        offset={offset + 1}
        navigation={!condensed}
        pagination={pagination ? (isMobile ? 'progressbar' : 'bullets') : false}
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
                    <Card.Image
                      classes={styles.image}
                      src={image}
                      width="100%"
                      ratio={isMobile ? 0.55 : 0.4}
                      lazy
                    />
                  </Card>

                  {!isMobile && <CarouselItemInfo name={name} description={description} />}
                </>
              ) : (
                <Card href="/home" className={styles.card} skeleton={!type}>
                  <Card.Image src={image} width="100%" ratio={ratio} lazy>
                    <CarouselItemActions />
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
