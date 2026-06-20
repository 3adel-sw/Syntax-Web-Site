import { useState, useRef, useEffect } from 'react';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const getYoutubeId = (url = '') => {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^?&/]+)/);
  return match?.[1] || '';
};

const normalizeGalleryItems = (gallery = [], t) =>
  gallery.map((image, index) => ({
    id: `gallery-${index}`,
    thumbnail: typeof image === 'string' ? image : image?.image || image?.url,
    alt: t('courseDetails.courseGalleryAlt', { number: index + 1 }),
  })).filter((item) => item.thumbnail);


const normalizeVideoItems = (videos = [], fallbackImage = '', t) =>
  videos.map((video, index) => {
    const videoSrc = typeof video === 'string' ? video : video?.video || video?.url || video?.videoSrc;
    const youtubeId = getYoutubeId(videoSrc);

    return {
      id: `video-${index}`,
      thumbnail: video?.thumbnail || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : fallbackImage),
      videoSrc,
      embedSrc: youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1` : '',
      alt: t('courseDetails.courseVideoAlt', { number: index + 1 }),
      isYoutube: Boolean(youtubeId),
    };
  }).filter((item) => item.videoSrc && item.thumbnail);

// ========== Video Thumbnail Card ==========
const VideoCard = ({ item, onClick, isImage }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ aspectRatio: '4/3' }}
      onMouseEnter={() => !isImage && setHovered(true)}
      onMouseLeave={() => !isImage && setHovered(false)}
      onClick={() => !isImage && onClick && onClick(item)}
    >
      <img
        loading="lazy"
        fetchPriority="high"
        src={item.thumbnail}
        alt={item.alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {!isImage && (
        <>
          {/* Dark overlay on hover */}
          <div
            className="absolute inset-0 bg-black transition-opacity duration-300"
            style={{ opacity: hovered ? 0.4 : 0.15 }}
          />
          {/* Play button */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Play size={20} className="text-gray-800 ml-1" fill="currentColor" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ========== Modal Video Player ==========
const VideoModal = ({ item, onClose }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl mx-4 rounded-2xl overflow-hidden bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {item.isYoutube ? (
          <iframe
            src={item.embedSrc}
            title={item.alt}
            className="w-full aspect-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            src={item.videoSrc}
            className="w-full"
            autoPlay
            controls={false}
            style={{ maxHeight: '70vh' }}
          />
        )}
        
        {/* Controls */}
        <div className="absolute top-3 right-3 flex gap-2">
          {!item.isYoutube && (
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          )}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== Section Block ==========
const Section = ({ title, subtitle, items, onPlay, isImage, autoSlideInterval }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef(0);
  const translateXRef = useRef(0);
  const containerRef = useRef(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

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
    const boundedIndex = Math.max(0, Math.min(items.length - 1, slideIndex));
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

  // Auto-slide for desktop
  useEffect(() => {
    if (!autoSlideInterval || !items.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const max = Math.max(0, items.length - 3);
        return prev >= max ? 0 : prev + 1;
      });
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [autoSlideInterval, items.length]);

  if (!items.length) return null;

  const maxSlide = Math.max(0, items.length - 3);

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">{title}</h2>
        <p className="text-base text-gray-500">{subtitle}</p>
      </div>
      
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
            {items.map((item) => (
              <div key={item.id} className="min-w-full flex-shrink-1 px-2">
                <VideoCard item={item} onClick={onPlay} isImage={isImage} />
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

      {/* Desktop Carousel */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${(isRTL ? 1 : -1) * currentSlide * (100 / 3)}%)` }}
            >
              {items.map((item) => (
                <div key={item.id} className="min-w-[33.333%] flex-shrink-2 px-2">
                  <VideoCard item={item} onClick={onPlay} isImage={isImage} />
                </div>
              ))}
            </div>
          </div>
          {items.length > 3 && (
            <>
              <button
                onClick={() => setCurrentSlide((p) => Math.max(0, p - 1))}
                className="absolute hidden left-0 top-1/2 -translate-y-1/2 -ml-4 w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 shadow-md transition z-10"
              >
                <FaArrowLeftLong size={16} className="text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentSlide((p) => Math.min(maxSlide, p + 1))}
                className="absolute hidden right-0 top-1/2 -translate-y-1/2 -mr-4 w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 shadow-md transition z-10"
              >
                <FaArrowRightLong size={16} className="text-gray-600" />
              </button>
            </>
          )}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.max(1, maxSlide + 1) }).map((_, index) => (
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
    </div>
  );
};

// ========== Main Component ==========
const CapturedVideos = ({ course = {} }) => {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState(null);
  const galleryItems = normalizeGalleryItems(course.gallery || [], t);
  const videoItems = normalizeVideoItems(course.videos || [], course.banner_image || course.image || '', t);

  return (
    <div className="py-10">
      <Section
        title={t('courseDetails.capturedMoments')}
        subtitle={t('courseDetails.capturedMomentsSubtitle')}
        items={galleryItems}
        isImage={true}
        autoSlideInterval={1000}
      />
      <Section
        title={t('courseDetails.videos')}
        subtitle={t('courseDetails.capturedMomentsSubtitle')}
        items={videoItems}
        onPlay={setActiveVideo}
        isImage={false}
      />

      {activeVideo && (
        <VideoModal item={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
};

export default CapturedVideos;
