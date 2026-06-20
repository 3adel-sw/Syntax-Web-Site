import { useState, useEffect } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const EventGallery = ({ images }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [current, setCurrent] = useState(0);
  const galleryImages = images;

  const prev = () => setCurrent((p) => (p === 0 ? galleryImages.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p === galleryImages.length - 1 ? 0 : p + 1));

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(next, 2000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIndex = (offset) => (current + offset + galleryImages.length) % galleryImages.length;

  return (
    <div className="my-6">
      <h2 className="text-xl text-start font-bold text-gray-900 mb-4">{t('events.eventGallery')}</h2>

      {/* Slider */}
      <div className="flex items-center gap-3 overflow-hidden">

        {/* Previous — small */}
        <div className="flex-shrink-0 md:w-[31%] w-full h-48 rounded-2xl overflow-hidden opacity-80">
          <img
            loading="lazy"
            src={galleryImages[getIndex(-1)]}
            alt={t('events.previousImage')}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Current — large center */}
        <div className="flex-shrink-0 md:w-[33%] w-full h-48 rounded-2xl overflow-hidden shadow-md">
          <img
            loading="lazy"
            src={galleryImages[getIndex(0)]}
            alt={t('events.currentImage')}
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>

        {/* Next — small */}
        <div className="flex-shrink-0 md:w-[33%] w-full h-48 rounded-2xl overflow-hidden opacity-80">
          <img
            loading="lazy"
            src={galleryImages[getIndex(1)]}
            alt={t('events.nextImage')}
            className="w-full h-full object-cover"
          />
        </div>

      </div>

     {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-5">
        {isRTL ? (
          <>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <FaArrowRightLong size={16} className="text-gray-600" />
            </button>
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <FaArrowLeftLong size={16} className="text-gray-600" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <FaArrowLeftLong size={16} className="text-gray-600" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <FaArrowRightLong size={16} className="text-gray-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventGallery;