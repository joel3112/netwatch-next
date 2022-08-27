import type { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { MediaTypeKey } from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { MediaPagination } from '@/containers/MediaPagination';
import { Container, Space } from '@/components/layout';
import { Heading } from '@/components/typography';

type MediaPageProps = {
  type: MediaTypeKey;
};

const MediaPage: NextPage<MediaPageProps> = ({ type }) => {
  const { t } = useI18n(type);

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>

      <Container margins>
        <Space direction="column" gap={20} style={{ marginTop: 30 }}>
          <Heading level={2}>{t(`${type}.title`)}</Heading>

          <MediaPagination mediaType={type} />
        </Space>
      </Container>
    </>
  );
};

export const getServerSideProps = async ({ locale, query }: GetServerSidePropsContext) => {
  const { mediaType } = query;
  return {
    props: {
      type: mediaType,
      ...(await serverSideTranslations(String(locale), ['common', String(mediaType)]))
    }
  };
};

export default MediaPage;
