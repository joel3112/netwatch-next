import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Space } from '@/components/layout';
import { Button } from '@/components/forms';
import { Heading, Text } from '@/components/typography';
import { Drawer, Portal } from '@/components/overlay';

const Home: NextPage = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>

      <Container margins>
        <Space direction="column" gap={10} style={{ marginTop: 30 }}>
          <Heading level={2}>{t('welcome.title')}</Heading>

          <Text size="md">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda dolore
            expedita harum ipsum labore laudantium libero molestias nam numquam odio omnis, quaerat
            quas rem repellendus similique tempore unde ut.
          </Text>
        </Space>

        <h1>
          <Link href="/movies">
            <a>
              <Button>Movies</Button>
            </a>
          </Link>
        </h1>

        <Portal>
          <Portal.Handler>
            <Button outline>Menu</Button>
          </Portal.Handler>
          <Portal.Paper>
            <Drawer heading="Ajustes" position="right">
              Hola
            </Drawer>
          </Portal.Paper>
        </Portal>
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
