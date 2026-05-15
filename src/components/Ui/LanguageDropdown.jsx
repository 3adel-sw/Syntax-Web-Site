import { useEffect, useState } from "react";
import i18n from "@/i18n";

const LanguageToggle = () => {

  



  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ar";
    return localStorage.getItem("lang") || i18n.language || "ar";
  });


  



useEffect(() => {
  const savedLang = localStorage.getItem("lang") || "ar";
  if (savedLang !== lang) {
    i18n.changeLanguage(savedLang).then(() => {
      window.location.reload(); 
    });
  }
}, []);

  const handleToggle = () => {
  const newLang = lang === "ar" ? "en" : "ar";
  localStorage.setItem("lang", newLang);
  i18n.changeLanguage(newLang).then(() => {
    window.location.reload(); 
  });
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