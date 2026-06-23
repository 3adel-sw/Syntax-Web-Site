import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';

import { getHeroSection ,getAboutUs } from "../../services/about/aboutService";
import { useTranslation } from "react-i18next";
const HeroAbout = () => {
  const navigate = useNavigate();
const { t, i18n } = useTranslation();
const isRTL = i18n.language === 'ar';
const [heroData, setHeroData] = useState(null);
const [aboutData, setAboutData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
 const images = useMemo(() => [
  { src: heroData?.image , alt: t("common.imageNotAvailable") },
  // { src: heroData?.image || AymanAboutR, alt: "Syntax Instructor" },
], [heroData, t]);
  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef(0);
  const translateXRef = useRef(0);
  const containerRef = useRef(null);

  const slideOffset = (slide, w) => (isRTL ? 1 : -1) * slide * w;

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
    setIsDragging(true);
    const w = containerRef.current?.offsetWidth || 300;
    translateXRef.current = slideOffset(currentSlide, w);
    setTranslateX(slideOffset(currentSlide, w));
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentTouch = e.touches[0].clientX;
    const diff = currentTouch - touchStartRef.current;
    translateXRef.current += diff;
    setTranslateX(translateXRef.current);
    touchStartRef.current = currentTouch;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const w = containerRef.current?.offsetWidth || 300;
    const slideIndex = Math.round((isRTL ? 1 : -1) * translateXRef.current / w);
    const boundedIndex = Math.max(0, Math.min(images.length - 1, slideIndex));
    setCurrentSlide(boundedIndex);
    translateXRef.current = slideOffset(boundedIndex, w);
    setTranslateX(slideOffset(boundedIndex, w));
  };

  useEffect(() => {
    if (!isDragging) {
      const w = containerRef.current?.offsetWidth || 300;
      translateXRef.current = slideOffset(currentSlide, w);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTranslateX(slideOffset(currentSlide, w));
    }
  }, [currentSlide, isDragging, isRTL]);

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
            className="px-5 py-3.5 rounded-xl  text-gray-900 text-sm bg-[#F2F4F7] font-medium hover:bg-gray-900 hover:text-white  transition-colors">
              {t("menu.pagesList.contactUs")}
            </button>
            <button
             onClick={() => navigate('/courses')}
            className="px-5 py-3.5 rounded-xl hover:bg-gray-900 bg-transparent hover:text-white text-gray-900 text-sm font-medium  transition-colors">
              {t("home.startLearning")}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden mb-12">
        <div
          ref={containerRef}
          className="overflow-hidden rounded-3xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-in-out'
            }}
          >
            {images.map((img, index) => (
              <div key={index} className="min-w-full flex-shrink-1">
                <div className="h-82 rounded-3xl overflow-hidden">
                  <img
                     src={heroData?.image || ""}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-primary w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div> */}
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-4 gap-4 mb-12">
        {/* Large classroom image */}
        {/* <div className="col-span-3 rounded-3xl overflow-hidden h-82 md:h-[583px] "> */}
        <div className="col-span-4 rounded-3xl overflow-hidden h-82 md:h-[583px] ">
          <img
            src={heroData?.image || ""}
            alt={t("about.communityClassroomAlt")}
            className="w-full h-full object-contain"
          />
        </div>
        {/* Instructor image */}
        {/* <div className="col-span-1 rounded-3xl overflow-hidden h-82 md:h-[583px] ">
          <img

            src={heroData?.image || AymanAboutR}
            alt="Syntax Instructor"
            className="w-full h-full object-cover"
          />
        </div> */}
      </div>

      {/* ===== What We Do Section ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-28 gap-10  pb-10">
        {/* Left: Title */}
        <div className="md:col-span-1">
          <h2 className="text-5xl md:text-center text-start md:pb-6 pb-0 font-extrabold text-gray-900">{t("about.whatWeDo")}</h2>
        </div>

        {/* Right: Paragraphs */}
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
