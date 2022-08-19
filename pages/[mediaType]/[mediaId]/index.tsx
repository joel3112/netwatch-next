import type { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import axios from 'axios';
import { APIMediaDetail, MovieDetail, TVDetail } from '@/types';
import { MediaDetail } from '@/containers/MediaDetail';
import { Container } from '@/components/layout';
import { nextAPIBaseURL } from '@/utils/api';

type MediaDetailPageProps = {
  detail?: MovieDetail | TVDetail;
};

const MediaDetailPage: NextPage<MediaDetailPageProps> = ({ detail }) => {
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
  const { mediaType, mediaId } = query;
  const detail = await axios.get<APIMediaDetail>(
    `${nextAPIBaseURL(req)}/api/${mediaType}/${mediaId}?language=${locale}`
  );

  return {
    props: {
      detail: detail.data,
      ...(await serverSideTranslations(String(locale), ['common', String(mediaType)]))
    }
  };
};

export default MediaDetailPage;
