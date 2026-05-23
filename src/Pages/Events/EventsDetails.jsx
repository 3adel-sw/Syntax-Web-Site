import { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Clock, Download, Share2, User, Loader2, X } from 'lucide-react';
import { FaXTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import Footer from '../../components/layout/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import EventCard from '../../components/Ui/EventCard';
import RegistrEvents from './RegistrEvents';
import VideosYouTube from './VideosYouTube';
import EventGallery from './EventGallery';
import { LuLoaderCircle } from 'react-icons/lu';
import { getAllEvents, getEventById } from '../../services/events/eventsService';
import { useTranslation } from 'react-i18next';



const toStr = (value) => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  return '';
};

const hasArabicText = (value) => /[\u0600-\u06FF]/.test(toStr(value));

const formatDate = (value, locale = 'en-US', fallback = 'Date') => {
  const dateValue = toStr(value);
  if (!dateValue) return fallback;

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const normalizeEvent = (event) => ({
  ...event,
  title: event.name || event.title,
  type: (event.category?.name || event.type || 'Event').trim(),
  duration: event.time || event.duration || event.history,
  image: event.image || event.banner_image,
});

const EventsDetails = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  // const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef(0);
  const translateXRef = useRef(0);
  const containerRef = useRef(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'instagram':
        shareUrl = `https://www.instagram.com/?url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    if (shareUrl) window.open(shareUrl, '_blank');
    setShowShareMenu(false);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        let eventData = null;
        let eventsData = [];

        try {
          const eventsRes = await getAllEvents();
          eventsData = eventsRes.data?.events || eventsRes.data?.data || eventsRes.data || [];
        } catch (eventsErr) {
          console.error('Events list request failed:', eventsErr);
        }

        if (Array.isArray(eventsData)) {
          eventData = eventsData.find((item) => String(item.id) === String(id) || item.slug === id);
        }

        if (!eventData) {
          try {
            const eventRes = await getEventById(id);
            eventData = eventRes.data?.event || eventRes.data?.data || eventRes.data;
          } catch (detailsErr) {
            console.warn('Event details unavailable for current language:', detailsErr.response?.data?.message || detailsErr.message);
          }
        }

        if (!eventData) {
          setError(t('messages.eventNotFound'));
          return;
        }

        setEvent(eventData);
        setShowVideo(false);
        // setIsRegistered(false);
        setOtherEvents(
          Array.isArray(eventsData)
            ? eventsData
              .filter((item) => String(item.id) !== String(eventData?.id))
              .slice(0, 3)
              .map(normalizeEvent)
            : []
        );
      } catch (err) {
        console.error(err);
        setError(t('messages.failedToLoadEvent'));
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, t]);

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
    const maxIndex = Math.max(0, otherEvents.length - 1);
    const boundedIndex = Math.max(0, Math.min(maxIndex, slideIndex));
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={48} className="animate-spin text-primary" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">{error}</div>
  );

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">{t('messages.eventNotFound')}</div>
  );

  const title = event.name || event.title || 'Event';
  const image = event.banner_image || event.image;
  const speakers = event.speakers || [];
  const gallery = event.gallery || [];
  const videos = event.videos || [];
  const category = event.category?.name || event.type || 'Event';
  const isArabic = i18n.language === 'ar' || localStorage.getItem('lang') === 'ar'
    || hasArabicText(title)
    || hasArabicText(event.description)
    || hasArabicText(category);
  const direction = isArabic ? 'rtl' : 'ltr';
  const textAlignClass = isArabic ? 'text-right' : 'text-start';

  // Compute event start time from history + time
  const getEventStartTime = () => {
    if (!event.history) return null;
    const date = new Date(event.history);
    if (isNaN(date.getTime())) return null;

    if (event.time) {
      const timeStr = event.time.trim();
      const match = timeStr.match(/(\d{1,2}):(\d{2})(?:\s*(AM|PM|am|pm))?/);
      if (match) {
        let hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const ampm = (match[3] || '').toUpperCase();
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
        date.setHours(hours, minutes, 0, 0);
        return date;
      }
    }

    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
  };

  const eventStart = getEventStartTime();
  const now = new Date();
  const isEventPassed = eventStart ? now >= eventStart : false;
  const canRegister = eventStart ? now < new Date(eventStart.getTime() - 8 * 60 * 60 * 1000) : true;

  return (
    <div dir={direction} className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">
        <div className="py-2 px-4 border bg-white border-gray-200 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8 my-8">
            <div>
              <h1 className={`md:text-[40px] text-2xl font-semibold ${textAlignClass} text-gray-900 mb-6`}>
                {title}
              </h1>

              <div className="grid grid-cols-3 text-center sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6 md:text-xs text-[9px] text-gray-500">
                <span className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 bg-[#FCFCFD] rounded-lg"><MapPin size={12} /> {event.location || t('common.location')}</span>
                <span className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 bg-[#FCFCFD] rounded-lg"><Calendar size={12} /> {formatDate(event.history, isArabic ? 'ar-EG' : 'en-US', t('common.date'))}</span>
                <span className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 bg-[#FCFCFD] rounded-lg"><Clock size={12} /> {event.time || t('common.time')}</span>
                <button className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 bg-[#FCFCFD] rounded-lg hover:text-gray-800"><Download size={12} /> {category}</button>
                <button onClick={() => setShowShareMenu((prev) => !prev)} className="flex items-center justify-center px-3 py-2 border border-gray-200 bg-[#FCFCFD] rounded-lg gap-1 hover:text-gray-800 transition relative">
                  <Share2 size={12} /> {t('common.share')}
                </button>
               {showShareMenu && (
                 <>
                  
                   <div
                     className="fixed inset-0 z-40"
                     onClick={() => setShowShareMenu(false)}
                   />
               
                   <div className="absolute z-50 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-2xl shadow-lg p-2 md:flex-row flex-col gap-1 w-fit md:p-8 max-w-[90%] h-fit">
                     
                     
                     <button
                       onClick={() => setShowShareMenu(false)}
                       className="absolute top-0 right-0 p-2 text-gray-400 hover:text-red-600 cursor-pointer"
                     >
                       <X size={16} />
                     </button>
               
                     <button
                       onClick={() => handleShare('twitter')}
                       className="flex items-center mt-2 gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
                     >
                       <FaXTwitter size={16} /> {t('common.x')}
                     </button>
                     <button
                       onClick={() => handleShare('instagram')}
                       className="flex items-center mt-2 gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
                     >
                       <FaInstagram size={16} /> {t('common.instagram')}
                     </button>
                     <button
                       onClick={() => handleShare('linkedin')}
                       className="flex items-center mt-2 gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
                     >
                       <FaLinkedin size={16} /> {t('common.linkedin')}
                     </button>
                   </div>
                 </>
               )}
              </div>

              <div className="md:hidden rounded-2xl overflow-hidden mb-6 h-48">
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </div>

              {isEventPassed && showVideo && videos.length > 0 && <VideosYouTube videos={videos} />}

              <h2 className={`text-lg ${textAlignClass} font-bold text-gray-900 mb-2`}>
                {t('events.eventDescription')}
              </h2>
              <div
                dir={direction}
                className={`prose prose-gray max-w-none ${textAlignClass} text-gray-500 prose-p:text-base prose-p:leading-relaxed mb-8`}
                dangerouslySetInnerHTML={{ __html: event.description || event.small_description || t('messages.noDescription') }}
              />
{/* Map */}
{event.map && event.map.startsWith('http') && (
  <div className="mb-8">
    <h2 className={`text-lg ${textAlignClass} font-bold text-gray-900 mb-3`}>
      {t('events.locationOnMap')}
    </h2>
    <div className="rounded-2xl overflow-hidden border border-gray-200 h-64">
      <iframe
        src={(() => {
          const url = event.map;

          // Handle already-embed links
          if (url.includes('output=embed') || url.includes('/embed')) {
            return url;
          }

          // Extract coordinates from links like: @lat,lng or q=lat,lng
          const coordMatch = url.match(/[@?&](-?\d+\.\d+),(-?\d+\.\d+)/);
          if (coordMatch) {
            return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed&z=15`;
          }

          // Extract from q= parameter
          const qMatch = url.match(/[?&]q=([^&]+)/);
          if (qMatch) {
            return `https://maps.google.com/maps?q=${qMatch[1]}&output=embed&z=15`;
          }

          // Fallback: use location name
          return `https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed&z=15`;
        })()}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={event.location}
      />
    </div>
    <a
      href={event.map}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline"
    >
      <MapPin size={14} />
      {event.location}
    </a>
  </div>
)}

              {canRegister && (
                <>
                  <h2 className={`text-xl ${textAlignClass} font-semibold text-gray-900 mb-4`}>
                    {t('events.eventRegistration')}
                  </h2>
                  <RegistrEvents eventId={event.id} />
                </>
              )}
            </div>

            <div className="space-y-6">
              {isEventPassed && videos.length > 0 && (
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="py-2.5 px-4 text-sm flex items-center justify-center gap-2 border border-primary bg-primary rounded-lg hover:bg-primary/90 w-full text-white transition"
                >
                  {showVideo ? t('events.hideSession') : t('events.watchSession')}
                  <LuLoaderCircle size={22} />
                </button>
              )}

              <div className="rounded-2xl overflow-hidden hidden md:block">
                <img
                  src={image}
                  alt={t('events.eventPosterAlt')}
                  className="w-full h-90 object-cover rounded-2xl"
                />
              </div>

              <div>
                <h2 className={`text-2xl ${textAlignClass} font-medium text-gray-900 mb-3`}>
                  {t('events.speakers')}
                </h2>
                <div className="space-y-3">
                  {speakers.length ? speakers.map((speaker) => (
                    <div
                      key={speaker.id || speaker.name}
                      className="flex bg-gray-100 items-center gap-3 border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition"
                    >
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <span className="w-10 h-10 rounded-full bg-indigo-100 text-primary items-center justify-center flex-shrink-0 hidden">
                        <User size={18} />
                      </span>
                      <div>
                        <p className="text-xl font-semibold text-gray-800">{speaker.name}</p>
                        <p className="text-base text-gray-400">{speaker.position || t('common.speaker')}</p>
                      </div>
                    </div>
                  )) : (
                    <div className={`${textAlignClass} text-gray-400`}>
                      {t('messages.noSpeakers')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isEventPassed && <EventGallery images={gallery} />}
        </div>

        <div className="my-10">
          <div className="flex items-center justify-between md:my-6 sm:my-4 my-6">
            <h2 className="md:text-2xl text-xl font-bold text-gray-900 ">
              {t('events.otherEvents')}
            </h2>
            <button
              onClick={() => navigate('/events')}
              className="text-sm text-primary border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition"
            >
              {t('common.viewAll')}
            </button>
          </div>

          <div className="md:hidden mx-2">
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
                  transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
                }}
              >
                {otherEvents.map((item) => (
                  <div key={item.id} className="min-w-full flex-shrink-1 px-2">
                    <EventCard event={item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {otherEvents.map((_, index) => (
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

          <div className="hidden sm:grid grid-cols-1 mx-2 sm:grid-cols-3 gap-4 mb-4">
            {otherEvents.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EventsDetails;
