import { useState } from 'react';
import { FaArrowLeftLong ,FaArrowRightLong} from "react-icons/fa6";
import { useTranslation } from 'react-i18next';


const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', // coffee
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80', // leaves dark
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80', // plant vase
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', // mountain
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80', // nature
];

const EventGallery = ({ images = DEFAULT_IMAGES }) => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const galleryImages = images.length ? images : DEFAULT_IMAGES;

  const prev = () => setCurrent((p) => (p === 0 ? galleryImages.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p === galleryImages.length - 1 ? 0 : p + 1));

// Imgs
  const getIndex = (offset) => (current + offset + galleryImages.length) % galleryImages.length;

  return (
    <div className="my-6">
      <h2 className="text-xl text-left font-bold text-gray-900 mb-4">{t('events.eventGallery')}</h2>

      {/* Slider */}
      <div className="flex items-center gap-3 overflow-hidden">

        {/* Previous — small */}
        <div className="flex-shrink-0 md:w-[28%] w-full h-48 rounded-2xl overflow-hidden opacity-80">
          <img
            src={galleryImages[getIndex(-1)]}
            alt={t('events.previousImage')}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Current — large center */}
        <div className="flex-shrink-0 md:w-[44%] w-full h-56 rounded-2xl overflow-hidden shadow-md">
          <img
            src={galleryImages[getIndex(0)]}
            alt={t('events.currentImage')}
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>

        {/* Next — small */}
        <div className="flex-shrink-0 md:w-[28%] w-full h-48 rounded-2xl overflow-hidden opacity-80">
          <img
            src={galleryImages[getIndex(1)]}
            alt={t('events.nextImage')}
            className="w-full h-full object-cover"
          />
        </div>

      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-5">
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
      </div>
    </div>
  );
};

export default EventGallery;
