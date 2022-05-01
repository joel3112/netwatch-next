import type { NextApiRequest } from 'next';

export type GetServerSideConfig = {
  locale: string;
  req: NextApiRequest;
};

export type APIResponseError = {
  success: false;
  status_code: number;
  status_message: string;
};

export type APIResponseListSuccess<T> = {
  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: number;
};

export type APIResponseDetailSuccess<T> = T;
