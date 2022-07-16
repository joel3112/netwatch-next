import type { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import axios from 'axios';
import { MediaType, APITVDetail, TVDetail, APIMediaSeasonDetail, MediaSeasonDetail } from '@/types';
import { Space } from '@/components/layout';
import { MediaResume } from '@/containers/MediaResume';
import { MediaSectionSeasons } from '@/containers/MediaSectionSeasons';
import { nextAPIBaseURL } from '@/utils/api';
import { getPropValue } from '@/utils/helpers';

type MediaSeasonsPageProps = {
  detail?: TVDetail;
  season?: MediaSeasonDetail;
};

const MediaSeasonsPage: NextPage<MediaSeasonsPageProps> = ({ detail, season }) => {
  const { t } = useTranslation();
  const { name } = detail || {};
  const title = `${name} - ${t('detail.seasons.heading')}`;
  const seasons = getPropValue(detail, 'seasons', []);

  let resumeDetail = { ...detail };
  if (season && season.episodes) {
    resumeDetail = {
      ...resumeDetail,
      image: season.image
    };
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Space className="full" direction="column">
        <MediaResume media={resumeDetail as TVDetail} />
        {detail && <MediaSectionSeasons seasons={seasons} season={season} mediaId={detail.id} />}
      </Space>
    </>
  );
};

export const getServerSideProps = async ({ locale, req, query }: GetServerSidePropsContext) => {
  const { mediaId, params } = query;
  const detail = await axios.get<APITVDetail>(
    `${nextAPIBaseURL(req)}/api/${MediaType.TV}/${mediaId}`
  );
  let season = {};

  if (params && params.length > 0) {
    const [seasonId] = params as string[];
    if (seasonId) {
      season = await axios.get<APIMediaSeasonDetail>(
        `${nextAPIBaseURL(req)}/api/${MediaType.TV}/${mediaId}/seasons/${seasonId}`
      );
    }
  }

  return {
    props: {
      detail: detail.data,
      season: getPropValue(season, 'data', {}),
      ...(await serverSideTranslations(String(locale), ['common', MediaType.TV]))
    }
  };
};

export default MediaSeasonsPage;
