import { useTranslation } from 'next-i18next';
import {
  Breakpoints,
  ElementHTML,
  MediaImage,
  MediaImageRatio,
  MediaVideo,
  MovieDetail,
  ObjectGeneric,
  TVDetail
} from '@/types';
import { MediaHeading } from '@/containers/MediaHeading';
import { Container, Grid, Space } from '@/components/layout';
import { Heading } from '@/components/typography';
import { Card } from '@/components/display';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaSection/MediaSection.module.scss';

type MediaSection = 'videos' | 'images';

export type MediaSectionProps = typeof defaultProps &
  ElementHTML & {
    media: MovieDetail | TVDetail;
    section: MediaSection;
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
  media: MovieDetail | TVDetail,
  section: MediaSection
): Array<{
  label?: string;
  breakpoints: Breakpoints;
  items: Array<ObjectGeneric>;
}> => {
  const configuration = {
    videos: [
      {
        items: media.videos as Array<MediaVideo>,
        breakpoints: sectionBreakpoints(MediaImageRatio.BACKDROP)
      }
    ],
    images: Object.entries(media.images || {}).map(([key, value]) => {
      return {
        label: SectionImageLabel[key.toUpperCase() as keyof typeof SectionImageLabel],
        items: value as Array<MediaImage>,
        breakpoints: sectionBreakpoints(
          value && !value.isEmpty() ? value[0].ratio : MediaImageRatio.BACKDROP
        )
      };
    })
  };

  return configuration[section];
};

const MediaSection = ({ media, section }: MediaSectionProps) => {
  const { t } = useTranslation();
  const sectionKey = section.toUpperCase() as keyof typeof SectionLabel;
  const config = configurationBySection(media, section);

  return (
    <Container className={classes(styles.wrapper)}>
      <Space className={styles.header} direction="column" gap={20} style={{ marginTop: 30 }}>
        <Space direction="column" gap={2}>
          {section && <Heading level={2}>{t(SectionLabel[sectionKey])}</Heading>}
        </Space>

        {config.map(
          ({ label, breakpoints, items }, index) =>
            !items.isEmpty() && (
              <Space key={index} direction="column" gap={20}>
                {label && <MediaHeading>{t(label)}</MediaHeading>}

                <Grid breakpoints={breakpoints} spacing={3}>
                  {items.map(({ [SectionImageKey[sectionKey]]: image, ...rest }, index) => (
                    <Grid.Item key={index}>
                      <Card className={styles.card}>
                        <Card.Image
                          src={image}
                          alt={image}
                          ratio={rest['ratio'] || MediaImageRatio.BACKDROP}
                        />
                        <Card.Body title={rest['name']} />
                      </Card>
                    </Grid.Item>
                  ))}
                </Grid>
              </Space>
            )
        )}
      </Space>
    </Container>
  );
};

MediaSection.defaultProps = defaultProps;

export default MediaSection;
