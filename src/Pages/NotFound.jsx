import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaLeftLong } from "react-icons/fa6";

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="flex flex-col items-center space-y-7 justify-center h-screen">
      <h1 className="text-6xl font-bold text-green-600">{t("notFound.title")}</h1>
      <p className="text-4xl text-gray-700">{t("notFound.description")}</p>
      <Link to="/" className="text-primary font-bold text-start text-4xl flex items-center gap-4 hover:underline">
        {isArabic ? (
          <>
            {t("notFound.button")}
            <FaLeftLong />
          </>
        ) : (
          <>
            <FaLeftLong />
            {t("notFound.button")}
          </>
        )}
      </Link>
    </div>
  );
}