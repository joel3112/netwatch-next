import { useState, createContext, useContext, cloneElement, ReactNode } from 'react';
import { Breakpoint } from '@mui/system/createTheme/createBreakpoints';
import { IconType } from 'react-icons';
import { IoMdExpand } from 'react-icons/io';
import { RiPlayFill } from 'react-icons/ri';
import { BiGlobe } from 'react-icons/bi';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { SiImdb } from 'react-icons/si';
import {
  ElementChildren,
  ElementHTML,
  FunctionVoid,
  MediaImage,
  MediaImageRatio,
  MediaImageType,
  MediaTypeKey,
  MediaVideo,
  MovieDetail,
  ObjectGeneric,
  TVDetail
} from '@/types';
import { useModal } from '@/hooks/useModal';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { MediaHeading } from '@/containers/MediaHeading';
import { Grid, Space } from '@/components/layout';
import { Heading, Text } from '@/components/typography';
import { Image, Video } from '@/components/media';
import { Button } from '@/components/forms';
import { Card, Carousel } from '@/components/display';
import { Modal, Portal } from '@/components/overlay';
import { classes, getBreakpointConfig, getPropValue } from '@/utils/helpers';
import styles from '@/containers/MediaDetail/MediaDetail.module.scss';

/* -------------------------------------------------------------------------- */
/** Context **/
/* -------------------------------------------------------------------------- */

type MediaDetailContextProps = Partial<typeof defaultValue> & {
  key: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  id: number;
  type: MediaTypeKey;
  media: MovieDetail | TVDetail;
  handleVideo: FunctionVoid<unknown>;
  handleZoom: FunctionVoid<unknown>;
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
          <Card.Actions.Item
            className={styles.action}
            icon={IoMdExpand}
            onClick={() =>
              handleZoom({ type: MediaImageType[key], image: url, ratio: MediaImageRatio[key] })
            }
          />
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
  VIDEOS = 'Videos',
  IMAGES = 'Imágenes'
}

type DetailCarouselProps = ElementChildren<JSX.Element> & {
  section: Lowercase<keyof typeof SectionLabel>;
  path: string;
  imageKey?: string;
  numbered?: boolean;
  action?: {
    icon: IconType;
    onClick?: (item: unknown) => void;
  };
};

const DetailCarousel = ({
  children,
  section,
  path,
  imageKey,
  numbered,
  action
}: DetailCarouselProps) => {
  const { key, media, type, id, isMobile } = useMediaDetailContext();
  const items = getPropValue(media, path, []);
  const { spacing, offset = 0 } = getBreakpointConfig(key) || {};

  const handleClickAction = (item: Array<unknown>) =>
    action && action.onClick && action.onClick(item);

  return (
    <Space direction="column" gap={10} className={classes(styles[section])}>
      {!items.isEmpty() && (
        <MediaHeading href={{ pathname: '/[type]/[id]/[section]', query: { type, id, section } }}>
          {`${SectionLabel[section.toUpperCase() as keyof typeof SectionLabel]} ${
            numbered ? `(${items.length})` : ''
          }`}
        </MediaHeading>
      )}

      <Carousel
        slidesPerView={isMobile ? 1 : 2}
        spacing={spacing * 4}
        offset={offset + 1}
        navigation={items.length > (isMobile ? 1 : 2)}
        className={classes(styles.carousel)}>
        {(items || []).map((item, index) => (
          <Carousel.Item key={index}>
            {children ? (
              cloneElement(children, { item })
            ) : (
              <Card className={styles.card} onClick={() => handleClickAction(item)}>
                <Card.Image
                  className={styles.image}
                  src={item[imageKey || 'image']}
                  width="100%"
                  ratio={MediaImageRatio.BACKDROP}
                  quality={100}
                  lazy>
                  <Card.Actions className={styles.actions}>
                    {action && <Card.Actions.Item className={styles.action} icon={action.icon} />}
                  </Card.Actions>
                </Card.Image>
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
  const homepage = getPropValue(media, 'homepage', '');
  const externalIds = getPropValue(media, 'external_ids', []);
  const buttonProps = { rounded: true, light: true, className: styles.externalId };

  return (
    <Space gap={10} className={styles.externalIds}>
      {homepage && (
        <a href={homepage} target="blank">
          <Button {...buttonProps}>
            <BiGlobe />
          </Button>
        </a>
      )}

      {externalIds.map(({ id, url }) => {
        const Icon = ExternalLinkIcons[id];
        return (
          <a key={id} href={url} target="blank">
            <Button {...buttonProps}>{Icon}</Button>
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
  const { media } = useMediaDetailContext();
  const providers = getPropValue(media, 'watch/providers', []);

  const DataItem = ({ heading, children }: { heading: string; children: ReactNode }) => {
    return (
      <Space gap={5} direction="column" className={styles.dataItem}>
        <Text bold>{heading}</Text>
        {children}
      </Space>
    );
  };

  return (
    <Space direction="column" gap={10} className={styles.data}>
      <Button className={styles.button}>Ver trailer</Button>
      <Button className={styles.button}>Ver ahora</Button>
      <Button className={styles.button} light>
        Mi lista
      </Button>

      <MediaHeading>Datos</MediaHeading>

      <Space gap={20} direction="column">
        {providers.length && (
          <DataItem heading="Disponible en">
            <Text disabled>{providers.toString()}</Text>
          </DataItem>
        )}

        <DataItem heading="Nombre original">
          <Text disabled>{media.original_name}</Text>
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
  const { media } = useMediaDetailContext();

  return (
    <Space direction="column" className={styles.overview}>
      <MediaHeading>Vista general</MediaHeading>

      <Space gap={5} className={styles.genres}>
        {(media.genres || []).map(({ id, name }) => (
          <Button rounded light size="small" key={id} className={styles.genre}>
            {name}
          </Button>
        ))}
      </Space>

      <Text>{media.description}</Text>
    </Space>
  );
};

/* -------------------------------------------------------------------------- */
/** DetailCredit (child component) **/
/* -------------------------------------------------------------------------- */

const DetailCredits = () => {
  const { isMobile, media } = useMediaDetailContext();
  const cast = getPropValue(media, 'credits.cast', []);

  return (
    <Space direction="column" gap={10} className={styles.credits}>
      <MediaHeading>Reparto Principal</MediaHeading>

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

              <Space direction="column" gap={5}>
                <Text size="sm" bold className={styles.name}>
                  {name}
                </Text>
                <Text size="sm" disabled className={styles.character}>
                  {characters ? `as ${characters}` : ''}
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

      <DetailCarousel
        section="videos"
        path="videos"
        imageKey="thumbnail"
        numbered
        action={{ icon: RiPlayFill, onClick: handleVideo }}
      />

      <DetailCarousel
        section="images"
        path="images.backdrops"
        numbered
        action={{ icon: IoMdExpand, onClick: handleZoom }}
      />

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
  const [modalData, setModalData] = useState<ModalData>({ type: '', value: '' });
  const { isOpened, handleChange } = useModal();
  const { key, isMobile, isTablet } = useBreakpoint();
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
      value={{ key, id, type, media, isMobile, isTablet, handleVideo, handleZoom }}>
      <div className={classes(styles.wrapper, styles[key], className)}>
        <Space className={styles.header} direction="column" gap={20} style={{ marginTop: 30 }}>
          <Heading level={2}>{media.name}</Heading>
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
