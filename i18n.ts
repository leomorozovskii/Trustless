import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './public/locales/en.json';
import { format as formatDate } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const defaultNS = 'translation';

/**
 * Supported language options.
 * @enum {string}
 */
export enum Language {
  /** English. */
  EN = 'en',
}

export enum CountryCode {
  EN = 'en',
}

const DATE_FORMAT = 'datetime';

export const SUPPORTED_LANGUAGES: string[] = [Language.EN];
export const resources = {
  en: {
    translation: {
      ...en,
      dateFormats: {
        custom: `{{date, ${DATE_FORMAT}}}`,
      },
    },
  },
} as const;

export const DEFAULT_LANGUAGE: keyof typeof resources = Language.EN;

i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: Object.keys(resources),
  debug: false,
  interpolation: {
    escapeValue: false,
    format: (value, format, lng) => {
      console.log(format, lng);
      if (value instanceof Date && format === DATE_FORMAT) {
        return formatDate(value, 'dd MMM yyyy HH:mm', { locale: enUS });
      }
      return value;
    },
  },
  defaultNS,
  resources,
});

export default i18n;
