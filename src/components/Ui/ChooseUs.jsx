import { useState, useRef, useEffect } from 'react';
import Add from "../../assets/Add.svg"
import Pc from "../../assets/pc.svg"

const toStr = (val) => {
  if (!val) return '';
  if (typeof val === 'object') return val?.name || val?.title || '';
  return val;
};


const defaultFaqs = [
  { img: Add, question: 'What is showcase work?', answer: 'Showcase work allows you to display your projects.' },
  { img: Pc, question: 'How does it work?', answer: 'It guides you step by step.' },
  { img: Add, question: 'How  work?', answer: 'Upload projects and share your portfolio link.' },
  { img: Pc, question: 'What features  offer?', answer: 'Templates, custom sections, PDF export.' },
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
    const boundedIndex = Math.max(0, Math.min(defaultFaqs.length - 1, slideIndex));
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
      <h2 className="md:text-3xl text-xl font-bold text-gray-900 mb-8">Why Choose us?</h2>
      
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
            {defaultFaqs.map((faq, i) => (
              <div key={i} className="min-w-full flex-shrink-1 px-4">
                <div className="flex flex-col items-center gap-2 border border-gray-200 rounded-2xl p-5 bg-white h-full">
                  <img 
                  loading="eager"
            fetchPriority="high"
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" src={faq.img} alt={faq.title} />
              <p className="md:text-xl text-base max-w-3xl font-semibold text-gray-800">{toStr(faq.question)}</p>
            <p className="md:text-base text-sm text-gray-500 text-center">{toStr(faq.answer)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {defaultFaqs.map((faq, index) => (
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
        {defaultFaqs.map((faq, i) => (
          <div key={i} className="flex flex-col items-center gap-2 border border-gray-200 rounded-2xl p-5 bg-white">
            <img 
            loading="eager"
            fetchPriority="high"
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" src={faq.img} alt={faq.title} />
              <p className="md:text-xl text-base max-w-3xl font-semibold text-gray-800">{toStr(faq.question)}</p>
            <p className="md:text-base text-sm text-gray-500 text-center">{toStr(faq.answer)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUs;