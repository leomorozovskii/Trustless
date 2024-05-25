import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './public/locales/en.json';

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

export const SUPPORTED_LANGUAGES: string[] = [Language.EN];
export const resources = {
  en: {
    translation: en,
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
  },
  defaultNS,
  resources,
});

export default i18n;
