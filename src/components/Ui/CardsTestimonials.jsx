import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';

const splitIntoColumns = (arr, cols) => {
  const columns = Array.from({ length: cols }, () => []);
  arr.forEach((item, i) => columns[i % cols].push(item));
  return columns;
};

const colors = [
  "bg-blue-50 text-blue-700",
  "bg-orange-50 text-orange-700",
  "bg-red-50 text-red-700",
  "bg-green-50 text-green-700",
  "bg-purple-50 text-purple-700",
  "bg-indigo-50 text-indigo-700",
  "bg-rose-50 text-rose-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-50 text-amber-700",
];

const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
};

const TestimonialCard = ({ content, name, job, image, i }) => (
   <div className="bg-white border space-y-9  border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
    <p className="text-base text-gray-700 text-start leading-relaxed">{content}</p>
    <div className="flex items-center gap-3">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-1"
        />
      ) : (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold flex-shrink-1 ${colors[i % colors.length]}`}>
          {getInitials(name)}
        </div>
      )}
      <div className="text-start">
        <p className="text-base font-semibold text-gray-900">{name}</p>
        {job && <p className="text-sm text-gray-400">{job}</p>}
      </div>
    </div>
  </div>
);

const CardsTestimonials = ({ testimonials = [], showButton, ButtonContent }) => {
  const navigate = useNavigate();
  const columns = splitIntoColumns(testimonials, 3);

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
    const boundedIndex = Math.max(0, Math.min(testimonials.length - 1, slideIndex));
    setCurrentSlide(boundedIndex);
    translateXRef.current = -boundedIndex * 100;
    setTranslateX(-boundedIndex * 100);
  };

  useEffect(() => {
    if (!isDragging) {
      translateXRef.current = -currentSlide * 100;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTranslateX(-currentSlide * 100);
    }
  }, [currentSlide, isDragging]);

  if (!testimonials.length) return null;

  return (
    <>
      {/* Mobile Slider */}
      <div className="md:hidden space-y-5 my-8 mx-2">
        <div
          ref={containerRef}
          className="overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
            }}
          >
            {testimonials.map((t, i) => (
              <div key={t.id} className="min-w-full flex-shrink-1 px-1">
                <TestimonialCard {...t} i={i} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
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
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:mt-20 mt-2 items-start">
        {columns.map((col, colIdx) => {
          return (
            <div key={colIdx} className="relative flex space-y-3 flex-col gap-3 bottom-12">
              {col.length > 0 && (
                <div
                  className="absolute top-0 left-0 right-0 h-40 w-full z-10 pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, white 20%, transparent 100%)",
                  }}
                />
            )}
              {col.map((t, i) => (
                <TestimonialCard key={t.id} {...t} i={i} />
              ))}
              {col.length > 0 && (
                <div
                  className="absolute bottom-5 left-0 right-0 h-40 w-full z-10 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, white 0%, transparent 100%)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {showButton && (
        <div className="mt-10">
          <button
            onClick={() => navigate('/feedbacks')}
            className="px-6 py-2.5 flex gap-2 mx-auto bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 transition"
          >
            {ButtonContent || 'Show All Feedbacks'}
          </button>
        </div>
      )}
    </>
  );
};

export default CardsTestimonials;
