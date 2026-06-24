import { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { getHeroSection, getAboutUs } from "../../services/about/aboutService";
import { useTranslation } from "react-i18next";

const HeroAbout = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [heroData, setHeroData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getHeroSection(), getAboutUs()])
      .then(([heroRes, aboutRes]) => {
        setHeroData(heroRes.data.about_hero);
        setAboutData(aboutRes.data.about);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full md:my-25 my-2">
      {/* ===== Hero Top Section ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start py-10">
        {/* Left: Badge + Title */}
        <div className="text-start md:text-start">
          <span className="inline-block bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl mb-4">
            {t("about.title")}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            {t("about.welcomeTo")} <br /> {t("menu.projects.community.name")}
          </h1>
        </div>

        {/* Right: Description + Buttons */}
        <div className="flex flex-col gap-6 justify-center">
          <p className="text-lg text-start text-gray-500 leading-relaxed">
            {loading ? t("common.loading") : error || heroData?.description}
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate('/contact')}
              className="px-5 py-3.5 rounded-xl text-gray-900 text-sm bg-[#F2F4F7] font-medium hover:bg-gray-900 hover:text-white transition-colors">
              {t("menu.pagesList.contactUs")}
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="px-5 py-3.5 rounded-xl hover:bg-gray-900 bg-transparent hover:text-white text-gray-900 text-sm font-medium transition-colors">
              {t("home.startLearning")}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Image —   ===== */}
      <div className="rounded-3xl overflow-hidden md:h-72  md:h-[583px] mb-12">
        <img
          src={heroData?.image || ""}
          alt={t("about.communityClassroomAlt")}
          className="md:w-full md:h-full md:object-cover object-contain "
        />
      </div>

      {/* ===== What We Do Section ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-28 gap-10 md:pb-10">
        <div className="md:col-span-1">
          <h2 className="text-5xl md:text-center text-start md:pb-6 pb-0 font-extrabold text-gray-900">
            {t("about.whatWeDo")}
          </h2>
        </div>
        <div className="md:col-span-2 flex flex-col md:gap-6 gap-4">
          <p className="md:text-lg text-sm font-medium text-start text-[#797979] leading-relaxed">
            {aboutData?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroAbout;