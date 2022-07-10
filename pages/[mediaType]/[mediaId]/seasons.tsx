import type { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import axios from 'axios';
import { APIMovieDetail, APITVDetail, MovieDetail, TVDetail } from '@/types';
import { Space } from '@/components/layout';
import { MediaResume } from '@/containers/MediaResume';
import { MediaSectionSeasons } from '@/containers/MediaSectionSeasons';
import { nextAPIBaseURL } from '@/utils/api';
import { getPropValue } from '@/utils/helpers';

type MediaSeasonsPageProps = {
  detail?: MovieDetail | TVDetail;
};

const MediaSeasonsPage: NextPage<MediaSeasonsPageProps> = ({ detail }) => {
  const { t } = useTranslation();
  const { name } = detail || {};
  const title = `${name} - ${t('detail.seasons.heading')}`;
  const seasons = getPropValue(detail, 'seasons', []);

  console.log(seasons);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Space className="full" direction="column">
        <MediaResume media={detail} />
        {detail && <MediaSectionSeasons seasons={seasons} mediaId={detail.id} />}
      </Space>
    </>
  );
};

export const getServerSideProps = async ({ locale, req, query }: GetServerSidePropsContext) => {
  const { mediaType, mediaId } = query;
  const detail = await axios.get<APIMovieDetail | APITVDetail>(
    `${nextAPIBaseURL(req)}/api/${mediaType}/${mediaId}`
  );

  return {
    props: {
      detail: detail.data,
      ...(await serverSideTranslations(String(locale), ['common', String(mediaType)]))
    }
  };
};

export default MediaSeasonsPage;
