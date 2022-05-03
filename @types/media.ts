export type DataResponse<T> = T;
export type DataListResponse<T> = {
  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: number;
};
export type DataResponseError = {
  status_code: number;
  status_message: string;
};

export enum MediaType {
  ALL = 'all',
  MOVIE = 'movie',
  TV = 'tv',
  PERSON = 'person'
}

export type MediaTypeKey = Lowercase<keyof typeof MediaType>;

export type MediaCommonData = {
  id: number;
  type?: MediaTypeKey;
  name: string;
  original_name?: string;
  date?: string;
  description?: string;
  image?: string;
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
