import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIResponseListSuccess, APITVData } from '@/types/api';
import { DataListResponse, TVData } from '@/types/media';
import { httpInterceptor, mediaMapper } from '@/utils/api';

type Data = DataListResponse<TVData>;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  axios
    .get(process.env.API_URL + '/discover/tv', { params: req.query })
    .then((response: AxiosResponse<APIResponseListSuccess<APITVData>>) => {
      const data: APIResponseListSuccess<APITVData> = response.data;
      res.status(200).json({ ...data, results: data.results.map(mediaMapper) });
    });
}
