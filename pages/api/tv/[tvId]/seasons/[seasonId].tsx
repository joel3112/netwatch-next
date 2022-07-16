import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIMediaSeasonDetail, MediaSeasonDetail } from '@/types';
import { httpInterceptor, seasonDetailMapper } from '@/utils/api';

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
        ...(language ? { include_image_language: `${language},null` } : {}),
        ...(language ? { include_video_language: `${language},null` } : {})
      }
    })
    .then((response: AxiosResponse<APIData>) => {
      const data: APIData = response.data;

      res.status(200).json(seasonDetailMapper(data));
    });
}
