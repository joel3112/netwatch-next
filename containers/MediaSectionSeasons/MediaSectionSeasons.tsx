import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { MediaSeason, MediaType, MediaImageRatio } from '@/types';
import { Heading, Text } from '@/components/typography';
import { Container, Space } from '@/components/layout';
import { Image } from '@/components/media';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaSectionSeasons/MediaSectionSeasons.module.scss';

type MediaSectionSeasonsProps = {
  seasons: Array<MediaSeason>;
  mediaId: number;
};

const defaultProps = {
  name: 'MediaSectionSeasons'
};

const MediaSectionSeasons = ({ seasons, mediaId }: MediaSectionSeasonsProps) => {
  const { t } = useTranslation();
  const title = `${t('detail.seasons.heading')} (${seasons.length})`;

  return (
    <Container className={classes(styles.wrapper)}>
      <Space className={styles.header} direction="column" gap={20} style={{ marginTop: 30 }}>
        <Space direction="column" gap={2}>
          <Heading level={2}>{title}</Heading>
        </Space>

        <Space direction="column" gap={20} className={styles.seasons}>
          {seasons.map(({ id, name, image, description, date, episodes, key }) => (
            <Link key={key} href={`/${MediaType.TV}/${mediaId}/seasons/${id}`}>
              <a className={styles.season}>
                <Space align="center" gap={10}>
                  <div className={styles.image}>
                    <Image
                      alt={image}
                      src={image}
                      width={130}
                      ratio={MediaImageRatio.POSTER}
                      quality={100}
                      lazy
                    />
                  </div>

                  <Space direction="column" gap={2}>
                    <Text size="md" bold className={styles.name}>
                      {name}
                    </Text>

                    <Space gap={5}>
                      <Text size="md" className={styles.date}>
                        {date}
                      </Text>
                      <span> - </span>
                      <Text size="md" className={styles.date}>
                        {`${episodes} ${t('detail.episodes.heading').toLowerCase()}`}
                      </Text>
                    </Space>
                    <Text size="sm" disabled className={styles.description} maxLines={5}>
                      {description}
                    </Text>
                  </Space>
                </Space>
              </a>
            </Link>
          ))}
        </Space>
      </Space>
    </Container>
  );
};

MediaSectionSeasons.defaultProps = defaultProps;

export default MediaSectionSeasons;
