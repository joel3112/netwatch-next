import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIMediaVideoList, MediaVideoList } from '@/types';
import { httpInterceptor, videoMapper } from '@/utils/api';

type APIData = APIMediaVideoList;
type Data = MediaVideoList;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { movieId, ...params } = req.query;

  axios
    .get(`${process.env.API_URL}/movie/${movieId}/videos`, {
      params: {
        ...params,
        include_video_language: 'es,null'
      }
    })
    .then((response: AxiosResponse<APIData>) => {
      const data: APIData = response.data;
      res.status(200).json({ ...data, results: data.results.map(videoMapper) });
    });
}
