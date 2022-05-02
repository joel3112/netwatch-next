import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIResponseListSuccess, APIMovieData, MovieData } from '@/types';
import { httpInterceptor, mediaMapper } from '@/utils/api';

type Data = Array<MovieData>;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  axios
    .get(process.env.API_URL + '/discover/movie')
    .then((response: AxiosResponse<APIResponseListSuccess<APIMovieData>>) => {
      const { results } = response.data;
      res.status(200).json(results.map(mediaMapper));
    });
}
