import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIMediaData, APIResponseListSuccess, DataListResponse, MediaData } from '@/types';
import { httpInterceptor, mediaMapper } from '@/utils/api';

type Data = DataListResponse<MediaData>;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  axios
    .get(process.env.API_URL + '/trending/all/week')
    .then((response: AxiosResponse<APIResponseListSuccess<APIMediaData>>) => {
      const data: APIResponseListSuccess<APIMediaData> = response.data;
      res.status(200).json({ ...data, results: data.results.map(mediaMapper) });
    });
}
