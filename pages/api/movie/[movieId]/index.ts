import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIMovieDetail, MovieDetail } from '@/types';
import {
  externalIdsMapper,
  httpInterceptor,
  imagesMapper,
  movieDetailMapper,
  typeFromMedia,
  videosMapper,
  watchProvidersMapper
} from '@/utils/api';
import { getPropValue } from '@/utils/helpers';

type APIData = APIMovieDetail;
type Data = MovieDetail;

httpInterceptor();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { movieId, language, ...params } = req.query;

  axios
    .get(`${process.env.API_URL}/movie/${movieId}`, {
      params: {
        ...params,
        append_to_response: 'external_ids,credits,watch/providers,videos,images',
        include_image_language: `${language},null`,
        include_video_language: `${language},null`
      }
    })
    .then((response: AxiosResponse<APIData>) => {
      const data: APIData = response.data;

      res.status(200).json({
        ...movieDetailMapper(data),
        external_ids: externalIdsMapper(getPropValue(data, 'external_ids'), typeFromMedia(data)),
        'watch/providers': watchProvidersMapper(
          getPropValue(data, 'watch/providers'),
          String(language).toUpperCase()
        ),
        images: imagesMapper(getPropValue(data, 'images')),
        videos: videosMapper(getPropValue(data, 'videos'))
      });
    });
}
