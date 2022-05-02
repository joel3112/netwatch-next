import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIResponseListSuccess, APITVData, TVData } from '@/types';
import { httpInterceptor, mediaMapper } from '@/utils/api';

type Data = Array<TVData>;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  axios
    .get(process.env.API_URL + '/discover/tv')
    .then((response: AxiosResponse<APIResponseListSuccess<APITVData>>) => {
      const { results } = response.data;
      res.status(200).json(results.map(mediaMapper));
    });
}
