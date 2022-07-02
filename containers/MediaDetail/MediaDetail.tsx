/* eslint-disable @next/next/no-img-element */
import { cloneElement, createContext, ReactNode, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Breakpoint } from '@mui/system/createTheme/createBreakpoints';
import { IconType } from 'react-icons';
import { IoMdAdd, IoMdExpand } from 'react-icons/io';
import { RiPlayFill } from 'react-icons/ri';
import { BiGlobe } from 'react-icons/bi';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { SiImdb } from 'react-icons/si';
import {
  ElementChildren,
  ElementHTML,
  EmptyObject,
  FunctionVoid,
  MediaImage,
  MediaImageRatio,
  MediaImageType,
  MediaTypeKey,
  MediaVideo,
  MediaWatchProviders,
  MovieDetail,
  ObjectGeneric,
  TVDetail
} from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { useModal } from '@/hooks/useModal';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { MediaHeading } from '@/containers/MediaHeading';
import { Grid, Space } from '@/components/layout';
import { Heading, Text } from '@/components/typography';
import { Image, Video } from '@/components/media';
import { Button } from '@/components/forms';
import { Card, Carousel } from '@/components/display';
import { Modal, Portal } from '@/components/overlay';
import { videoTrailerId } from '@/utils/api';
import { classes, getBreakpointConfig, getPropValue } from '@/utils/helpers';
import styles from '@/containers/MediaDetail/MediaDetail.module.scss';

/* -------------------------------------------------------------------------- */
/** Context **/
/* -------------------------------------------------------------------------- */

type MediaDetailContextProps = Partial<typeof defaultValue> & {
  key: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isSmallDesktop: boolean;
  id: number;
  type: MediaTypeKey;
  media: MovieDetail | TVDetail;
  handleVideo: FunctionVoid<unknown>;
  handleZoom: FunctionVoid<unknown>;
  t: (key: string, options?: EmptyObject) => string;
  language: string;
};

const defaultValue = {};

const MediaDetailContext = createContext<MediaDetailContextProps>(
  defaultValue as MediaDetailContextProps
);

const useMediaDetailContext = () => useContext(MediaDetailContext);

/* -------------------------------------------------------------------------- */
/** DetailImage (child component) **/
/* -------------------------------------------------------------------------- */

const DetailImage = () => {
  const { key, media, handleZoom } = useMediaDetailContext();

  const imageTmpl = (key: keyof typeof MediaImageRatio, url: string, props?: ObjectGeneric) => (
    <Card className={styles.card}>
      <Card.Image src={url} alt={url} width="100%" quality={100} {...(props || {})}>
        <Card.Actions className={styles.actions}>
          {url && (
            <Card.Actions.Item
              className={styles.action}
              icon={IoMdExpand}
              onClick={() =>
                handleZoom({ type: MediaImageType[key], image: url, ratio: MediaImageRatio[key] })
              }
            />
          )}
        </Card.Actions>
      </Card.Image>
    </Card>
  );

  return (
    <Space className={classes(styles.images, styles[key])} gap={20}>
      <div className={styles.image}>
        {imageTmpl('POSTER', media.image, { ratio: MediaImageRatio.POSTER })}
      </div>
      <div className={styles.backdrop}>{imageTmpl('BACKDROP', media.backdrop || '')}</div>
    </Space>
  );
};

/* -------------------------------------------------------------------------- */
/** DetailCarousel (child component) **/
/* -------------------------------------------------------------------------- */

enum SectionLabel {
  VIDEOS = 'detail.videos.heading',
  IMAGES = 'detail.images.heading',
  SEASONS = 'detail.seasons.heading',
  RECOMMENDATIONS = 'detail.recommendations.heading'
}

const sectionHeadingHref = (type: MediaTypeKey, id: number) => ({
  VIDEOS: { pathname: '/[type]/[id]/videos', query: { type, id } },
  IMAGES: { pathname: '/[type]/[id]/images', query: { type, id } },
  SEASONS: { pathname: '/[type]/[id]/seasons', query: { type, id } },
  RECOMMENDATIONS: ''
});

