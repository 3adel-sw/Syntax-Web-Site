import { useState, useRef, useEffect } from 'react';
import weight from "../../assets/weight.svg";
import penTool from "../../assets/penTool.svg";
import ranking from "../../assets/ranking.svg";
import lampcharge from "../../assets/lampcharge.svg";
import emojihappy from "../../assets/emojihappy.svg";
import cup from "../../assets/cup.svg";
import { getCoreValues  } from "../../services/about/aboutService";
import { useTranslation } from "react-i18next";

const ICONS_ORDER = [
  { img: cup,        bg: "bg-[#5B49E9]" },
  { img: weight,     bg: "bg-[#33CFFF]" },
  { img: ranking,    bg: "bg-[#40C4AA]" },
  { img: penTool,    bg: "bg-[#FFBE4C]" },
  { img: lampcharge, bg: "bg-[#ED8296]" },
  { img: emojihappy, bg: "bg-[#1A1B25]" },
];

const CoreValues = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [coreData, setCoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mobile slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef(0);
  const translateXRef = useRef(0);
  const containerRef = useRef(null);

  // Fetch
  useEffect(() => {
    getCoreValues ()
      .then((response) => setCoreData(response.data.core_values))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

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
    const boundedIndex = Math.max(0, Math.min((coreData?.length || 1) - 1, slideIndex));
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

  if (loading) return <div>{t("common.loading")}</div>;
  if (error) return <div>{error}</div>;
  if (!coreData) return null;

  return (
    <section className="w-full my-12 md:my-25 text-start">
      {/* Badge */}
      <span className="md:text-base text-sm mb-3 md:mb-5 font-semibold text-[#00895C] tracking-wide">
        {t("about.values")}
      </span>

      {/* Title */}
      <h2 className="text-2xl md:text-5xl font-semibold text-gray-900 md:my-5 my-3">
        {t("about.coreValues")}
      </h2>

      {/* Mobile Slider */}
      <div className="md:hidden my-10">
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
            {coreData.map((value, index) => {
              const icon = ICONS_ORDER[index % ICONS_ORDER.length];
              return (
                <div key={value.id} className="min-w-full flex-shrink-1 px-1">
                  <div className="flex flex-col gap-3 p-5 bg-white rounded-3xl border border-[#DFE1E7]">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${icon.bg}`}>
                      <img loading="lazy" src={icon.img} alt={value.title} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {coreData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-primary w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:my-16 my-10">
        {coreData.map((value, index) => {
          const icon = ICONS_ORDER[index % ICONS_ORDER.length];
          return (
            <div
              key={value.id}
              className="flex flex-col gap-3 md:p-8 p-5 bg-white hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-md rounded-3xl border border-[#DFE1E7]"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${icon.bg}`}>
                <img loading="lazy" src={icon.img} alt={value.title} />
              </div>
              <h3 className="md:text-2xl text-xl font-semibold text-gray-900">{value.title}</h3>
              <p className="md:text-base text-sm text-gray-500 leading-relaxed">{value.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CoreValues;
