import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TabSlider = ({ tabs, activeTab, setActiveTab, className = "" }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef(0);
  const translateXRef = useRef(0);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
    setIsDragging(true);
    translateXRef.current = translateX;
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
  };

  useEffect(() => {
    const activeBtn = containerRef.current?.querySelector('[data-active="true"]');
    if (activeBtn && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const btnCenter = btnRect.left - containerRect.left + btnRect.width / 2;
      const offset = containerRect.width / 2 - btnCenter;
      const maxScroll = activeBtn.parentElement.scrollWidth - containerRect.width;
      const clampedOffset = isRTL
        ? Math.max(0, Math.min(maxScroll, offset))
        : Math.min(0, Math.max(-maxScroll, offset));
      setTranslateX(clampedOffset);
      translateXRef.current = clampedOffset;
    }
  }, [activeTab, isRTL]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex gap-2"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
            width: 'max-content'
          }}
        >
          {tabs.map((tab) => {
            const value = typeof tab === "object" ? tab.value : tab;
            const label = typeof tab === "object" ? tab.label : tab;
            return (
            <button
              key={value}
              data-active={activeTab === value}
              onClick={() => setActiveTab(value)}
              className={`px-4 py-3 rounded-xl text-sm border transition-all duration-200 whitespace-nowrap ${
                activeTab === value
                  ? "bg-primary text-white border-primary"
                  : "bg-primary/10 text-primary border-gray-200 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          )})}
        </div>
      </div>
    </div>
  );
};

export default TabSlider;
