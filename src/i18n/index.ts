import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

export const getDirection = (lng?: string) => (lng ?? i18n.language) === "en" ? "ltr" : "rtl";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ["cookie", "navigator"],
      caches: ["cookie"],
      cookieMinutes: 10080,
    },
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });



export default i18n;
