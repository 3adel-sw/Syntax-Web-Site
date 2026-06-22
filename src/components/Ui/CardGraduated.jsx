


import { useRef, useEffect, useCallback } from 'react';

const CardGraduated = ({ data = [] }) => {
  const apiLogos = data
    .map((item, index) => ({
      id: item.id || item.created_at || index,
      src: item.image || item.logo,
      alt: item.name || item.title || `Organization ${index + 1}`,
    }))
    .filter((logo) => logo.src);
  const sliderRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const visibleLogos = apiLogos;
  const allLogos = [...visibleLogos, ...visibleLogos];

  const animate = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    if (!pausedRef.current) {
      const setWidth = el.scrollWidth / 2;
      posRef.current -= 0.5;
      if (posRef.current < -setWidth) posRef.current += setWidth;
      el.style.transform = `translateX(${posRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div className="my-8 overflow-hidden">
      <div
        ref={sliderRef}
        className="flex items-center md:gap-4 gap-1 whitespace-nowrap"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {allLogos.map((logo, index) => (
          <div key={`${logo.id}-${index}`} className="flex-shrink-0 flex items-center justify-center px-1">
            <img 
              loading="lazy"
              src={logo.src} alt={logo.alt} className="max-h-12 w-auto object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGraduated
