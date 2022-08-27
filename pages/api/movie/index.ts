import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIMediaDataList, APIMovieData, MediaDataList, MovieData } from '@/types';
import { httpInterceptor, mediaMapper, regionFromLocale } from '@/utils/api';

type APIData = APIMediaDataList<APIMovieData>;
type Data = MediaDataList<MovieData>;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { language, ...params } = req.query;

  axios
    .get(`${process.env.API_URL}/discover/movie`, {
      params: {
        ...params,
        language,
        region: regionFromLocale(language as string),
        watch_region: regionFromLocale(language as string)
      }
    })
    .then((response: AxiosResponse<APIData>) => {
      const data: APIData = response.data;

      res.status(200).json({
        ...data,
        results: data.results.map((item) => mediaMapper(item, language as string))
      });
    });
}
