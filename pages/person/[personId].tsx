import type { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import axios from 'axios';
import { APIPersonDetail, PersonDetail } from '@/types';
import { MediaPersonDetail } from '@/containers/MediaPersonDetail';
import { Container } from '@/components/layout';
import { nextAPIBaseURL } from '@/utils/api';

type PersonDetailPageProps = {
  detail?: PersonDetail;
};

const PersonDetailPage: NextPage<PersonDetailPageProps> = ({ detail }) => {
  const { name } = detail || {};

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <Container margins>{detail && <MediaPersonDetail person={detail} />}</Container>
    </>
  );
};

export const getServerSideProps = async ({ locale, req, query }: GetServerSidePropsContext) => {
  const { personId } = query;
  const detail = await axios.get<APIPersonDetail>(
    `${nextAPIBaseURL(req)}/api/person/${personId}?language=${locale}`
  );

  return {
    props: {
      detail: detail.data,
      ...(await serverSideTranslations(String(locale), ['common']))
    }
  };
};

export default PersonDetailPage;