const sectionItemHref = (
  type: MediaTypeKey,
  id: number,
  itemType?: MediaTypeKey,
  itemId?: string
) => ({
  VIDEOS: '',
  IMAGES: '',
  SEASONS: { pathname: '/[type]/[id]/seasons/[itemId]', query: { type, id, itemId } },
  RECOMMENDATIONS: { pathname: '/[itemType]/[itemId]', query: { itemType, itemId } }
});

type DetailCarouselProps = ElementChildren<JSX.Element> & {
  section: Lowercase<keyof typeof SectionLabel>;
  path: string;
  imageKey?: string;
  numbered?: boolean;
  backdrop?: boolean;
  action?: {
    icon?: IconType;
    onClick?: (item: unknown) => void;
  };
};

const DetailCarousel = ({
  children,
  section,
  path,
  imageKey,
  numbered,
  backdrop,
  action
}: DetailCarouselProps) => {
  const { t, key, media, type, id, isMobile, isTablet, isSmallDesktop } = useMediaDetailContext();
  const items = getPropValue(media, path, []);
  const { spacing, offset = 0 } = getBreakpointConfig(key) || {};
  const sectionKey = section.toUpperCase() as keyof typeof SectionLabel;

  const slidesPerView = () => {
    if (backdrop) {
      return isMobile ? 1 : 2;
    }
    if (isTablet) return 3;
    if (isSmallDesktop) return 3;
    return isMobile ? 2 : 4;
  };

  const handleClickAction = (item: Array<unknown>) =>
    action && action.onClick && action.onClick(item);

  if (items.isEmpty()) return null;
  return (
    <Space direction="column" gap={10} className={classes(styles[section])}>
      {!items.isEmpty() && (
        <MediaHeading href={sectionHeadingHref(type, id)[sectionKey]}>
          {`${t(SectionLabel[sectionKey])} ${numbered ? `(${items.length})` : ''}`}
        </MediaHeading>
      )}

      <Carousel
        slidesPerView={slidesPerView()}
        spacing={spacing * 4}
        offset={offset + 1}
        navigation={items.length > (isMobile ? 1 : 2)}
        className={classes(styles.carousel)}>
        {(items || []).map((item, index) => (
          <Carousel.Item key={index}>
            {children ? (
              cloneElement(children, { item })
            ) : (
              <Card
                href={sectionItemHref(type, id, item['type'], item['id'])[sectionKey]}
                className={styles.card}
                onClick={() => handleClickAction(item)}>
                <Card.Image
                  className={styles.image}
                  src={item[imageKey || 'image']}
                  width="100%"
                  ratio={backdrop ? MediaImageRatio.BACKDROP : MediaImageRatio.POSTER}
                  quality={100}
                  lazy>
                  <Card.Actions className={styles.actions}>
                    {action && action.icon && (
                      <Card.Actions.Item className={styles.action} icon={action.icon} />
                    )}
                  </Card.Actions>
                </Card.Image>
                <Card.Body title={item['name']} description={item['date']} />
              </Card>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </Space>
  );
};

/* -------------------------------------------------------------------------- */
/** DetailExternalIds (child component) **/
/* -------------------------------------------------------------------------- */

const ExternalLinkIcons = {
  imdb: <SiImdb />,
  facebook: <FiFacebook />,
  instagram: <FiInstagram />,
  twitter: <FiTwitter />
};

const DetailExternalIds = () => {
  const { media } = useMediaDetailContext();
  const { t } = useTranslation();
  const homepage = getPropValue(media, 'homepage', '');
  const externalIds = getPropValue(media, 'external_ids', []);
  const buttonProps = { rounded: true, light: true, className: styles.externalId };

  return (
    <Space gap={10} className={styles.externalIds}>
      {homepage && (
        <a href={homepage} target="blank">
          <Button tooltip={t('detail.links.website')} {...buttonProps}>
            <BiGlobe />
          </Button>
        </a>
      )}

      {externalIds.map(({ id, url, name }) => {
        const Icon = ExternalLinkIcons[id];
        return (
          <a key={id} href={url} target="blank">
            <Button tooltip={name} {...buttonProps}>
              {Icon}
            </Button>
          </a>
        );
      })}
    </Space>
  );
};

/* -------------------------------------------------------------------------- */
/** DetailData (child component) **/
/* -------------------------------------------------------------------------- */

const DetailData = () => {
  const { t, media, handleVideo, language } = useMediaDetailContext();
  const videos = getPropValue(media, 'videos', []);
  const { watch_link, providers } = getPropValue(
    media,
    'watch/providers',
    {}
  ) as MediaWatchProviders;

  const DataItem = ({ heading, children }: { heading: string; children: ReactNode }) => {
    return (
      <Space gap={5} direction="column" className={styles.dataItem}>
        <Text bold>{heading}</Text>
        {children}
      </Space>
    );
  };

  const DataButton = ({
    children,
    text,
    onClick,
    light
  }: {
    children?: ReactNode;
    text: string;
    onClick?: () => void;
    light?: boolean;
  }) => {
    return (
      <Button className={styles.button} light={light} onClick={onClick}>
        {children}
        <Text>{t(text)}</Text>
      </Button>
    );
  };

  return (
    <Space direction="column" gap={20} className={styles.data}>
      <Space direction="column" gap={5} className={styles.buttons}>
        {!providers.isEmpty() && (
          <a href={watch_link} className="full">
            <DataButton text="watch.now.button">
              <img
                className={styles.provider}
                alt={providers[0].name}
                src={providers[0].image}
                width={25}
                height={25}
              />
            </DataButton>
          </a>
        )}
        {!videos.isEmpty() && (
          <DataButton
            text="watch.trailer.button"
            onClick={() => handleVideo({ type: 'video', key: videoTrailerId(videos, language) })}>
            <RiPlayFill />
          </DataButton>
        )}
        <DataButton text="my.list.button" light>
          <IoMdAdd />
        </DataButton>
      </Space>

      <MediaHeading>{t('detail.data.heading')}</MediaHeading>

      <Space gap={20} direction="column">
        {!providers.isEmpty() && (
          <DataItem heading={t('detail.data.available')}>
            <Space gap={10} className={styles.providers}>
              {providers.map(({ name, image }) => (
                <img
                  className={styles.provider}
                  key={name}
                  alt={name}
                  src={image}
                  width={45}
                  height={45}
                />
              ))}
            </Space>
          </DataItem>
        )}

        <DataItem heading={t('detail.data.original.name')}>
          <Text disabled>{media.original_name}</Text>
        </DataItem>
        <DataItem heading={t('detail.data.original.language')}>
          <Text disabled>{t(getPropValue(media, 'original_language', '').toUpperCase())}</Text>
        </DataItem>
      </Space>

      <DetailExternalIds />
    </Space>
  );
};

/* -------------------------------------------------------------------------- */
/** DetailOverview (child component) **/
/* -------------------------------------------------------------------------- */

const DetailOverview = () => {
  const { t, media } = useMediaDetailContext();

  return (
    <Space direction="column" className={styles.overview}>
      <MediaHeading>{t('detail.overview.heading')}</MediaHeading>

      <Space gap={5} className={styles.genres}>
        {(media.genres || []).map(({ id, name }) => (
          <Button rounded light size="small" key={id} className={styles.genre}>
            {name}
          </Button>
        ))}
      </Space>

      <Text>{media.description || media.original_name}</Text>
    </Space>
  );
};

/* -------------------------------------------------------------------------- */
/** DetailCredit (child component) **/
/* -------------------------------------------------------------------------- */

const DetailCredits = () => {
  const { t, isMobile, media, type, id } = useMediaDetailContext();
  const cast = getPropValue(media, 'credits.cast', []);

  if (cast.isEmpty()) return null;

  return (
    <Space direction="column" gap={10} className={styles.credits}>
      <MediaHeading href={{ pathname: '/[type]/[id]/credits', query: { type, id } }}>
        {t('detail.credits.heading')}
      </MediaHeading>

      <Grid breakpoints={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }} spacing={4}>
        {cast.truncate(isMobile ? 5 : 10).map(({ id, name, image, characters }) => (
          <Grid.Item key={id}>
            <Space align="center" gap={10} className={styles.cast}>
              <Image
                alt={image}
                className={styles.image}
                src={image}
                width={80}
                ratio={1}
                quality={100}
                lazy
              />

              <Space direction="column" gap={2}>
                <Text size="sm" bold className={styles.name}>
                  {name}
                </Text>
                <Text size="sm" disabled className={styles.character} maxLines={2}>
                  {characters ? `${t('detail.credit.character')} ${characters}` : ''}
                </Text>
              </Space>
            </Space>
          </Grid.Item>
        ))}
      </Grid>
    </Space>
  );
};

/* -------------------------------------------------------------------------- */
/** DetailBody (child component) **/
/* -------------------------------------------------------------------------- */

const DetailBody = () => {
  const { key, handleVideo, handleZoom } = useMediaDetailContext();

  return (
    <div className={classes(styles.body, styles[key])}>
      <DetailData />
      <DetailOverview />

      <DetailCarousel section="seasons" path="seasons" numbered />

      <DetailCarousel
        section="videos"
        path="videos"
        imageKey="thumbnail"
        backdrop
        numbered
        action={{ icon: RiPlayFill, onClick: handleVideo }}
      />

      <DetailCarousel
        section="images"
        path="images.backdrops"
        backdrop
        numbered
        action={{ icon: IoMdExpand, onClick: handleZoom }}
      />

      <DetailCarousel section="recommendations" path="recommendations" />

      <DetailCredits />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/** Container (main component) **/
/* -------------------------------------------------------------------------- */

type ModalData = {
  type: 'video' | Lowercase<keyof typeof MediaImageType> | '';
  value: string;
  props?: ObjectGeneric & {
    ratio: number;
  };
};

export type MediaDetailProps = typeof defaultProps &
  ElementHTML & {
    media: MovieDetail | TVDetail;
  };

const defaultProps = {};

const MediaDetail = ({ className, media }: MediaDetailProps) => {
  const { t, i18n } = useI18n();
  const [modalData, setModalData] = useState<ModalData>({ type: '', value: '' });
  const { isOpened, handleChange } = useModal();
  const { key, isMobile, isTablet, isSmallDesktop } = useBreakpoint();
  const { type, id } = media;

  const handleVideo = (item: unknown) => {
    const video = item as MediaVideo;
    setModalData({ type: 'video', value: video.key });
    handleChange(true);
  };

  const handleZoom = (item: unknown) => {
    const { image, type, ratio } = item as MediaImage;
    setModalData({
      type,
      value: image,
      props: { ratio }
    });
    handleChange(true);
  };

  return (
    <MediaDetailContext.Provider
      value={{
        t,
        language: i18n ? i18n.language : '',
        key,
        id,
        type,
        media,
        isMobile,
        isSmallDesktop,
        isTablet,
        handleVideo,
        handleZoom
      }}>
      <div className={classes(styles.wrapper, styles[key], className)}>
        <Space className={styles.header} direction="column" gap={20} style={{ marginTop: 30 }}>
          <Space direction="column" gap={2}>
            <Heading level={2}>{media.name}</Heading>
            <Text size="sm" disabled bold>
              {[media.date, media.duration].compact().join(' - ')}
            </Text>
          </Space>

          <DetailImage />
        </Space>

        <DetailBody />
      </div>

      <Portal>
        <Portal.Paper>
          <Modal
            className={classes(styles[`${modalData.type}Modal`])}
            opened={isOpened}
            onChange={handleChange}>
            {modalData && modalData.type === 'video' && <Video id={modalData.value} autoplay />}
            {modalData && modalData.type !== 'video' && (
              <Image
                src={modalData.value}
                alt="image"
                quality={100}
                ratio={(modalData.props || {}).ratio}
              />
            )}
          </Modal>
        </Portal.Paper>
      </Portal>
    </MediaDetailContext.Provider>
  );
};

MediaDetail.defaultProps = defaultProps;

export default MediaDetail;
