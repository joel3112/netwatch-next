import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIPersonDetail, PersonDetail } from '@/types';
import {
  httpInterceptor,
  languageFromLocale,
  personDetailMapper,
  regionFromLocale
} from '@/utils/api';

type APIData = APIPersonDetail;
type Data = PersonDetail;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { personId, language, ...params } = req.query;

  axios
    .get(`${process.env.API_URL}/person/${personId}`, {
      params: {
        ...params,
        append_to_response:
          'tagged_images,external_ids,images,combined_credits,movie_credits,tv_credits',
        language,
        region: regionFromLocale(language as string),
        watch_region: regionFromLocale(language as string),
        ...(language
          ? { include_image_language: `${languageFromLocale(language as string)},null` }
          : {})
      }
    })
    .then((response: AxiosResponse<APIData>) => {
      const data: APIData = response.data;

      res.status(200).json(personDetailMapper(data, language as string));
    });
}
