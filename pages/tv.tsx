import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { MediaType } from '@/types/media';
import { MediaGrid } from '@/containers/';
import { Container, Space } from '@/components/layout';
import { Heading } from '@/components/typography';

const TVPage: NextPage = () => {
  const { t } = useTranslation('tv');

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>

      <Container margins>
        <Space direction="column" gap={20} style={{ marginTop: 30 }}>
          <Heading level={2}>{t('tv.title')}</Heading>

          <MediaGrid mediaKey={MediaType.TV} />
        </Space>
      </Container>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'tv']))
  }
});

export default TVPage;
