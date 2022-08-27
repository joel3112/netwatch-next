import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { APIMovieDetail, MovieDetail } from '@/types';
import {
  creditsMapper,
  externalIdsMapper,
  httpInterceptor,
  imagesMapper,
  languageFromLocale,
  mediaMapper,
  movieDetailMapper,
  regionFromLocale,
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
        append_to_response: 'external_ids,credits,watch/providers,videos,images,recommendations',
        language,
        region: regionFromLocale(language as string),
        watch_region: regionFromLocale(language as string),
        ...(language
          ? { include_image_language: `${languageFromLocale(language as string)},null` }
          : {}),
        ...(language
          ? { include_video_language: `${languageFromLocale(language as string)},null` }
          : {})
      }
    })
    .then((response: AxiosResponse<APIData>) => {
      const data: APIData = response.data;

      res.status(200).json({
        ...movieDetailMapper(data, language as string),
        external_ids: externalIdsMapper(getPropValue(data, 'external_ids'), typeFromMedia(data)),
        'watch/providers': watchProvidersMapper(
          getPropValue(data, 'watch/providers'),
          regionFromLocale(language as string)
        ),
        images: imagesMapper(getPropValue(data, 'images')),
        videos: videosMapper(getPropValue(data, 'videos')),
        credits: creditsMapper(getPropValue(data, 'credits')),
        recommendations: getPropValue(data, 'recommendations.results', []).map((item) =>
          mediaMapper(item, language as string)
        )
      });
    });
}
