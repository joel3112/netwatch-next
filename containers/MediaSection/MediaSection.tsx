import { useState } from 'react';
import { IconType } from 'react-icons';
import { RiPlayFill } from 'react-icons/ri';
import { IoMdExpand } from 'react-icons/io';
import { useTranslation } from 'next-i18next';
import {
  Breakpoints,
  MediaImage,
  MediaImageRatio,
  MediaImageType,
  MediaVideo,
  ObjectGeneric
} from '@/types';
import { useModal } from '@/hooks/useModal';
import { MediaHeading } from '@/containers/MediaHeading';
import { Container, Grid, Space } from '@/components/layout';
import { Heading } from '@/components/typography';
import { Card } from '@/components/display';
import { Image, Video } from '@/components/media';
import { Modal, Portal } from '@/components/overlay';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaSection/MediaSection.module.scss';

export type MediaSectionType = 'videos' | 'images';

export type MediaSectionItems = Array<MediaVideo> | { [key: string]: Array<MediaImage> };

export type MediaSectionProps = {
  items: MediaSectionItems;
  section: MediaSectionType;
};

type ModalData = {
  type: 'video' | Lowercase<keyof typeof MediaImageType> | '';
  value: string;
  props?: ObjectGeneric & {
    ratio: number;
  };
};

const defaultProps = {
  media: {}
};

enum SectionLabel {
  VIDEOS = 'detail.videos.heading',
  IMAGES = 'detail.images.heading',
  SEASONS = 'detail.seasons.heading'
}

enum SectionImageKey {
  VIDEOS = 'thumbnail',
  IMAGES = 'image',
  SEASONS = 'image'
}

enum SectionImageLabel {
  BACKDROPS = 'detail.images.backdrops.heading',
  LOGOS = 'detail.images.logos.heading',
  POSTERS = 'detail.seasons.posters.heading'
}

const sectionBreakpoints = (ratio: number) => {
  if (ratio === MediaImageRatio.BACKDROP) {
    return { xs: 2, sm: 2, md: 3, lg: 4, xl: 4 };
  }
  return { xs: 3, sm: 3, md: 4, lg: 5, xl: 5 };
};

const configurationBySection = (
  items: MediaSectionItems,
  section: MediaSectionType
): Array<{
  label?: string;
  breakpoints: Breakpoints;
  items: Array<ObjectGeneric>;
  action: {
    icon: IconType;
    onClick?: () => void;
  };
}> => {
  if (section === 'videos') {
    return [
      {
        items: items as Array<MediaVideo>,
        breakpoints: sectionBreakpoints(MediaImageRatio.BACKDROP),
        action: { icon: RiPlayFill }
      }
    ];
  }
  if (section === 'images') {
    return Object.entries(items).map(([key, value]) => {
      return {
        label: SectionImageLabel[key.toUpperCase() as keyof typeof SectionImageLabel],
        items: value as Array<MediaImage>,
        breakpoints: sectionBreakpoints(
          value && !value.isEmpty() ? value[0].ratio : MediaImageRatio.BACKDROP
        ),
        action: { icon: IoMdExpand }
      };
    });
  }

  return [];
};

const MediaSection = ({ items, section }: MediaSectionProps) => {
  const { t } = useTranslation();
  const sectionKey = section.toUpperCase() as keyof typeof SectionLabel;
  const config = configurationBySection(items, section);

  const [modalData, setModalData] = useState<ModalData>({ type: '', value: '' });
  const { isOpened, handleChange } = useModal();

  const handleClick = (item: unknown) => {
    if (section === 'videos') {
      const video = item as MediaVideo;
      setModalData({ type: 'video', value: video.key });
      handleChange(true);
    }
    if (section === 'images') {
      const { image, type, ratio } = item as MediaImage;
      setModalData({
        type,
        value: image,
        props: { ratio }
      });
      handleChange(true);
    }
  };

  return (
    <Container className={classes(styles.wrapper, styles[section])}>
      <Space className={styles.header} direction="column" gap={20} style={{ marginTop: 30 }}>
        <Space direction="column" gap={2}>
          {section && <Heading level={2}>{t(SectionLabel[sectionKey])}</Heading>}
        </Space>

        {config.map(
          ({ label, breakpoints, items, action }, index) =>
            !items.isEmpty() && (
              <Space key={index} direction="column" gap={20}>
                {label && <MediaHeading>{t(label)}</MediaHeading>}

                <Grid breakpoints={breakpoints} spacing={3}>
                  {items.map(({ [SectionImageKey[sectionKey]]: image, ...rest }, index) => (
                    <Grid.Item key={index}>
                      <Card className={styles.card} onClick={() => handleClick(items[index])}>
                        <Card.Image
                          className={styles.cardImage}
                          src={image}
                          alt={image}
                          ratio={rest['ratio'] || MediaImageRatio.BACKDROP}
                          lazy>
                          <Card.Actions className={styles.cardActions}>
                            {action && action.icon && (
                              <Card.Actions.Item className={styles.cardAction} icon={action.icon} />
                            )}
                          </Card.Actions>
                        </Card.Image>
                        <Card.Body title={rest['name']} description={rest['date']} />
                      </Card>
                    </Grid.Item>
                  ))}
                </Grid>
              </Space>
            )
        )}
      </Space>

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
    </Container>
  );
};

MediaSection.defaultProps = defaultProps;

export default MediaSection;
