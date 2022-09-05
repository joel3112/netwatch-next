import { EmptyObject } from '@/types';

export type DataResponse<T> = T;
export type DataListResponse<T, U = EmptyObject> = U & { results: Array<T> | Array<never> };
export type DataResponseError = { status_code: number; status_message: string };

/** Media **/

export enum MediaType {
  ALL = 'all',
  MOVIE = 'movie',
  TV = 'tv',
  PERSON = 'person'
}

export type MediaTypeKey = Lowercase<MediaType>;

export type MediaDataList<T = MediaCommonData> = DataListResponse<
  T,
  {
    page: number;
    total_pages: number;
    total_results: number;
  }
>;

export type MediaCommonData = {
  id: number;
  type: MediaTypeKey;
  route: string;
  image: string;
  name: string;
  original_name?: string;
  date?: string;
  description?: string;
  backdrop?: string;
  popularity?: number;
  vote_count?: number;
  vote_average?: number;
};

export type MovieData = MediaCommonData;

export type TVData = MediaCommonData & {
  number_seasons?: number;
  number_episodes?: number;
};

export type MediaData = MovieData | TVData;

/** Detail **/

export type MediaGenre = { id: number; name: string };

export type MovieDetail = MovieData & {
  duration?: string;
  budget?: number;
  homepage?: string;
  genres?: Array<MediaGenre>;
  original_language?: string;

  external_ids?: MediaExternalIds;
  credits?: MediaCredits;
  'watch/providers'?: MediaWatchProviders;
  videos?: MediaVideoList;
  images?: MediaImages;
  recommendations?: Array<MovieData>;
};

export type TVDetail = TVData & {
  duration?: string;
  homepage?: string;
  genres?: Array<MediaGenre>;
  original_language?: string;
  next_episode_to_air?: MediaEpisode;
  origin_country?: string;
  number_seasons: number;
  number_episodes: number;

  seasons?: Array<MediaSeason>;
  external_ids?: MediaExternalIds;
  credits?: MediaCredits;
  'watch/providers'?: MediaWatchProviders;
  videos?: MediaVideoList;
  images?: MediaImages;
  recommendations?: Array<TVData>;
};

export type MediaDetail = MovieDetail | TVDetail;

/** External ids **/

export enum MediaExternalIdName {
  IMDB = 'imdb',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter'
}

export type MediaExternalId = {
  id: Lowercase<MediaExternalIdName>;
  key?: string;
  name?: string;
  url: string;
};

export type MediaExternalIds = Array<MediaExternalId>;

/** Watch providers **/

export type MediaWatchProvider = {
  id: string;
  name: string;
  image: string;
};

export type MediaWatchProviders = {
  watch_link: string;
  providers: Array<MediaWatchProvider>;
};

/** Credits **/

export enum MediaCreditGender {
  GENDER0 = '-',
  GENDER1 = 'female',
  GENDER2 = 'male'
}

export enum MediaCreditRole {
  DIRECTING = 'directing',
  WRITING = 'writing',
  ACTING = 'acting',
  CREATOR = 'creator'
}

export type MediaCredit = {
  id: string;
  name: string;
  original_name: string;
  gender: Lowercase<MediaCreditGender>;
  role?: Lowercase<MediaCreditRole>;
  characters?: string;
  job?: Array<string>;
  image: string;
};

export type MediaCredits = {
  cast: Array<MediaCredit>;
  crew: Array<MediaCredit>;
};

/** Episodes **/

export type MediaEpisode = {
  id: number;
  key: string;
  name: string;
  description?: string;
  date?: string;
  season_number: number;
  episode_number: number;
  image: string;
  vote_average?: number;
  vote_count?: number;
};

/** Seasons **/

export type MediaSeason = {
  id: number;
  key: string;
  name: string;
  description?: string;
  date?: string;
  season_number: number;
  episodes: number;
  image: string;
};

export type MediaSeasonDetail = Omit<MediaSeason, 'episodes'> & {
  episodes: Array<MediaEpisode>;
};

/** Videos **/

export type MediaVideo = {
  name: string;
  key: string;
  type: string;
  site: string;
  language: string;
  region: string;
  thumbnail: string;
};

export type MediaVideoList = Array<MediaVideo> | Array<never>;

/** Images **/

export enum MediaImageType {
  POSTER = 'poster',
  BACKDROP = 'backdrop',
  LOGO = 'logo'
}

export enum MediaImageRatio {
  POSTER = 1.5,
  BACKDROP = 0.56,
  LOGO = 0.86
}

export type MediaImage = {
  type: Lowercase<keyof typeof MediaImageType>;
  image: string;
  width?: number;
  height?: number;
  ratio: number;
  language?: string;
  vote_average?: number;
  vote_count?: number;
};

export type MediaImages = {
  [key in 'logos' | 'posters' | 'backdrops']: Array<MediaImage>;
};

/** Person **/

export type PersonCredits<T = MovieData | TVData> = {
  cast: Array<T>;
  crew: Array<T>;
};

export type PersonDetail = MediaCommonData & {
  also_known_as?: Array<string>;
  biography: string | null;
  age: number | null;
  birthday: string | null;
  deathday: string | null;
  gender: Lowercase<MediaCreditGender>;
  homepage: string | null;
  image: string;
  popularity?: number;
  place_of_birth: string | null;
  id: number;
  images: Array<MediaImage>;
  tagged_images?: Array<MediaImage>;
  movie_credits?: PersonCredits<MovieData>;
  combined_credits?: Array<MediaData>;
  tv_credits?: PersonCredits<TVData>;
  external_ids?: MediaExternalIds;
  imdb_id?: string;
};
