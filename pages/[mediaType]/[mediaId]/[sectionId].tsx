import type { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import DefaultErrorPage from 'next/error';
import axios from 'axios';
import { APIMovieDetail, APITVDetail, MovieDetail, TVDetail } from '@/types';
import { Space } from '@/components/layout';
import { MediaSectionType } from '@/containers/MediaSection/MediaSection';
import { MediaResume } from '@/containers/MediaResume';
import { MediaSection } from '@/containers/MediaSection';
import { nextAPIBaseURL } from '@/utils/api';
import { getPropValue } from '@/utils/helpers';

const mediaDetailSections = ['videos', 'images'];

type MediaSectionPageProps = {
  detail?: MovieDetail | TVDetail;
  section?: MediaSectionType;
};

const MediaSectionPage: NextPage<MediaSectionPageProps> = ({ detail, section }) => {
  const { t } = useTranslation();
  const { name } = detail || {};
  const title = `${name} - ${t(`detail.${section}.heading`)}`;

  if (!mediaDetailSections.includes(String(section))) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Space className="full" direction="column">
        <MediaResume media={detail} />
        {section && <MediaSection section={section} items={getPropValue(detail, section)} />}
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
