import type { GetStaticPropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { MediaType } from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { MediaPagination } from '@/containers/MediaPagination';
import { Container, Space } from '@/components/layout';
import { Heading } from '@/components/typography';

const MoviePage: NextPage = () => {
  const { t } = useI18n('movie');

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>

      <Container margins>
        <Space direction="column" gap={20} style={{ marginTop: 30 }}>
          <Heading level={2}>{t('movie.title')}</Heading>

          <MediaPagination mediaType={MediaType.MOVIE} />
        </Space>
      </Container>
    </>
  );
};

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(String(locale), ['common', 'movie']))
  }
});

export default MoviePage;
