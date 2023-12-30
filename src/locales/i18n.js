import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en.json'; // English translations
import translationFR from './fr.json'; // French translations (example)
import translationES from './es.json';
import translationCN from './cn.json';
import translationJP from './jp.json';

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  es: {
    translation: translationES
  },
  cn: {
    translation: translationCN
  },
  jp: {
    translation: translationJP
  }
  // Add other languages as needed
};

const defaultConfig = {
    detectBrowserLanguage: true,
    resources,
    lng: 'en', // Default language
    interpolation: {
      escapeValue: false, // React already protects from injection
    },
    react: {
        useSuspense: true,
      },
  }

i18n
  .use(initReactI18next)
  .init(defaultConfig);

export default i18n;