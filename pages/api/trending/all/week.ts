import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIMediaData, APIMediaDataList, MediaDataList } from '@/types';
import { httpInterceptor, mediaMapper } from '@/utils/api';

type APIData = APIMediaDataList<APIMediaData>;
type Data = MediaDataList;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  axios.get(`${process.env.API_URL}/trending/all/week`).then((response: AxiosResponse<APIData>) => {
    const data: APIData = response.data;
    const { language } = req.query;

    res.status(200).json({
      ...data,
      results: data.results.map((item) => mediaMapper(item, language as string))
    });
  });
}
