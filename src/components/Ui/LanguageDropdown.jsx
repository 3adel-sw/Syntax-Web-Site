import { useState, useEffect } from "react";
import i18n from "@/i18n";

const LanguageToggle = () => {
  // Read initial language from localStorage or i18n, defaulting to "ar"
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ar";
    return localStorage.getItem("lang") || i18n.language || "ar";
  });

  // Keep the toggle in sync if language changes elsewhere
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      // Normalize: "en-US" -> "en"
      const normalized = (lng || "").split("-")[0] || "ar";
      setLang(normalized);
      localStorage.setItem("lang", normalized);
      document.documentElement.dir = normalized === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = normalized;
    };
    i18n.on("languageChanged", handleLanguageChanged);
    // Apply initial dir/lang on mount
    handleLanguageChanged(i18n.language);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  const handleToggle = () => {
    const currentLang = (i18n.language || "ar").split("-")[0];
    const newLang = currentLang === "ar" ? "en" : "ar";
    // No page reload — react-i18next updates all consumers automatically,
    // and the listener above keeps state/localStorage/DOM attributes in sync.
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={handleToggle}
      className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition cursor-pointer"
      aria-label="Toggle language"
    >
      {lang === "ar" ? "EN" : "AR"}
    </button>
  );
};

export default LanguageToggle;
