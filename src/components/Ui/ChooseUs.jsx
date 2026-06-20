import { useState, useRef, useEffect } from 'react';
import Add from "../../assets/Add.svg"
import Pc from "../../assets/pc.svg"
import { useTranslation } from 'react-i18next';

const toStr = (val) => {
  if (!val) return '';
  if (typeof val === 'object') return val?.name || val?.title || '';
  return val;
};

const fallbackIcons = [Add, Pc, Add, Pc];

const FaqCard = ({ faq, i }) => (
  <div className="flex flex-col items-center gap-2 border border-gray-200 rounded-2xl p-5 bg-white h-full">
    <img
      loading="lazy"
      fetchPriority="high"
      className="w-12 h-12 rounded-xl"
      src={faq.icon || faq.image || fallbackIcons[i % fallbackIcons.length]}
      alt={toStr(faq.question)}
    />
    <p className="md:text-xl text-base font-semibold text-gray-800">
      {toStr(faq.question)}
    </p>
    <div
      className="text-sm text-gray-500 text-center prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: faq.answer }}
    />
  </div>
);

const ChooseUs = ({ course }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef(0);
  const translateXRef = useRef(0);
  const containerRef = useRef(null);

  const faqs = course?.why_us || [];

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
    const boundedIndex = Math.max(0, Math.min(faqs.length - 1, slideIndex));
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


  return (
    <div className="mt-16 text-center">
      <h2 className="md:text-3xl text-xl font-bold text-gray-900 mb-8">{t('courseDetails.whyChooseUs')}</h2>
      
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
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-in-out'
            }}
          >
           {faqs.map((faq, i) => (
              <div key={faq.id ?? i} className="min-w-full flex-shrink-1 px-4">
                <FaqCard faq={faq} i={i} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
         {faqs.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-primary w-6' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-6">
         {faqs.map((faq, i) => (
          <FaqCard key={faq.id ?? i} faq={faq} i={i} />
        ))}
      </div>
    </div>
  );
};

export default ChooseUs;
