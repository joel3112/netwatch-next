import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { Heading, Text } from '@/components/typography';
import { Container, Space } from '@/components/layout';
import { Button } from '@/components/forms';

const Home: NextPage = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>

      <Container margins>
        <Space direction="column" gap={20} style={{ marginTop: 30 }}>
          <Heading level={2}>{t('welcome.title')}</Heading>

          <Text size="md">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda dolore
            expedita harum ipsum labore laudantium libero molestias nam numquam odio omnis, quaerat
            quas rem repellendus similique tempore unde ut.
          </Text>

          <Link href="/movies">
            <a>
              <Button>Movies</Button>
            </a>
          </Link>
        </Space>
      </Container>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'home']))
  }
});

export default Home;
