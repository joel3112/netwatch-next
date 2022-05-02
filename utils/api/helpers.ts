import type { NextApiRequest } from 'next';
import { APIMediaData, APIMediaDetail } from '@/types';
import { MediaType, MediaTypeKey } from '@/types/media';

export const nextAPIBaseURL = (req: NextApiRequest): string => {
  if (!req) return window.location.origin;

  const protocol = req.headers['x-forwarded-proto'] || 'http';

  return `${protocol}://${req.headers.host}`;
};

export const isMediaPerson = (media: APIMediaData): boolean => 'birthday' in media;
export const isMediaMovie = (media: APIMediaData): boolean => 'release_date' in media;
export const isMediaSerie = (media: APIMediaData): boolean => 'first_air_date' in media;

export const typeFromMedia = (media: APIMediaData): MediaTypeKey => {
  if (isMediaPerson(media)) return MediaType.PERSON;
  if (isMediaMovie(media)) return MediaType.MOVIE;
  if (isMediaSerie(media)) return MediaType.TV;

  return MediaType.ALL;
};

export const namesFromMedia = (media: APIMediaData): { name: string; original_name: string } => {
  if ('title' in media) return { name: media.title, original_name: media.original_title };

  return { name: media.name, original_name: media.original_name };
};

export const dateFromMedia = (media: APIMediaData): { date: string } => {
  let date = '';

  if ('release_date' in media) date = media.release_date;
  if ('first_air_date' in media) date = media.first_air_date;

  return { date };
};

export const durationFromMedia = (media: APIMediaDetail): { duration: string } => {
  let duration = 0;

  if ('runtime' in media) duration = media.runtime;
  if ('episode_run_time' in media) duration = media.episode_run_time[0];

  return { duration: String(duration) };
};
