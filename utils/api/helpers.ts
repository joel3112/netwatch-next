import { IncomingMessage } from 'http';
import {
  APIMediaData,
  APIMediaDetail,
  APIPersonDetail,
  MediaCreditGender,
  MediaType,
  MediaTypeKey,
  MediaVideo,
  MediaVideoList
} from '@/types';
import { durationFromMinutes, formatDate, getPropValue } from '@/utils/helpers';

export const nextAPIBaseURL = (req: IncomingMessage): string => {
  if (!req) return window.location.origin;

  const protocol = req.headers['x-forwarded-proto'] || 'http';

  return `${protocol}://${req.headers.host}`;
};

export const languageRegion = (language: string, region: string): string => `${language}-${region}`;
export const languageFromLocale = (locale: string): string =>
  locale && locale.includes('-') ? locale.split('-')[0] : '';
export const regionFromLocale = (locale: string): string =>
  locale && locale.includes('-') ? locale.split('-')[1] : '';

export const isMediaPerson = (media: APIMediaData): boolean => 'birthday' in media;
export const isMediaMovie = (media: APIMediaData): boolean => 'release_date' in media;
export const isMediaSerie = (media: APIMediaData): boolean => 'first_air_date' in media;

export const posterUrl = (poster_path: string | null) =>
  poster_path ? `${process.env.API_IMAGES_URL}${poster_path}` : '/assets/images/poster-empty.png';
export const backdropUrl = (backdrop_path: string | null) =>
  backdrop_path ? `${process.env.API_BACKDROP_URL}${backdrop_path}` : '';
export const profileUrl = (profile_path: string | null) =>
  profile_path
    ? `${process.env.API_IMAGES_URL}${profile_path}`
    : '/assets/images/profile-empty.png';

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

  return { date: formatDate(date, locale) };
};

export const durationFromMedia = (media: APIMediaDetail): { duration: string } => {
  let duration = 0;

  if ('runtime' in media) duration = media.runtime;
  if ('episode_run_time' in media) duration = media.episode_run_time[0];

  const { hours, minutes } = durationFromMinutes(duration);
  const formattedDuration = `${hours && hours > 0 ? `${hours}h ` : ''}${
    minutes && minutes > 0 ? `${minutes}min` : ''
  }`;

  return { duration: formattedDuration.trim() };
};

export const genderFromMedia = (gender?: number) => {
  if (gender === 1) return MediaCreditGender.GENDER1;
  if (gender === 2) return MediaCreditGender.GENDER2;
  return MediaCreditGender.GENDER0;
};

export const routeFromMedia = (media: APIMediaData | APIPersonDetail, type: string): string => {
  const { id } = media;
  const { original_name } = namesFromMedia(media as APIMediaData);
  const nameFormatted = (original_name || (media as APIPersonDetail).name || '')
    .replace(/-/g, ' ')
    ?.removeSpecialCharacters()
    ?.trim()
    ?.replace(/ /g, '-');
  return (nameFormatted ? `/${type}/${id}-${nameFormatted}` : `/${type}/${id}`).toLowerCase();
};
