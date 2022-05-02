import { APIMovieData, APITVData, MediaCommonData } from '@/types';
import { dateFromMedia, namesFromMedia, typeFromMedia } from '@/utils/api/helpers';

export const mediaMapper = (media: APIMovieData | APITVData): MediaCommonData => {
  const {
    id,
    media_type,
    overview,
    poster_path,
    backdrop_path,
    popularity,
    vote_average,
    vote_count
  } = media;

  return {
    id,
    type: media_type || typeFromMedia(media),
    description: overview,
    image: poster_path ? `${process.env.API_IMAGES_URL}${poster_path}` : '',
    backdrop: backdrop_path ? `${process.env.API_BACKDROP_URL}${backdrop_path}` : '',
    popularity,
    vote_count: +vote_count.toFixed(1),
    vote_average: +vote_average.toFixed(1),
    ...namesFromMedia(media),
    ...dateFromMedia(media)
  };
};
