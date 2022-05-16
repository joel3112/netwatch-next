import type { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import DefaultErrorPage from 'next/error';
import axios from 'axios';
import { APIMovieDetail, APITVDetail, MovieDetail, TVDetail } from '@/types';
import { Space } from '@/components/layout';
import { MediaResume } from '@/containers/MediaResume';
import { MediaSection } from '@/containers/MediaSection';
import { nextAPIBaseURL } from '@/utils/api';

const mediaDetailSections = ['videos', 'images', 'seasons'];

type MediaSectionPageProps = {
  detail?: MovieDetail | TVDetail;
  section?: 'videos' | 'images';
};

const MediaSectionPage: NextPage<MediaSectionPageProps> = ({ detail, section }) => {
  const { name } = detail || {};

  if (!mediaDetailSections.includes(String(section))) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <Space className="full" direction="column">
        <MediaResume media={detail} />
        {section && <MediaSection section={section} media={detail} />}
      </Space>
    </>
  );
};

export const getServerSideProps = async ({ locale, req, query }: GetServerSidePropsContext) => {
  const { mediaType, mediaId, sectionId } = query;
  const detail = await axios.get<APIMovieDetail | APITVDetail>(
    `${nextAPIBaseURL(req)}/api/${mediaType}/${mediaId}`
  );

  return {
    props: {
      detail: detail.data,
      section: sectionId,
      ...(await serverSideTranslations(String(locale), ['common', String(mediaType)]))
    }
  };
};

export default MediaSectionPage;
