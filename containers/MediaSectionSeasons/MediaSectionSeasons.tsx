import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { MediaSeason, MediaType, MediaImageRatio, MediaSeasonDetail } from '@/types';
import { Heading, Text } from '@/components/typography';
import { Container, Space, Grid } from '@/components/layout';
import { Button, Select } from '@/components/forms';
import { Card } from '@/components/display';
import { Image } from '@/components/media';
import { classes, getPropValue } from '@/utils/helpers';
import styles from '@/containers/MediaSectionSeasons/MediaSectionSeasons.module.scss';

type MediaSectionSeasonsProps = {
  mediaId: number;
  seasons: Array<MediaSeason>;
  season?: MediaSeasonDetail;
};

const SeasonImage = ({ image, width }: { image: string; width: number }) => {
  return (
    <div className={styles.image}>
      <Image
        alt={image}
        src={image}
        width={width}
        ratio={MediaImageRatio.POSTER}
        quality={100}
        lazy
      />
    </div>
  );
};

const Seasons = ({ mediaId, seasons }: MediaSectionSeasonsProps) => {
  const { t } = useTranslation();

  return (
    <Space direction="column" gap={20} className={styles.seasons}>
      {(seasons || []).map(({ id, name, image, description, date, episodes, key }) => (
        <Link key={key} href={`/${MediaType.TV}/${mediaId}/seasons/${id}`}>
          <a className={styles.season}>
            <Space align="center" gap={25}>
              <SeasonImage image={image} width={130} />

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
  );
};

const Season = ({ season }: MediaSectionSeasonsProps) => {
  const description = getPropValue(season, 'description', '');
  const episodes = getPropValue(season, 'episodes', []);
  const breakpoints = { xs: 1, sm: 2, md: 2, lg: 3, xl: 3 };

  return (
    <Space direction="column" gap={30} className={styles.seasons}>
      {description && (
        <Text size="md" className={styles.name}>
          {description}
        </Text>
      )}

      <Grid breakpoints={breakpoints} spacing={3}>
        {episodes.map(({ id, name, image, date }) => (
          <Grid.Item key={id}>
            <Card className={styles.card}>
              <Card.Image
                className={styles.cardImage}
                src={image}
                alt={image}
                ratio={MediaImageRatio.BACKDROP}
              />
              <Card.Body title={name} description={date} />
            </Card>
          </Grid.Item>
        ))}
      </Grid>
    </Space>
  );
};

const SeasonHeading = ({ seasons, season, mediaId }: MediaSectionSeasonsProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const id = getPropValue(season, 'id', '');

  const handleChange = (value: string) => {
    if (value === 'all') {
      router.push(`/${MediaType.TV}/${mediaId}/seasons`);
      return;
    }
    router.push(`/${MediaType.TV}/${mediaId}/seasons/${value}`);
  };

  const hasPrev = useMemo(() => seasons.findIndex((s) => +s.id === +id) > 0, [seasons, id]);
  const hasNext = useMemo(
    () => seasons.findIndex((s) => +s.id === +id) < seasons.length - 1,
    [seasons, id]
  );

  return (
    <Space justify="between" gap={10} wrap>
      <Select
        className={styles.selector}
        value={id}
        placeholder={t('detail.seasons.selector')}
        onChange={handleChange}>
        {[...seasons, { id: 'all', key: t('detail.seasons.selector.all') }].map(({ id, key }) => (
          <Select.Item key={id} value={id}>
            {key}
          </Select.Item>
        ))}
      </Select>

      <Space gap={10}>
        {hasPrev && (
          <Button
            secondary
            rounded
            size="small"
            className={classes(styles.navigation, styles.prev)}
            onClick={() => router.push(`/${MediaType.TV}/${mediaId}/seasons/${+id - 1}`)}>
            <FiChevronLeft className={styles.icon} />
            {t('detail.seasons.selector.prev')}
          </Button>
        )}
        {hasNext && (
          <Button
            secondary
            rounded
            size="small"
            className={classes(styles.navigation, styles.next)}
            onClick={() => router.push(`/${MediaType.TV}/${mediaId}/seasons/${+id + 1}`)}>
            {t('detail.seasons.selector.next')}
            <FiChevronRight className={styles.icon} />
          </Button>
        )}
      </Space>
    </Space>
  );
};

const MediaSectionSeasons = ({ mediaId, seasons, season }: MediaSectionSeasonsProps) => {
  const { t } = useTranslation();

  const type = season && season.episodes ? 'season' : 'seasons';
  const config: {
    Title: () => JSX.Element;
    Content: () => JSX.Element;
  } = useMemo(() => {
    return {
      seasons: {
        Title: () => (
          <Heading level={2}>{`${t('detail.seasons.heading')} (${seasons.length})`}</Heading>
        ),
        Content: () => <Seasons mediaId={mediaId} seasons={seasons} />
      },
      season: {
        Title: () => <SeasonHeading seasons={seasons} season={season} mediaId={mediaId} />,
        Content: () => <Season mediaId={mediaId} seasons={seasons} season={season} />
      }
    }[type];
  }, [t, seasons, season, type, mediaId]);
  const { Title, Content } = config || {};

  return (
    <Container className={classes(styles.wrapper)}>
      <Space className={styles.header} direction="column" gap={20} style={{ marginTop: 30 }}>
        <Space direction="column" gap={2}>
          {Title && <Title />}

          {Content && <Content />}
        </Space>
      </Space>
    </Container>
  );
};

export default MediaSectionSeasons;
