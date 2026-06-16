import { useState, useRef, useEffect } from "react";
import { getAboutUs } from "../../services/about/aboutService";
import { useTranslation } from "react-i18next";

const MissionVisions = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cards = [
   
    { id: 1, heading: t("about.mission"), body: data?.mission },
    { id: 2, heading: t("about.vision"), body: data?.vision },
    // { id: 3, heading: t("about.features"), body: data?.features },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef(0);
  const translateXRef = useRef(0);
  const containerRef = useRef(null);

  const slideOffset = (slide, w) => (isRTL ? 1 : -1) * slide * w;

  useEffect(() => {
    getAboutUs()
      .then((response) => {
        setData(response.data.about);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

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
    const boundedIndex = Math.max(0, Math.min(cards.length - 1, slideIndex));
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
  if (!data) return null;

  return (
    <section className="w-full my-12 md:my-25 text-start">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left: Image */}
        <div className="rounded-4xl md:col-span-1 overflow-hidden h-82 md:h-full min-h-[583px] bg-gray-200">
          <img
            src={data.image}
            alt={t("about.mission")}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.parentNode.style.background = "#c5cdd8";
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Right: Content */}
        <div className="md:col-span-2">
          <div className="flex flex-col gap-4">
            {/* Badge */}
            <span className="text-xl font-semibold text-[#B71C41] tracking-wide pt-4 text-start">
              {t("about.ourMissionAndVisions")}
            </span>

            {/* Title */}
            <h2 className="md:text-[42px] text-xl font-bold text-gray-900 mb-4 leading-tight text-start">
              {t("about.missionVisionFeatures")}
            </h2>

            {/* Cards - Mobile Slider */}
            <div className="md:hidden">
              <div
                ref={containerRef}
                className="overflow-hidden rounded-2xl w-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex"
                  style={{
                    transform: `translateX(${translateX}px)`,
                    transition: isDragging
                      ? "none"
                      : "transform 0.3s ease-in-out",
                  }}
                >
                  {cards.map((card) => (
                    <div key={card.id} className="min-w-full flex-shrink-1 px-1">
                      <div className="border border-gray-200 rounded-2xl p-3 bg-white/80">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                          {card.heading}
                        </h3>
                        <p className="md:text-lg text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                          {card.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-primary w-6" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Cards - Desktop Stack */}
            <div className="hidden md:flex flex-col gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="border border-gray-200 rounded-2xl md:p-6 p-3 bg-white/80"
                >
                  <h3 className="md:text-xl text-base font-medium text-gray-900 mb-2">
                    {card.heading}
                  </h3>
                  <p className="md:text-lg text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisions;
