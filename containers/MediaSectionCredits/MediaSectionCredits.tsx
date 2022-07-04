import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { ElementChildren, ElementHTML, MediaCredit, MediaType } from '@/types';
import { Container, Grid, Space } from '@/components/layout';
import { Heading, Text } from '@/components/typography';
import { MediaHeading } from '@/containers/MediaHeading';
import { Image } from '@/components/media';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaSectionCredits/MediaSectionCredits.module.scss';

export type MediaSectionCreditsProps = typeof defaultProps &
  ElementHTML &
  ElementChildren & {
    cast: Array<MediaCredit>;
    crew: Array<MediaCredit>;
  };

const defaultProps = {
  name: 'MediaSectionCredits'
};

const MediaSectionCredits = ({ cast, crew }: MediaSectionCreditsProps) => {
  const { t } = useTranslation();

  const config = [
    { label: 'detail.credits.cast.heading', items: cast, job: 'characters' },
    { label: 'detail.credits.crew.heading', items: crew, job: 'job' }
  ];

  const breakpoints = { xs: 1, sm: 2, md: 2, lg: 3, xl: 3 };

  return (
    <Container className={classes(styles.wrapper, styles.credits)}>
      <Space className={styles.header} direction="column" gap={20} style={{ marginTop: 30 }}>
        <Space direction="column" gap={2}>
          <Heading level={2}>{t('detail.credits.heading')}</Heading>
        </Space>

        {config.map(
          ({ label, items }, index) =>
            !items.isEmpty() && (
              <Space key={index} direction="column" gap={20}>
                {label && <MediaHeading>{t(label)}</MediaHeading>}

                <Grid breakpoints={breakpoints} spacing={3}>
                  {items.map(({ id, name, image, characters, job }, index) => (
                    <Grid.Item key={index}>
                      <Link href={`/${MediaType.PERSON}/${id}`}>
                        <a>
                          <Space align="center" gap={10} className={styles.credit}>
                            <div className={styles.image}>
                              <Image
                                alt={image}
                                src={image}
                                width={100}
                                ratio={1}
                                quality={100}
                                lazy
                              />
                            </div>

                            <Space direction="column" gap={2}>
                              <Text size="md" bold className={styles.name}>
                                {name}
                              </Text>
                              <Text size="sm" disabled className={styles.character} maxLines={2}>
                                {characters
                                  ? `${t('detail.credit.character')} ${characters}`
                                  : job
                                  ? `${t(job)}`
                                  : ''}
                              </Text>
                            </Space>
                          </Space>
                        </a>
                      </Link>
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

MediaSectionCredits.defaultProps = defaultProps;

export default MediaSectionCredits;
