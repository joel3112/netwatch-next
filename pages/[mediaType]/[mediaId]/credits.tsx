import type { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import axios from 'axios';
import { APIMovieDetail, APITVDetail, MovieDetail, TVDetail } from '@/types';
import { Space } from '@/components/layout';
import { MediaResume } from '@/containers/MediaResume';
import { MediaSectionCredits } from '@/containers/MediaSectionCredits';
import { nextAPIBaseURL } from '@/utils/api';
import { getPropValue } from '@/utils/helpers';

type MediaCreditsPageProps = {
  detail?: MovieDetail | TVDetail;
};

const MediaCreditsPage: NextPage<MediaCreditsPageProps> = ({ detail }) => {
  const { t } = useTranslation();
  const { name } = detail || {};
  const title = `${name} - ${t('detail.credits.heading')}`;
  const cast = getPropValue(detail, 'credits.cast', []);
  const crew = getPropValue(detail, 'credits.crew', []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Space className="full" direction="column">
        <MediaResume media={detail} />
        {detail && <MediaSectionCredits cast={cast} crew={crew} />}
      </Space>
    </>
  );
};

export const getServerSideProps = async ({ locale, req, query }: GetServerSidePropsContext) => {
  const { mediaType, mediaId } = query;
  const detail = await axios.get<APIMovieDetail | APITVDetail>(
    `${nextAPIBaseURL(req)}/api/${mediaType}/${mediaId}?language=${locale}`
  );

  return {
    props: {
      detail: detail.data,
      ...(await serverSideTranslations(String(locale), ['common', String(mediaType)]))
    }
  };
};

export default MediaCreditsPage;
