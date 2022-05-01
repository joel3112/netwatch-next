export type MediaType = 'movie' | 'tv' | 'person';

export type MediaCommonData = {
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

export type MovieData = MediaCommonData & {
  adult: boolean;
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
};

export type TVData = MediaCommonData & {
  first_air_date: string;
  name: string;
  origin_country: Array<string>;
  original_name: string;
};

export type MediaData = MovieData | TVData;

export type MediaStatus =
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled';

export type MediaGenre = { id: number; name: string };

export type MediaEpisode = {
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

export type MediaSeason = {
  air_date: string;
  episode_count: number;
  id: number;
  overview: string;
  poster_path: string;
  season_number: number;
};

export type MediaNetwork = {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
};

export type MovieDetail = MovieData & {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Array<MediaGenre>;
  homepage: string;
  imdb_id: string;
  production_companies: Array<MediaNetwork>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  status: MediaStatus;
  tagline: string;
};

export type TVDetail = TVData & {
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }>;
  episode_runtime: Array<number>;
  genres: Array<MediaGenre>;
  homepage: string;
  in_production: boolean;
  languages: Array<string>;
  last_air_date: string;
  last_episode_to_air: MediaEpisode;
  next_episode_to_air: MediaEpisode;
  networks: Array<MediaNetwork>;
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: Array<MediaNetwork>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  seasons: Array<MediaSeason>;
  spoken_languages: Array<{ iso_639_1: string; name: string; english_name: string }>;
  status: string;
  tagline: string;
  type: string;
};
