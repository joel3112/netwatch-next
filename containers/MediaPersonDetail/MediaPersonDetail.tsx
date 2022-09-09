/* eslint-disable @next/next/no-img-element */
import { cloneElement, createContext, ReactNode, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Breakpoint } from '@mui/system/createTheme/createBreakpoints';
import { IconType } from 'react-icons';
import { IoMdExpand } from 'react-icons/io';
import { BiGlobe } from 'react-icons/bi';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { SiImdb } from 'react-icons/si';
import { CgCross } from 'react-icons/cg';
import {
  ElementChildren,
  ElementHTML,
  EmptyObject,
  FunctionVoid,
  MediaImage,
  MediaImageRatio,
  MediaImageType,
  MediaTypeKey,
  PersonDetail,
  ObjectGeneric
} from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { useModal } from '@/hooks/useModal';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { MediaHeading } from '@/containers/MediaHeading';
import { Space } from '@/components/layout';
import { Heading, Text } from '@/components/typography';
import { Image } from '@/components/media';
import { Button } from '@/components/forms';
import { Card, Carousel } from '@/components/display';
import { Modal, Portal } from '@/components/overlay';
import { classes, getBreakpointConfig, getPropValue } from '@/utils/helpers';
import styles from '@/containers/MediaPersonDetail/MediaPersonDetail.module.scss';

/* -------------------------------------------------------------------------- */
/** Context **/
/* -------------------------------------------------------------------------- */

type MediaDetailContextProps = Partial<typeof defaultValue> & {
  key: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isSmallDesktop: boolean;
  id: number;
  person: PersonDetail;
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
  const { key, person, handleZoom } = useMediaDetailContext();

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
      <div className={styles.image}>{imageTmpl('POSTER', person.image, { ratio: 1.2 })}</div>
    </Space>
  );
};

/* -------------------------------------------------------------------------- */
/** DetailCarousel (child component) **/
/* -------------------------------------------------------------------------- */

enum SectionLabel {
  KNOWN = 'person.known.by',
  IMAGES = 'detail.images.heading'
}

const sectionItemHref = (itemType?: MediaTypeKey, itemId?: string) => ({
  IMAGES: '',
  KNOWN: { pathname: '/[itemType]/[itemId]', query: { itemType, itemId } }
});

type DetailCarouselProps = ElementChildren<JSX.Element> & {
  section: keyof typeof SectionLabel;
  path: string;
  numbered?: boolean;
  action?: {
    icon?: IconType;
    onClick?: (item: unknown) => void;
  };
};

const DetailCarousel = ({ children, section, path, numbered, action }: DetailCarouselProps) => {
  const { t, key, person, isMobile, isTablet, isSmallDesktop } = useMediaDetailContext();
  const items = getPropValue(person, path, []);
  const { spacing, offset = 0 } = getBreakpointConfig(key) || {};

  const slidesPerView = () => {
    if (isTablet) return 3;
    if (isSmallDesktop) return 3;
    return isMobile ? 2 : 4;
  };

  const handleClickAction = (item: Array<unknown>) =>
    action && action.onClick && action.onClick(item);

  if (items.isEmpty()) return null;
  return (
    <Space direction="column" gap={10} className={classes(styles[section.toLowerCase()])}>
      {!items.isEmpty() && (
        <MediaHeading>{`${t(SectionLabel[section])} ${
          numbered ? `(${items.length})` : ''
        }`}</MediaHeading>
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
                href={sectionItemHref(item['type'], item['id'])[section]}
                className={styles.card}
                onClick={() => handleClickAction(item)}>
                <Card.Image
                  className={styles.image}
                  src={item['image']}
                  width="100%"
                  ratio={MediaImageRatio.POSTER}
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
  const { person } = useMediaDetailContext();
  const { t } = useTranslation();
  const homepage = getPropValue(person, 'homepage', '');
  const externalIds = getPropValue(person, 'external_ids', []);
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
  const { t, person } = useMediaDetailContext();

  const DataItem = ({ heading, children }: { heading: string; children: ReactNode }) => {
    return (
      <Space gap={5} direction="column" className={styles.dataItem}>
        <Text bold>{heading}</Text>
        {children}
      </Space>
    );
  };

  return (
    <Space direction="column" gap={20} className={styles.data}>
      <MediaHeading>{t('detail.data.heading')}</MediaHeading>

      <Space gap={20} direction="column">
        <DataItem heading={t('person.place.of.birth')}>
          <Text disabled>{person.place_of_birth || t('detail.empty')}</Text>
        </DataItem>
        {!person.also_known_as?.isEmpty() && (
          <DataItem heading={t('person.also.known')}>
            <Space direction="column" gap={5}>
              {(person.also_known_as || []).map((name) => (
                <Text key={name} disabled>
                  {name}
                </Text>
              ))}
            </Space>
          </DataItem>
        )}
        <DataItem heading={t('person.gender')}>
          <Text disabled>
            {person.gender ? t(`person.gender.${person.gender}`) : t('detail.empty')}
          </Text>
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
  const { t, person } = useMediaDetailContext();

  return (
    <Space direction="column" className={styles.overview}>
      <MediaHeading>{t('person.biography')}</MediaHeading>

      <Text>{person.biography || t('person.biography.empty')}</Text>
    </Space>
  );
};

/* -------------------------------------------------------------------------- */
/** DetailBody (child component) **/
/* -------------------------------------------------------------------------- */

const DetailBody = () => {
  const { key, handleZoom } = useMediaDetailContext();

  return (
    <div className={classes(styles.body, styles[key])}>
      <DetailData />
      <DetailOverview />

      <DetailCarousel
        section="IMAGES"
        path="images"
        numbered
        action={{ icon: IoMdExpand, onClick: handleZoom }}
      />

      <DetailCarousel section="KNOWN" path="combined_credits" />
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
    person: PersonDetail;
  };

const defaultProps = {};

const MediaDetailPerson = ({ className, person }: MediaDetailProps) => {
  const { t, i18n } = useI18n();
  const [modalData, setModalData] = useState<ModalData>({ type: '', value: '' });
  const { isOpened, handleChange } = useModal();
  const { key, isMobile, isTablet, isSmallDesktop } = useBreakpoint();

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
        id: person.id,
        person,
        isMobile,
        isSmallDesktop,
        isTablet,
        handleZoom
      }}>
      <div className={classes(styles.wrapper, styles[key], className)}>
        <Space className={styles.header} direction="column" gap={20} style={{ marginTop: 30 }}>
          <Space direction="column" gap={2}>
            <Space align="center">
              <Heading level={2}>{person.name}</Heading>
              {person.deathday && <CgCross className={styles.death} />}
            </Space>
            {!!person.age && (
              <Text size="sm" disabled bold>
                {[person.birthday, person.deathday]
                  .compact()
                  .join(' - ')
                  .concat(` (${person.age} ${t('person.age')})`)}
              </Text>
            )}
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
            {modalData && (
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

MediaDetailPerson.defaultProps = defaultProps;

export default MediaDetailPerson;
