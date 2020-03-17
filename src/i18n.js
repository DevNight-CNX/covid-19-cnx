import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en
  },
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
