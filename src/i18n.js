import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import plTranslation from "./translations/pl/pl.json";
import enTranslation from "./translations/en/en.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  pl: {
    translation: plTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
