import type { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import axios from 'axios';
import { APIMovieDetail, MovieDetail } from '@/types';
import { MediaDetail } from '@/containers/MediaDetail';
import { Container } from '@/components/layout';
import { nextAPIBaseURL } from '@/utils/api';

type MovieDetailPageProps = {
  detail?: MovieDetail;
};

const MovieDetailPage: NextPage<MovieDetailPageProps> = ({ detail }) => {
  const { name } = detail || {};

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <Container margins>{detail && <MediaDetail media={detail} />}</Container>
    </>
  );
};

export const getServerSideProps = async ({ locale, req, query }: GetServerSidePropsContext) => {
  const { movieId } = query;
  const detail = await axios.get<APIMovieDetail>(`${nextAPIBaseURL(req)}/api/movie/${movieId}`);

  return {
    props: {
      detail: detail.data,
      ...(await serverSideTranslations(String(locale), ['common', 'movie']))
    }
  };
};

export default MovieDetailPage;
