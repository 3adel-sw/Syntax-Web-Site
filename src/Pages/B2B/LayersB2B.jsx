import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getOurNumbers } from '../../services/about/aboutService';

const LayersB2B = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  const animate = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    if (!pausedRef.current) {
      const speed = isRTL ? 0.5 : -0.5;
      const setWidth = el.scrollWidth / 2;
      posRef.current += speed;
      if (posRef.current < -setWidth) posRef.current += setWidth;
      if (posRef.current > 0) posRef.current -= setWidth;
      el.style.transform = `translateX(${posRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [isRTL]);

  useEffect(() => {
    if (!loading && sliderRef.current) {
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, loading]);

  useEffect(() => {
    getOurNumbers()
      .then((res) => setItems(res.data.our_numbers || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  const displayItems = [...items, ...items];

  return (
    <div className="md:my-20 sm:my-12 my-14 overflow-hidden w-full"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        ref={sliderRef}
        className="flex items-center gap-4 whitespace-nowrap w-max"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {displayItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#F6F7FB] rounded-2xl py-3 md:py-4 px-3 md:px-6 flex-shrink-0"
          >
            <div className="flex flex-row items-center gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover shrink-0"
              />
              <div className="text-start whitespace-nowrap">
                <h3 className="text-sm md:text-base text-start font-semibold text-gray-900">{item.title}</h3>
                <p className="text-xs md:text-sm text-start font-medium text-gray-500">+ {item.number}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayersB2B;