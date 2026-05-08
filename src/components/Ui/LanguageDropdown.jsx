import { useEffect, useState } from "react";
import i18n from "@/i18n";

const LanguageToggle = () => {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ar";
    return localStorage.getItem("lang") || i18n.language || "ar";
  });

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    i18n.changeLanguage(lang);
  }, [lang]);

  const handleToggle = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", newLang);
    setLang(newLang);
  };

  return (
    <button
      onClick={handleToggle}
      className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition cursor-pointer"
    >
      {lang === "ar" ? "EN" : "AR"}
    </button>
  );
};

export default LanguageToggle;