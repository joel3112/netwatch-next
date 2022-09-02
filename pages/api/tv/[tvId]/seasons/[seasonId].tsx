import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIMediaSeasonDetail, MediaSeasonDetail } from '@/types';
import {
  httpInterceptor,
  languageFromLocale,
  regionFromLocale,
  seasonDetailMapper
} from '@/utils/api';

type APIData = APIMediaSeasonDetail;
type Data = MediaSeasonDetail;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { tvId, seasonId, language, ...params } = req.query;

  axios
    .get(`${process.env.API_URL}/tv/${tvId}/season/${seasonId}`, {
      params: {
        ...params,
        append_to_response: 'videos,images',
        language,
        region: regionFromLocale(language as string),
        watch_region: regionFromLocale(language as string),
        ...(language
          ? { include_image_language: `${languageFromLocale(language as string)},null` }
          : {}),
        ...(language
          ? { include_video_language: `${languageFromLocale(language as string)},null` }
          : {})
      }
    })
    .then((response: AxiosResponse<APIData>) => {
      const data: APIData = response.data;

      res.status(200).json(seasonDetailMapper(data));
    });
}
