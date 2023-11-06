import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './en.json';

const i18n = new I18n({
  en,
});

i18n.locale = getLocales()[0].languageCode;

export default i18n;