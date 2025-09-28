import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "@game/lang";

const detectionOptions = {
  order: ["localStorage", "navigator", "querystring", "htmlTag"],
  caches: ["localStorage"],
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: Object.keys(resources),
    detection: detectionOptions,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
