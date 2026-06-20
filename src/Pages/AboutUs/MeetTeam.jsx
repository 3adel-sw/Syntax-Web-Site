import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { getTeams } from "../../services/about/aboutService";
import { useTranslation } from "react-i18next";

const getVisibleCount = () => {
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
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const autoPlayRef = useRef(null);

  useEffect(() => {
    getTeams()
      .then((response) => setTeamsData(response.data.teams))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      setStartIndex(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goTo = (newIndex, dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setStartIndex(newIndex);
      setAnimating(false);
    }, 350);
  };

  useEffect(() => {
    if (!teamsData) return;
    autoPlayRef.current = setInterval(() => {
      setStartIndex((prev) => {
        const canNext = prev + visibleCount < teamsData.length;
        const next = canNext ? prev + 1 : 0;
        setDirection("next");
        setAnimating(true);
        setTimeout(() => setAnimating(false), 350);
        return next;
      });
    }, 2500);
    return () => clearInterval(autoPlayRef.current);
  }, [teamsData, visibleCount]);

  const pauseAutoPlay = () => clearInterval(autoPlayRef.current);
  const resumeAutoPlay = () => {
    if (!teamsData) return;
    autoPlayRef.current = setInterval(() => {
      setStartIndex((prev) => {
        const canNext = prev + visibleCount < teamsData.length;
        const next = canNext ? prev + 1 : 0;
        setDirection("next");
        setAnimating(true);
        setTimeout(() => setAnimating(false), 350);
        return next;
      });
    }, 2500);
  };

  const handlePrev = () => {
    if (!teamsData) return;
    const newIndex = startIndex > 0 ? startIndex - 1 : teamsData.length - visibleCount;
    goTo(newIndex, "prev");
  };

  const handleNext = () => {
    if (!teamsData) return;
    const canNext = startIndex + visibleCount < teamsData.length;
    const newIndex = canNext ? startIndex + 1 : 0;
    goTo(newIndex, "next");
  };

  if (loading) return <div>{t("common.loading")}</div>;
  if (error) return <div>{error}</div>;
  if (!teamsData) return null;

  const visibleMembers = teamsData.slice(startIndex, startIndex + visibleCount);

  const slideStyle = {
    transform: animating
      ? `translateX(${isRTL ? (direction === "next" ? "40px" : "-40px") : (direction === "next" ? "-40px" : "40px")})`
      : "translateX(0)",
    opacity: animating ? 0 : 1,
    transition: "transform 350ms ease, opacity 350ms ease",
  };

  return (
    <section className="w-full my-12 md:my-25">
      <div
        className="rounded-3xl p-6 sm:p-10 md:p-16 flex flex-col items-center gap-8"
        style={{
          background:
            "linear-gradient(182deg, #EFE0F7 1.4%, rgba(241, 242, 242, 0.44) 54.02%, #D4EBFC 98.85%)",
        }}
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-900 mb-4">
            {t("about.meetTeamBehindSyntax")}
          </h2>
          <p className="text-base text-gray-500">{t("about.teamSubtitle")}</p>
        </div>

        {/* Cards Row */}
        <div className="flex gap-4 overflow-hidden w-full justify-center">
          {visibleMembers.map((member) => (
            <div
              key={member.id}
              style={slideStyle}
              className="bg-white rounded-2xl md:min-w-[240px] md:max-w-[260px] sm:min-w-[240px] sm:max-w-[270px] min-w-[320px] max-w-[340px] py-4 flex flex-col items-center gap-1 shadow-sm"
            >
              <div className="w-full h-full aspect-square rounded-xl overflow-hidden">
                <img
                  loading="lazy"
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.style.background = "#c8d8e8";
                  }}
                />
              </div>
              <div className="text-center">
                <p className="text-xl md:text-lg font-bold text-gray-900">{member.name}</p>
                <p className="text-sm md:text-xs text-gray-400">{member.position}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-3">
          {isRTL ? (
            <>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center hover:bg-white hover:shadow transition-all"
              >
                <FaArrowRight size={18} />
              </button>
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center hover:bg-white hover:shadow transition-all"
              >
                <FaArrowLeft size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center hover:bg-white hover:shadow transition-all"
              >
                <FaArrowLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center hover:bg-white hover:shadow transition-all"
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