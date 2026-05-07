
import { useState, useRef, useEffect } from 'react';
import weight from "../../assets/weight.svg";
import penTool from "../../assets/penTool.svg";
import ranking from "../../assets/ranking.svg";
import lampcharge from "../../assets/lampcharge.svg";
import emojihappy from "../../assets/emojihappy.svg";
import cup from "../../assets/cup.svg";
//   img —    API
const IMG_Map = {
  grow: { img: cup, bg: "bg-[#5B49E9]", color: "text-indigo-600" },
  scrappy: { img: weight, bg: "bg-[#33CFFF]", color: "text-cyan-600" },
  hardwork: { img: ranking, bg: "bg-[#40C4AA]", color: "text-teal-600" },
  details: { img: penTool, bg: "bg-[#FFBE4C]", color: "text-amber-600" },
  hard: { img: lampcharge, bg: "bg-[#ED8296]", color: "text-rose-600" },
  fun: { img: emojihappy, bg: "bg-[#1A1B25]", color: "text-white" },
};

// API
const coreValuesData = [
  {
    id: 1,
    iconKey: "grow",
    title: "Grow 1% Everyday",
    description:
      "By focusing on daily growth, we foster a culture of learning, adaptability, and innovation ensuring that we are always moving forward improving...",
  },
  {
    id: 2,
    iconKey: "scrappy",
    title: "Be Scrappy",
    description:
      "We believe in being agile, adaptable, and always ready to tackle challenges head-on.",
  },
  {
    id: 3,
    iconKey: "hardwork",
    title: "Embrace Hard Work",
    description:
      "We believe that dedication and perseverance are key to overcoming obstacles and reaching new heights.",
  },
  {
    id: 4,
    iconKey: "details",
    title: "Be in The Details",
    description:
      "Focusing on the finer points, we ensure high-quality results and exceed expectations.",
  },
  {
    id: 5,
    iconKey: "hard",
    title: "Do Hard Things",
    description:
      "This value drives us to achieve the extraordinary and continuously grow as individuals and as a team.",
  },
  {
    id: 6,
    iconKey: "fun",
    title: "Be Fun to Work",
    description:
      "We believe that a happy team is a productive team, and we strive to make our work environment enjoyable for everyone.",
  },
];
// CoreValues.jsx
// useEffect(() => {
//   fetch("https://your-api.com/api/core-values")
//     .then((r) => r.json())
//     .then(setCoreValuesData);
// }, []);

const CoreValues = () => {
  // Mobile slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef(0);
  const translateXRef = useRef(0);
  const containerRef = useRef(null);

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
    const boundedIndex = Math.max(0, Math.min(coreValuesData.length - 1, slideIndex));
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
  
  const renderCard = (value) => {
    const iconConfig = IMG_Map[value.iconKey] ?? {
      img: weight,
      bg: "bg-gray-100",
      color: "text-gray-600",
    };

    return (
      <>
        {/* Icon Box */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconConfig.bg}`}>
          <img src={iconConfig.img} alt={value.title} />
        </div>
        {/* Text */}
        <h3 className="md:text-2xl text-xl font-semibold text-gray-900">{value.title}</h3>
        <p className="md:text-base text-sm text-gray-500 leading-relaxed">
          {value.description}
        </p>
      </>
    );
  };

  return (
    <section className="w-full my-12 md:my-25 text-left">
      {/* Badge */}
      <span className="md:text-base text-sm mb-3 md:mb-5 font-semibold text-[#00895C] tracking-wide">
        Values
      </span>

      {/* Title */}
      <h2 className="text-2xl md:text-5xl font-semibold text-gray-900 md:my-5 my-3">
        Core Values
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
              transform: `translateX(${translateX}%)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-in-out'
            }}
          >
            {coreValuesData.map((value) => (
              <div key={value.id} className="min-w-full flex-shrink-1 px-1">
                <div className="flex flex-col gap-3 p-5 bg-white rounded-3xl border border-[#DFE1E7]">
                  {renderCard(value)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {coreValuesData.map((_, index) => (
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
        {coreValuesData.map((value) => (
          <div key={value.id} className="flex flex-col gap-3 md:p-8 p-5
           bg-white hover:scale-105 transition-all
           duration-300 ease-in-out hover:shadow-md 
             rounded-3xl border border-[#DFE1E7]">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${IMG_Map[value.iconKey]?.bg ?? "bg-gray-100"}`}>
              <img src={IMG_Map[value.iconKey]?.img ?? weight} alt={value.title} />
            </div>
            <h3 className="md:text-2xl text-xl font-semibold text-gray-900">{value.title}</h3>
            <p className="md:text-base text-sm text-gray-500 leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default CoreValues;