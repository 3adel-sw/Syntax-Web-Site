import { useState, useEffect, useRef, useCallback } from "react";
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
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const sliderRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    getTeams()
      .then((response) => setTeamsData(response.data.teams))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      if (sliderRef.current) {
        const setWidth = sliderRef.current.scrollWidth / 2;
        posRef.current = isRTL ? -setWidth : 0;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isRTL]);

  const animate = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    if (!pausedRef.current) {
      const setWidth = el.scrollWidth / 2;
      const speed = isRTL ? 0.5 : -0.5;
      posRef.current += speed;
      if (posRef.current < -setWidth) posRef.current += setWidth;
      if (posRef.current > 0) posRef.current -= setWidth;
      el.style.transform = `translateX(${posRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [isRTL]);

  useEffect(() => {
    if (!loading && teamsData) {
      if (sliderRef.current) {
        const setWidth = sliderRef.current.scrollWidth / 2;
        posRef.current = isRTL ? -setWidth : 0;
      }
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, loading, teamsData, isRTL]);

  const pauseAutoPlay = () => { pausedRef.current = true; };
  const resumeAutoPlay = () => { pausedRef.current = false; };

  const handlePrev = () => {
    const el = sliderRef.current;
    if (!el || !teamsData) return;
    const cardWidth = el.children[0]?.offsetWidth || 300;
    const jump = (cardWidth + 16) * visibleCount;
    posRef.current = isRTL ? posRef.current - jump : posRef.current + jump;
  };

  const handleNext = () => {
    const el = sliderRef.current;
    if (!el || !teamsData) return;
    const cardWidth = el.children[0]?.offsetWidth || 300;
    const jump = (cardWidth + 16) * visibleCount;
    posRef.current = isRTL ? posRef.current + jump : posRef.current - jump;
  };

  if (loading) return <div>{t("common.loading")}</div>;
  if (error) return <div>{error}</div>;
  if (!teamsData) return null;

  const displayTeams = [...teamsData, ...teamsData];

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

        {/* Infinite Scrolling Cards */}
        <div className="w-full overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-4 whitespace-nowrap w-max"
          >
            {displayTeams.map((member, index) => (
              <div
                key={`${member.id}-${index}`}
                className="bg-white rounded-2xl md:min-w-[240px] md:max-w-[260px] sm:min-w-[240px] sm:max-w-[270px] min-w-[320px] max-w-[340px] py-4 flex flex-col items-center gap-1 shadow-sm"
              >
                <div className="w-full h-full aspect-square rounded-xl overflow-hidden">
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
                <div className="text-center">
                  <p className="text-xl md:text-lg font-bold text-gray-900">{member.name}</p>
                  <p className="text-sm md:text-xs text-gray-400">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
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