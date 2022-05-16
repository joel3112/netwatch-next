import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIMediaDataList, APITVData, MediaDataList, TVData } from '@/types';
import { httpInterceptor, mediaMapper } from '@/utils/api';

type APIData = APIMediaDataList<APITVData>;
type Data = MediaDataList<TVData>;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  axios
    .get(`${process.env.API_URL}/discover/tv`, { params: req.query })
    .then((response: AxiosResponse<APIData>) => {
      const data: APIData = response.data;
      const { language } = req.query;

      res.status(200).json({
        ...data,
        results: data.results.map((item) => mediaMapper(item, language as string))
      });
    });
}
