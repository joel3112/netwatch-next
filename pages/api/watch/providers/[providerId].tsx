import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIResponseListSuccess, APIMediaWatchProvider, MediaWatchProvider } from '@/types';
import { httpInterceptor, watchProviderMapper } from '@/utils/api';

type APIData = APIResponseListSuccess<APIMediaWatchProvider>;
type Data = MediaWatchProvider;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { providerId, ...params } = req.query;

  axios
    .get(`${process.env.API_URL}/watch/providers/tv`, { params })
    .then((response: AxiosResponse<APIData>) => {
      const data: APIData = response.data;
      const providerData = data.results.find(
        ({ provider_id }) => String(provider_id) === providerId
      ) as APIMediaWatchProvider;

      res.status(200).json(watchProviderMapper(providerData));
    });
}
