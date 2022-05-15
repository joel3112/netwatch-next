import type { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import axios from 'axios';
import { APITVDetail, TVDetail } from '@/types';
import { MediaDetail } from '@/containers/MediaDetail';
import { Container } from '@/components/layout';
import { nextAPIBaseURL } from '@/utils/api';

type TVDetailPageProps = {
  detail?: TVDetail;
};

const TVDetailPage: NextPage<TVDetailPageProps> = ({ detail }) => {
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
  const { tvId } = query;
  const detail = await axios.get<APITVDetail>(`${nextAPIBaseURL(req)}/api/tv/${tvId}`);

  return {
    props: {
      detail: detail.data,
      ...(await serverSideTranslations(String(locale), ['common', 'tv']))
    }
  };
};

export default TVDetailPage;
