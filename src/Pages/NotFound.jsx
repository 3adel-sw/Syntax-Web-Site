import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl text-gray-700">{t("notFound.description")}</p>
      <Link to="/" className="text-blue-500 hover:underline">
        {t("notFound.button")}
      </Link>
    </div>
  );
}
