import { EmptyObject } from '@/types';

export type DataResponse<T> = T;
export type DataListResponse<T, U = EmptyObject> = U & { results: Array<T> };
export type DataResponseError = { status_code: number; status_message: string };

/** Media **/

export enum MediaType {
  ALL = 'all',
  MOVIE = 'movie',
  TV = 'tv',
  PERSON = 'person'
}

export type MediaTypeKey = Lowercase<keyof typeof MediaType>;

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

/** Video **/

export type MediaVideoList = DataListResponse<
  MediaVideo,
  {
    id: number;
  }
>;

export type MediaVideo = {
  name: string;
  key: string;
  type: string;
  site: string;
  language: string;
  region: string;
};
