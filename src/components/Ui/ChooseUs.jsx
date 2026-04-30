import { useState, useRef, useEffect } from 'react';
import Add from "../../assets/Add.svg"
import Pc from "../../assets/pc.svg"

const items = [
  { img: Pc , title: 'Showcase Work', desc: 'Showcase your project to stand out among all' },
  { img: Add, title: 'Resume Builder', desc: "Create a professional resume using our built-in resume builder" },
  { img: Pc , title: 'Showcase Work', desc: 'Showcase your project to stand out among all' },
  { img: Add , title: 'Resume Builder', desc: "Create a professional resume using our built-in resume builder" },
];

const ChooseUs = () => {
  // Slider State
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
    const boundedIndex = Math.max(0, Math.min(items.length - 1, slideIndex));
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

  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Choose us?</h2>
      
      {/* Mobile Slider */}
      <div className="md:hidden">
        <div
          ref={containerRef}
          className="overflow-hidden rounded-lg"
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
            {items.map((item, i) => (
              <div key={i} className="min-w-full flex-shrink-1 px-4">
                <div className="flex flex-col items-center gap-2 border border-gray-200 rounded-2xl p-5 bg-white h-full">
                  <img className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" src={item.img} alt={item.title} />
              <p className="md:text-xl text-base max-w-3xl font-semibold text-gray-800">{item.title}</p>
            <p className="md:text-base text-sm text-gray-500 text-center">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
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
      <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 border border-gray-200 rounded-2xl p-5 bg-white">
            <img className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" src={item.img} alt={item.title} />
            <p className="md:text-xl text-base max-w-3xl font-semibold text-gray-800">{item.title}</p>
            <p className="md:text-base text-sm text-gray-500 text-center">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUs;