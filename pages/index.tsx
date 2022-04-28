import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { Button } from '@/components/forms';

const Home: NextPage = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>

      <Container margins>
        <h1 className="wrapper">{t('welcome.title')}</h1>

        <h1>
          <Link href="/movies">
            <a>
              <Button>Movies</Button>
            </a>
          </Link>
        </h1>
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
