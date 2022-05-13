import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { APIMediaData, APIMediaDataList, MediaData } from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { MediaCarousel } from '@/containers/MediaCarousel';
import { Heading } from '@/components/typography';
import { Container, Space } from '@/components/layout';
import { nextAPIBaseURL } from '@/utils/api';

type HomePageProps = {
  [key in 'trendingWeek' | 'trendingDay' | 'movies' | 'tvs']?: Array<MediaData>;
};

const HomePage: NextPage<HomePageProps> = ({ trendingWeek, trendingDay, movies, tvs }) => {
  const { t } = useI18n('home');

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>

      <Container margins>
        <Space direction="column" gap={20} style={{ marginTop: 30 }}>
          <Heading level={2}>{t('welcome.title')}</Heading>

          <MediaCarousel
            condensed
            pagination
            loop
            autoplay
            backdrop
            slides={1}
            items={trendingWeek}
          />

          <MediaCarousel heading={t('trending.title')} backdrop items={trendingDay} />

          <MediaCarousel heading={t('movie.title')} href="/movie" items={movies} />

          <MediaCarousel heading={t('tv.title')} href="/tv" items={tvs} />
        </Space>
      </Container>
    </>
  );
};

export const getServerSideProps = async ({ locale, req }: GetServerSidePropsContext) => {
  const trendingWeek = await axios.get<APIMediaDataList<APIMediaData>>(
    `${nextAPIBaseURL(req)}/api/trending/all/week`
  );
  const trendingDay = await axios.get<APIMediaDataList<APIMediaData>>(
    `${nextAPIBaseURL(req)}/api/trending/all/day`
  );
  const movies = await axios.get<APIMediaDataList<APIMediaData>>(
    `${nextAPIBaseURL(req)}/api/movie`
  );
  const tvs = await axios.get<APIMediaDataList<APIMediaData>>(`${nextAPIBaseURL(req)}/api/tv`);

  return {
    props: {
      trendingWeek: trendingWeek.data.results,
      trendingDay: trendingDay.data.results,
      movies: movies.data.results,
      tvs: tvs.data.results,
      ...(await serverSideTranslations(String(locale), ['common', 'home']))
    }
  };
};

export default HomePage;
