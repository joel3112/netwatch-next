export type APIResponseError = {
  success: false;
  status_code: number;
  status_message: string;
};

export type APIResponseListSuccess<T, U> = U & { results: Array<T> };

/** Media **/

enum APIMediaType {
  MOVIE = 'movie',
  TV = 'tv',
  PERSON = 'person'
}

export type APIMediaDataList<T = APIMediaCommonData> = APIResponseListSuccess<
  T,
  {
    page: number;
    total_pages: number;
    total_results: number;
  }
>;

export type APIMediaCommonData = {
  media_type?: Lowercase<APIMediaType>;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type APIMovieData = APIMediaCommonData & {
  adult: boolean;
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
};

export type APITVData = APIMediaCommonData & {
  first_air_date: string;
  name: string;
  origin_country: Array<string>;
  original_name: string;
};

export type APIMediaData = APIMovieData | APITVData;

/** Detail **/

export type APIMediaStatus =
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled';

export type APIMediaGenre = { id: number; name: string };

export type APIMovieDetail = APIMovieData & {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Array<APIMediaGenre>;
  homepage: string;
  imdb_id: string;
  production_companies: Array<APIMediaNetwork>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  status: APIMediaStatus;
  tagline: string;

  external_ids?: APIMediaExternalIds;
  credits?: APIMediaCredits;
  'watch/providers'?: APIMediaWatchProviderList;
  videos?: APIMediaVideoList;
  images?: APIMediaImages;
};

export type APITVDetail = APITVData & {
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }>;
  episode_run_time: Array<number>;
  genres: Array<APIMediaGenre>;
  homepage: string;
  in_production: boolean;
  languages: Array<string>;
  last_air_date: string;
  last_episode_to_air: APIMediaEpisode;
  next_episode_to_air: APIMediaEpisode;
  networks: Array<APIMediaNetwork>;
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: Array<APIMediaNetwork>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  seasons: Array<APIMediaSeason>;
  spoken_languages: Array<{ iso_639_1: string; name: string; english_name: string }>;
  status: string;
  tagline: string;
  type: string;

  external_ids?: APIMediaExternalIds;
  aggregate_credits?: APIMediaCredits;
  'watch/providers'?: APIMediaWatchProviderList;
  videos?: APIMediaVideoList;
  images?: APIMediaImages;
};

export type APIMediaDetail = APIMovieDetail | APITVDetail;

/** External ids **/

export type APIMediaExternalIds = {
  id?: number;
  imdb_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
  freebase_id?: string;
  freebase_mid?: string;
  tvdb_id?: number;
  tvrage_id?: number;
};

/** Watch providers **/

export type APIMediaWatchProvider = {
  display_priority: number;
  logo_path: string;
  provider_id: string;
  provider_name: string;
};

export type APIMediaWatchProviderLanguage = {
  [key: Uppercase<string>]: {
    link: string;
    flatrate: APIMediaWatchProvider;
    rent: APIMediaWatchProvider;
    buy: APIMediaWatchProvider;
  };
};

export type APIMediaWatchProviderList = {
  id?: number;
  results: APIMediaWatchProvider;
};

/** Credits **/

export type APIMediaCommonCredit = {
  adult: boolean;
  gender?: 0 | 1 | 2;
  id: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
};

export type APIMediaCast = APIMediaCommonCredit & {
  credit_id: string;
  cast_id: number;
  character: string;
  order: number;
};

export type APIMediaCrew = APIMediaCommonCredit & {
  credit_id: string;
  department: string;
  job: string;
};

export type APIMediaCredits = {
  id?: number;
  cast: Array<APIMediaCast>;
  crew: Array<APIMediaCrew>;
};

export type APIMediaAggregateCast = APIMediaCommonCredit & {
  roles: Array<{
    credit_id: string;
    character: string;
    episode_count: number;
  }>;
  total_episode_count: number;
  order: number;
};

export type APIMediaAggregateCrew = APIMediaCommonCredit & {
  jobs: Array<{
    credit_id: string;
    job: string;
    episode_count: number;
  }>;
  department: string;
  total_episode_count: number;
};

export type APIMediaAggregateCredits = {
  id: number;
  cast: Array<APIMediaAggregateCast>;
  crew: Array<APIMediaAggregateCrew>;
};

/** Episodes **/

export type APIMediaEpisode = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};

/** Seasons **/

export type APIMediaSeason = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

/** Networks **/

export type APIMediaNetwork = {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
};

/** Videos **/

export type APIMediaVideo = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
};

export type APIMediaVideoList = APIResponseListSuccess<
  APIMediaVideo,
  {
    id?: number;
  }
>;

/** Images **/

export type APIMediaImage = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1?: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type APIMediaImages = {
  id?: number;
  backdrops: Array<APIMediaImage>;
  posters: Array<APIMediaImage>;
  logos: Array<APIMediaImage>;
};
