import { useState, useRef, useEffect } from "react";
import { getAboutUs } from "../../services/about/aboutService";

const MissionVisions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cards = [
   
    { id: 1, heading: "Mission", body: data?.mission },
    { id: 2, heading: "Vision", body: data?.vision },
    { id: 3, heading: "Features", body: data?.features },
  ];

  // Mobile slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef(0);
  const translateXRef = useRef(0);
  const containerRef = useRef(null);

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
    translateXRef.current = -currentSlide * 100;
    setTranslateX(-currentSlide * 100);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentTouch = e.touches[0].clientX;
    const diff = currentTouch - touchStartRef.current;
    const containerWidth = containerRef.current?.offsetWidth || 300;
    const diffPercent = (diff / containerWidth) * 100;
    const newX = translateXRef.current + diffPercent;
    translateXRef.current = newX;
    setTranslateX(newX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const slideIndex = Math.round(-translateXRef.current / 100);
    const boundedIndex = Math.max(0, Math.min(cards.length - 1, slideIndex));
    setCurrentSlide(boundedIndex);
    translateXRef.current = -boundedIndex * 100;
    setTranslateX(-boundedIndex * 100);
  };

  useEffect(() => {
    if (!isDragging) {
      translateXRef.current = -currentSlide * 100;
      setTranslateX(-currentSlide * 100);
    }
  }, [currentSlide, isDragging]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  return (
    <section className="w-full my-12 md:my-25 text-left">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left: Image */}
        <div className="rounded-4xl md:col-span-1 overflow-hidden h-82 md:h-full min-h-[583px] bg-gray-200">
          <img
            src={data.image}
            alt="Mission"
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
            <span className="text-xl font-semibold text-[#B71C41] tracking-wide pt-4 text-left">
              Our Mission & Visions
            </span>

            {/* Title */}
            <h2 className="md:text-[42px] text-xl font-bold text-gray-900 mb-4 leading-tight text-left">
              Mission, Vision & Features
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
                    transform: `translateX(${translateX}%)`,
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
