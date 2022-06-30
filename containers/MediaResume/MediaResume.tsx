import { useTranslation } from 'next-i18next';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { ElementHTML, MediaImageRatio, MovieDetail, TVDetail } from '@/types';
import { Heading, Text } from '@/components/typography';
import { Image } from '@/components/media';
import { Container, Space } from '@/components/layout';
import { Button } from '@/components/forms';
import { Card } from '@/components/display';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaResume/MediaResume.module.scss';

export type MediaResumeProps = typeof defaultProps &
  ElementHTML & {
    media?: MovieDetail | TVDetail;
  };

const defaultProps = {
  media: {}
};

const MediaResume = ({ media }: MediaResumeProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes(styles.wrapper, 'full', 'dark')}>
      <Image alt="backdrop" src={media.backdrop || ''} width="100%" />

      <Space justify="center" className={styles.body} direction="column" gap={2}>
        <Container>
          <Space gap={25} direction="row">
            <Card>
              <Image
                alt="image"
                src={media.image}
                width={110}
                ratio={MediaImageRatio.POSTER}
                lazy
              />
            </Card>

            <Space gap={10} direction="column">
              <Heading level={3}>{media.name}</Heading>
              <Text size="sm">{[media.date, media.duration].compact().join(' - ')}</Text>

              <Link
                href={{
                  pathname: '/[type]/[id]',
                  query: { type: media.type, id: media.id }
                }}>
                <a>
                  <Button className={styles.buttonBack} clear>
                    <FiArrowLeft />
                    {t('main.go.back.button')}
                  </Button>
                </a>
              </Link>
            </Space>
          </Space>
        </Container>
      </Space>
    </div>
  );
};

MediaResume.defaultProps = defaultProps;

export default MediaResume;
