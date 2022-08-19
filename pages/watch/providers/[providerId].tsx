import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  APIMediaData,
  APIMediaDataList,
  MediaData,
  MediaWatchProvider,
  APIMediaWatchProvider,
  APIResponseListSuccess
} from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { MediaCarousel } from '@/containers/MediaCarousel';
import { Heading } from '@/components/typography';
import { Container, Space } from '@/components/layout';
import { nextAPIBaseURL } from '@/utils/api';
import { Image } from '@/components/media';

type WatchProvidersPageProps = {
  detail?: MediaWatchProvider;
  movies?: Array<MediaData>;
  tvs?: Array<MediaData>;
};

const WatchProvidersPage: NextPage<WatchProvidersPageProps> = ({ detail, movies, tvs }) => {
  const { t } = useI18n('home');
  const { image, name } = detail || {};

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <Container margins>
        <Space direction="column" gap={20} style={{ marginTop: 30 }}>
          <Space align="center" gap={13}>
            <Image src={image || ''} alt={name} width={50} ratio={1} />
            <Heading level={2}>{name}</Heading>
          </Space>

          <MediaCarousel heading={t('movie.title')} items={movies} />

          <MediaCarousel heading={t('tv.title')} items={tvs} />
        </Space>
      </Container>
    </>
  );
};

export const getServerSideProps = async ({ locale, req, query }: GetServerSidePropsContext) => {
  const { providerId } = query;
  const requests = [
    axios.get<APIResponseListSuccess<APIMediaWatchProvider>>(
      `${nextAPIBaseURL(req)}/api/watch/providers/${providerId}`
    ),
    axios.get<APIMediaDataList<APIMediaData>>(
      `${nextAPIBaseURL(req)}/api/movie?with_watch_providers=${providerId}`
    ),
    axios.get<APIMediaDataList<APIMediaData>>(
      `${nextAPIBaseURL(req)}/api/tv?with_watch_providers=${providerId}`
    )
  ];
  const responses = await Promise.all(requests);
  const [provider, movies, tvs] = responses.map(({ data }) => data);

  return {
    props: {
      detail: provider,
      movies: movies.results,
      tvs: tvs.results,
      ...(await serverSideTranslations(String(locale), ['common', 'home']))
    }
  };
};

export default WatchProvidersPage;
