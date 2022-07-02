import {
  APIMediaAggregateCast,
  APIMediaAggregateCredits,
  APIMediaAggregateCrew,
  APIMediaCast,
  APIMediaCredits,
  APIMediaCrew,
  APIMediaData,
  APIMediaDetail,
  APIMediaExternalIds,
  APIMediaImage,
  APIMediaImages,
  APIMediaSeason,
  APIMediaVideo,
  APIMediaVideoList,
  APIMediaWatchProvider,
  APIMediaWatchProviderList,
  APIMovieDetail,
  APITVDetail,
  MediaCredit,
  MediaCreditRole,
  MediaCredits,
  MediaData,
  MediaDetail,
  MediaExternalIdName,
  MediaExternalIds,
  MediaImage,
  MediaImageRatio,
  MediaImages,
  MediaImageType,
  MediaSeason,
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
  backdropUrl,
  dateFromMedia,
  durationFromMedia,
  genderFromMedia,
  namesFromMedia,
  posterUrl,
  profileUrl,
  typeFromMedia
} from '@/utils/api';
import { getPropValue } from '@/utils/helpers';

export const mediaMapper = (media: APIMediaData, locale: string): MediaData => {
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
    backdrop: backdropUrl(backdrop_path),
    popularity,
    vote_count: +vote_count.toFixed(1),
    vote_average: +vote_average.toFixed(1),
    ...namesFromMedia(media),
    ...dateFromMedia(media, locale)
  };
};

/** Detail **/

export const mediaDetailMapper = (media: APIMediaDetail, locale: string): MediaDetail => {
  return {
    ...mediaMapper(media, locale),
    ...durationFromMedia(media),
    genres: getPropValue(media, 'genres', []),
    homepage: getPropValue(media, 'homepage'),
    original_language: getPropValue(media, 'original_language', 'en')
  };
};

export const movieDetailMapper = (media: APIMovieDetail, locale: string): MovieDetail => {
  return {
    ...mediaDetailMapper(media, locale)
  };
};

export const tvDetailMapper = (media: APITVDetail, locale: string): TVDetail => {
  return {
    ...mediaDetailMapper(media, locale),
    number_seasons: getPropValue(media, 'number_of_seasons', 0),
    number_episodes: getPropValue(media, 'number_of_episodes', 0)
  };
};

/** Seasons **/

export const seasonMapper = (season: APIMediaSeason): MediaSeason => {
  const { name, overview, poster_path, season_number, episode_count, air_date } = season;

  return {
    id: season_number,
    key: `T${season_number} - ${name}`,
    season_number,
    name,
    description: overview,
    date: air_date,
    episodes: episode_count,
    image: posterUrl(poster_path)
  };
};

/** Credits **/

const commonCreditMapper = (
  credit: APIMediaCast | APIMediaCrew | APIMediaAggregateCast | APIMediaAggregateCrew
): MediaCredit => {
  const { id, gender, name, original_name, profile_path = '' } = credit;

  return {
    id,
    name,
    original_name,
    image: profileUrl(profile_path),
    gender: genderFromMedia(gender)
  };
};

export const castMapper = (cast: APIMediaCast): MediaCredit => {
  const { character } = cast;

  return {
    ...commonCreditMapper(cast),
    role: MediaCreditRole.ACTING,
    job: ['cast'],
    characters: character
  };
};

export const crewMapper = (crew: APIMediaCrew): MediaCredit => {
  const { department, job } = crew;

  return {
    ...commonCreditMapper(crew),
    role: MediaCreditRole[department.toUpperCase() as keyof typeof MediaCreditRole],
    job: [job]
  };
};

export const creditsMapper = (credit: APIMediaCredits): MediaCredits => {
  const { cast, crew } = credit;

  return {
    cast: cast.map(castMapper),
    crew: crew.map(crewMapper)
  };
};

export const aggregateCastMapper = (cast: APIMediaAggregateCast): MediaCredit => {
  const { roles } = cast;

  return {
    ...commonCreditMapper(cast),
    role: MediaCreditRole.ACTING,
    job: ['cast'],
    characters: getPropValue(roles, '[0].character', '')
  };
};

export const aggregateCrewMapper = (crew: APIMediaAggregateCrew): MediaCredit => {
  const { department, jobs } = crew;

  return {
    ...commonCreditMapper(crew),
    role: MediaCreditRole[department.toUpperCase() as keyof typeof MediaCreditRole],
    job: jobs.map((job) => job.job)
  };
};

export const aggregateCreditsMapper = (credit: APIMediaAggregateCredits): MediaCredits => {
  const { cast, crew } = credit;

  return {
    cast: cast.map(aggregateCastMapper),
    crew: crew.map(aggregateCrewMapper)
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

export const imageMapper = (image: APIMediaImage, type?: Lowercase<MediaImageType>): MediaImage => {
  const { file_path, iso_639_1, width, height, aspect_ratio, vote_average, vote_count } = image;

  return {
    type:
      type || aspect_ratio < MediaImageRatio.POSTER
        ? MediaImageType.POSTER
        : MediaImageType.BACKDROP,
    image: aspect_ratio < MediaImageRatio.POSTER ? posterUrl(file_path) : backdropUrl(file_path),
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
    {
      id: MediaExternalIdName.IMDB,
      key: imdb_id,
      name: 'IMDb',
      url: url(`https://www.imdb.com/${imdbKey}/`, imdb_id)
    },
    {
      id: MediaExternalIdName.FACEBOOK,
      key: facebook_id,
      name: 'Facebook',
      url: url('https://www.facebook.com/', facebook_id)
    },
    {
      id: MediaExternalIdName.INSTAGRAM,
      key: instagram_id,
      name: 'Instagram',
      url: url('https://www.instagram.com/', instagram_id)
    },
    {
      id: MediaExternalIdName.TWITTER,
      key: twitter_id,
      name: 'Twitter',
      url: url('https://twitter.com/', twitter_id)
    }
  ].filter(({ key }) => key);
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
  const link = getPropValue(results, `${locale}.link`, '');
  const providers = getPropValue(results, `${locale}.flatrate`, []);

  return { watch_link: link, providers: providers.map(watchProviderMapper) };
};
