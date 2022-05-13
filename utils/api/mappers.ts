import {
  APIMediaData,
  APIMediaExternalIds,
  APIMediaImage,
  APIMediaImages,
  APIMediaVideo,
  APIMediaVideoList,
  APIMediaWatchProvider,
  APIMediaWatchProviderList,
  MediaData,
  MediaExternalIds,
  MediaImage,
  MediaImages,
  MediaType,
  MediaTypeKey,
  MediaVideo,
  MediaVideoList,
  MediaWatchProvider,
  MediaWatchProviders
} from '@/types';
import { backdroprUrl, dateFromMedia, namesFromMedia, posterUrl, typeFromMedia } from '@/utils/api';
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

/** Videos **/

export const videoMapper = (video: APIMediaVideo): MediaVideo => {
  const { name, key, site, type, iso_639_1, iso_3166_1 } = video;

  return { name, key, type, site, language: iso_639_1, region: iso_3166_1 };
};

export const videosMapper = (videos: APIMediaVideoList): MediaVideoList => {
  const { results } = videos || {};

  return results.map(videoMapper);
};

/** Images **/

export const imageMapper = (image: APIMediaImage): MediaImage => {
  const { file_path, iso_639_1, width, height, aspect_ratio, vote_average, vote_count } = image;

  return {
    image: posterUrl(file_path),
    width,
    height,
    language: iso_639_1,
    ratio: 1 / aspect_ratio,
    vote_average,
    vote_count
  };
};

export const imagesMapper = (images: APIMediaImages): MediaImages => {
  return {
    backdrops: getPropValue(images, 'backdrops', []).map(imageMapper),
    posters: getPropValue(images, 'posters', []).map(imageMapper),
    logos: getPropValue(images, 'logos', []).map(imageMapper)
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
