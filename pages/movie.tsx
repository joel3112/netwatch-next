import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Container, Space } from '@/components/layout';
import { Heading } from '@/components/typography';
import { MediaGrid } from '@/containers/';

const MoviePage: NextPage = () => {
  const { t } = useTranslation('movie');

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>

      <Container margins>
        <Space direction="column" gap={20} style={{ marginTop: 30 }}>
          <Heading level={2}>{t('movie.title')}</Heading>

          <MediaGrid />
        </Space>
      </Container>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'movie']))
  }
});

export default MoviePage;
