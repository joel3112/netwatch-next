import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIMediaData, APIMediaDataList, DataListResponse, MediaData } from '@/types';
import { httpInterceptor, mediaMapper } from '@/utils/api';

type APIData = APIMediaDataList<APIMediaData>;
type Data = DataListResponse<MediaData>;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  axios.get(process.env.API_URL + '/trending/all/week').then((response: AxiosResponse<APIData>) => {
    const data: APIData = response.data;
    res.status(200).json({ ...data, results: data.results.map(mediaMapper) });
  });
}
