import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './translation/en.json';
import hi from './translation/hi.json';
import ur from './translation/ur.json';
import ar from './translation/ar.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en, 
    hi: hi,
    ur: ur,
    ar: ar,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;