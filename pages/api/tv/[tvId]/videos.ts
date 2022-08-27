import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIMediaVideoList, MediaVideoList } from '@/types';
import { httpInterceptor, languageFromLocale, regionFromLocale, videosMapper } from '@/utils/api';

type APIData = APIMediaVideoList;
type Data = MediaVideoList;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { tvId, language, ...params } = req.query;

  axios
    .get(`${process.env.API_URL}/tv/${tvId}/videos`, {
      params: {
        ...params,
        language,
        region: regionFromLocale(language as string),
        watch_region: regionFromLocale(language as string),
        ...(language
          ? { include_video_language: `${languageFromLocale(language as string)},null` }
          : {})
      }
    })
    .then((response: AxiosResponse<APIData>) => {
      const data: APIData = response.data;

      res.status(200).json(videosMapper(data));
    });
}
