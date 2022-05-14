import {
  APIMediaData,
  APIMediaDetail,
  APIMediaExternalIds,
  APIMediaImage,
  APIMediaImages,
  APIMediaVideo,
  APIMediaVideoList,
  APIMediaWatchProvider,
  APIMediaWatchProviderList,
  APIMovieDetail,
  APITVDetail,
  MediaData,
  MediaDetail,
  MediaExternalIds,
  MediaImage,
  MediaImageRatio,
  MediaImages,
  MediaImageType,
  MediaType,
  MediaTypeKey,
  MediaVideo,
  MediaVideoList,
  MediaWatchProvider,
  MediaWatchProviders,
  MovieDetail,
  TVDetail
} from '@/types';
import {
  backdroprUrl,
  dateFromMedia,
  durationFromMedia,
  namesFromMedia,
  posterUrl,
  typeFromMedia
} from '@/utils/api';
import { getPropValue } from '@/utils/helpers';

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
    image: posterUrl(poster_path),
    backdrop: backdroprUrl(backdrop_path),
    popularity,
    vote_count: +vote_count.toFixed(1),
    vote_average: +vote_average.toFixed(1),
    ...namesFromMedia(media),
    ...dateFromMedia(media)
  };
};

/** Detail **/

export const mediaDetailMapper = (media: APIMediaDetail): MediaDetail => {
  return {
    ...mediaMapper(media),
    ...durationFromMedia(media),
    genres: getPropValue(media, 'genres', [])
  };
};

export const movieDetailMapper = (media: APIMovieDetail): MovieDetail => {
  return {
    ...mediaDetailMapper(media)
  };
};

export const tvDetailMapper = (media: APITVDetail): TVDetail => {
  return {
    ...mediaDetailMapper(media),
    number_seasons: getPropValue(media, 'number_seasons', 0),
    number_episodes: getPropValue(media, 'number_episodes', 0)
  };
};

/** Videos **/

export const videoMapper = (video: APIMediaVideo): MediaVideo => {
  const { name, key, site, type, iso_639_1, iso_3166_1 } = video;

  return {
    name,
    key,
    type,
    site,
    language: iso_639_1,
    region: iso_3166_1,
    thumbnail: `https://img.youtube.com/vi/${key}/0.jpg`
  };
};

export const videosMapper = (videos: APIMediaVideoList): MediaVideoList => {
  const { results } = videos || {};

  return results.map(videoMapper);
};

/** Images **/

export const imageMapper = (
  image: APIMediaImage,
  type?: MediaImageType.POSTER | MediaImageType.BACKDROP | MediaImageType.LOGO
): MediaImage => {
  const { file_path, iso_639_1, width, height, aspect_ratio, vote_average, vote_count } = image;

  return {
    type:
      type || aspect_ratio < MediaImageRatio.POSTER
        ? MediaImageType.POSTER
        : MediaImageType.BACKDROP,
    image: aspect_ratio < MediaImageRatio.POSTER ? posterUrl(file_path) : backdroprUrl(file_path),
    width,
    height,
    language: iso_639_1,
    ratio: parseFloat((1 / aspect_ratio).toFixed(2)),
    vote_average,
    vote_count
  };
};

export const imagesMapper = (images: APIMediaImages): MediaImages => {
  return {
    backdrops: getPropValue(images, 'backdrops', []).map((image) => imageMapper(image)),
    posters: getPropValue(images, 'posters', []).map((image) => imageMapper(image)),
    logos: getPropValue(images, 'logos', []).map((image) => imageMapper(image))
  };
};

/** External ids **/

export const externalIdsMapper = (
  externalIds: APIMediaExternalIds,
  type: MediaTypeKey
): MediaExternalIds => {
  const url = (path: string, key?: string) => (key ? `${path}${key}` : '');
  const { imdb_id, facebook_id, instagram_id, twitter_id } = externalIds;
  const imdbKey = type === MediaType.PERSON ? 'name' : 'title';

  return [
    { id: 'imdb', url: url(`https://www.imdb.com/${imdbKey}/`, imdb_id) },
    { id: 'facebook', url: url('https://www.facebook.com/', facebook_id) },
    { id: 'instagram', url: url('https://www.instagram.com/', instagram_id) },
    { id: 'twitter', url: url('https://twitter.com/', twitter_id) }
  ];
};

/** Watch providers **/

export const watchProviderMapper = (watchProvider: APIMediaWatchProvider): MediaWatchProvider => {
  const { logo_path, provider_id, provider_name } = watchProvider;

  return { id: provider_id, name: provider_name, image: posterUrl(logo_path) };
};

export const watchProvidersMapper = (
  watchProviders: APIMediaWatchProviderList,
  locale: string
): MediaWatchProviders => {
  const { results } = watchProviders || {};
  const link = getPropValue(results, `[${locale}].link`, '');
  const providers = getPropValue(results, `[${locale}].flatrate`, []);

  return { watch_link: link, providers: providers.map(watchProviderMapper) };
};
