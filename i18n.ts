import { format as formatDate } from 'date-fns';
import { enUS } from 'date-fns/locale';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@public/locales/en.json';

const defaultNS = 'translation';

/**
 * Supported language options.
 * @enum {string}
 */
enum Language {
  /** English. */
  EN = 'en',
}

enum CountryCode {
  EN = 'en',
}

const DATE_FORMAT = 'datetime';

const SUPPORTED_LANGUAGES: string[] = [Language.EN];
const resources = {
  en: {
    translation: {
      ...en,
      dateFormats: {
        custom: `{{date, ${DATE_FORMAT}}}`,
      },
    },
  },
} as const;

const DEFAULT_LANGUAGE: keyof typeof resources = Language.EN;

i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: Object.keys(resources),
  debug: false,
  interpolation: {
    escapeValue: false,
    format: (value, format) => {
      if (value instanceof Date && format === DATE_FORMAT) {
        return formatDate(value, 'dd MMM yyyy HH:mm', { locale: enUS });
      }
      return value;
    },
  },
  defaultNS,
  resources,
});

export { DEFAULT_LANGUAGE, resources, SUPPORTED_LANGUAGES, CountryCode, Language, defaultNS };
// eslint-disable-next-line import/no-default-export
export default i18n;
