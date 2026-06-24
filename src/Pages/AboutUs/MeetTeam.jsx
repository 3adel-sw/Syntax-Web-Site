import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { getTeams } from "../../services/about/aboutService";
import { useTranslation } from "react-i18next";

const getItemsPerView = () => {
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 768) return 2;
  if (w < 1024) return 3;
  return 4;
};

const MeetTeam = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [teamsData, setTeamsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [noTransition, setNoTransition] = useState(false);

  useEffect(() => {
    getTeams()
      .then((response) => setTeamsData(response.data.teams))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setCurrentSlide(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!teamsData || !teamsData.length) return;
    const totalSlides = teamsData.length;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev + 1;
        if (next >= totalSlides) {
          setNoTransition(true);
          setTimeout(() => setNoTransition(false), 50);
          return 0;
        }
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [teamsData]);

  if (loading) return <div>{t("common.loading")}</div>;
  if (error) return <div>{error}</div>;
  if (!teamsData || !teamsData.length) return null;

  const clonedTeams = [...teamsData, ...teamsData];
  const totalSlides = teamsData.length;
  const cardWidth = `calc((100% - ${(itemsPerView - 1) * 16}px) / ${itemsPerView})`;
  const slideOffset = `calc(${(isRTL ? 1 : -1) * currentSlide} * (${100 / itemsPerView}% + ${16 / itemsPerView}px))`;

  return (
    <section className="w-full my-12 md:my-25">
      <div
        className="rounded-3xl p-6 sm:p-10 md:p-16 flex flex-col items-center gap-8"
        style={{
          background:
            "linear-gradient(182deg, #EFE0F7 1.4%, rgba(241, 242, 242, 0.44) 54.02%, #D4EBFC 98.85%)",
        }}
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-900 mb-4">
            {t("about.meetTeamBehindSyntax")}
          </h2>
          <p className="text-base text-gray-500">{t("about.teamSubtitle")}</p>
        </div>

        {/* Carousel */}
        <div className="w-full overflow-hidden rounded-xl">
          <div
            className="flex gap-4"
            style={{
              transform: `translateX(${slideOffset})`,
              transition: noTransition ? "none" : "transform 0.5s ease-in-out",
            }}
          >
            {clonedTeams.map((member, index) => (
              <div
                key={`${member.id}-${index}`}
                className="bg-white rounded-2xl py-4 flex-shrink-0 flex flex-col items-center gap-1 shadow-sm"
                style={{ width: cardWidth }}
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.style.background = "#c8d8e8";
                    }}
                  />
                </div>
                <div className="text-center px-2">
                  <p className="text-xl md:text-lg font-bold text-gray-900">{member.name}</p>
                  <p className="text-sm md:text-xs text-gray-400">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-3 mt-2">
          {isRTL ? (
            <>
              <button
                onClick={() => setCurrentSlide((p) => (p + 1) % totalSlides)}
                className="w-9 h-9 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center hover:bg-white hover:shadow transition-all"
                aria-label="التالي"
              >
                <FaArrowRight size={18} />
              </button>
              <button
                onClick={() => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides)}
                className="w-9 h-9 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center hover:bg-white hover:shadow transition-all"
                aria-label="السابق"
              >
                <FaArrowLeft size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides)}
                className="w-9 h-9 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center hover:bg-white hover:shadow transition-all"
                aria-label="Previous"
              >
                <FaArrowLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentSlide((p) => (p + 1) % totalSlides)}
                className="w-9 h-9 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center hover:bg-white hover:shadow transition-all"
                aria-label="Next"
              >
                <FaArrowRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MeetTeam;