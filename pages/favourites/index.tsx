import type { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useI18n } from '@/hooks/useI18n';
import { useFavourite } from '@/hooks/useFavourite';
import { MediaGrid } from '@/containers/MediaGrid';
import { Container, Space } from '@/components/layout';
import { Heading } from '@/components/typography';

const FavouritesPage: NextPage = () => {
  const { t } = useI18n('home');
  const { items } = useFavourite();

  return (
    <>
      <Head>
        <title>{t('favourites.title')}</title>
      </Head>

      <Container margins>
        <Space direction="column" gap={20} style={{ marginTop: 30 }}>
          <Heading level={2}>{t('favourites.title')}</Heading>

          <MediaGrid items={items} />
        </Space>
      </Container>
    </>
  );
};

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale), ['common', 'home']))
    }
  };
};

export default FavouritesPage;
