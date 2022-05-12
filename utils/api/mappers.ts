import { APIMediaData, APIMediaVideo, MediaData, MediaVideo } from '@/types';
import { dateFromMedia, namesFromMedia, typeFromMedia } from '@/utils/api';

export const mediaMapper = (media: APIMediaData): MediaData => {
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
    image: poster_path
      ? `${process.env.API_IMAGES_URL}${poster_path}`
      : '/assets/images/poster-empty.png',
    backdrop: backdrop_path ? `${process.env.API_BACKDROP_URL}${backdrop_path}` : '',
    popularity,
    vote_count: +vote_count.toFixed(1),
    vote_average: +vote_average.toFixed(1),
    ...namesFromMedia(media),
    ...dateFromMedia(media)
  };
};

export const videoMapper = (video: APIMediaVideo): MediaVideo => {
  const { name, key, site, type, iso_639_1, iso_3166_1 } = video;

  return { name, key, type, site, language: iso_639_1, region: iso_3166_1 };
};
