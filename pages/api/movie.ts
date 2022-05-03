import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIResponseListSuccess, APIMovieData, MovieData, DataListResponse } from '@/types';
import { httpInterceptor, mediaMapper } from '@/utils/api';

type Data = DataListResponse<MovieData>;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  axios
    .get(process.env.API_URL + '/discover/movie', { params: req.query })
    .then((response: AxiosResponse<APIResponseListSuccess<APIMovieData>>) => {
      const data: APIResponseListSuccess<APIMovieData> = response.data;
      res.status(200).json({ ...data, results: data.results.map(mediaMapper) });
    });
}
