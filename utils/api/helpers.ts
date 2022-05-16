import { IncomingMessage } from 'http';
import { DateTime, Duration } from 'luxon';
import {
  APIMediaData,
  APIMediaDetail,
  MediaCreditGender,
  MediaType,
  MediaTypeKey,
  MediaVideo,
  MediaVideoList
} from '@/types';
import { getPropValue } from '@/utils/helpers';

export const nextAPIBaseURL = (req: IncomingMessage): string => {
  if (!req) return window.location.origin;

  const protocol = req.headers['x-forwarded-proto'] || 'http';

  return `${protocol}://${req.headers.host}`;
};

export const languageRegion = (language: string, region: string): string => `${language}-${region}`;
export const regionFromLocale = (locale: string): string =>
  locale && locale.includes('-') ? locale.split('-')[1] : '';

export const isMediaPerson = (media: APIMediaData): boolean => 'birthday' in media;
export const isMediaMovie = (media: APIMediaData): boolean => 'release_date' in media;
export const isMediaSerie = (media: APIMediaData): boolean => 'first_air_date' in media;

export const posterUrl = (poster_path: string) =>
  poster_path ? `${process.env.API_IMAGES_URL}${poster_path}` : '/assets/images/poster-empty.png';
export const backdroprUrl = (backdrop_path: string) =>
  backdrop_path ? `${process.env.API_BACKDROP_URL}${backdrop_path}` : '';

export const videoTrailerId = (videos: MediaVideoList, locale: string): string => {
  if (videos.isEmpty()) return '';

  const filteredVideos = [...videos.filter(({ type }) => type === 'Trailer'), videos[0]];
  const localeVideo = filteredVideos.find(({ language }) => language === locale);
  return getPropValue<MediaVideo, string>(localeVideo || filteredVideos[0], 'key');
};

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

export const dateFromMedia = (media: APIMediaData, locale: string): { date: string } => {
  let date = '';

  if ('release_date' in media) date = media.release_date;
  if ('first_air_date' in media) date = media.first_air_date;

  return { date: DateTime.fromISO(date).setLocale(locale).toLocaleString(DateTime.DATE_MED) };
};

export const durationFromMedia = (media: APIMediaDetail): { duration: string } => {
  let duration = 0;

  if ('runtime' in media) duration = media.runtime;
  if ('episode_run_time' in media) duration = media.episode_run_time[0];

  const { hours, minutes } = Duration.fromObject({ minutes: duration })
    .shiftTo('hours', 'minutes')
    .toObject();
  const formattedDuration = `${hours && hours > 0 ? `${hours}h ` : ''}${minutes}min`;

  return { duration: formattedDuration };
};

export const genderFromMedia = (gender?: number) => {
  if (gender === 1) return MediaCreditGender.GENDER1;
  if (gender === 2) return MediaCreditGender.GENDER2;
  return MediaCreditGender.GENDER0;
};
