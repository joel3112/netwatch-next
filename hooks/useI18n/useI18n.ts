import { i18n, useTranslation } from 'next-i18next';
import { EmptyObject } from '@/types';
import { getPropValue } from '@/utils/helpers';

export type UseI18n = {
  t: (key: string, options?: EmptyObject) => string;
  i18n: typeof i18n;
  ready: boolean;
  locale: string;
  language: string;
  region: string;
};

export const useI18n = (locales?: string): UseI18n => {
  const translation = useTranslation(locales || '');
  const language = getPropValue(translation, 'i18n.language', '');

  return {
    t: translation.t,
    i18n: translation.i18n,
    ready: translation.ready,
    locale: language,
    language: language.split('-')[0],
    region: language.split('-')[1]
  };
};
