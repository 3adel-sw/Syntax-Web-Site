import { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';
import Subscribet from '../../components/Ui/Subscribe';
import TabSlider from '../../components/Ui/TabSlider';
import Footer from '../../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import EventCard from '../../components/Ui/EventCard';
import { getAllEvents } from '../../services/events/eventsService';
import { useTranslation } from 'react-i18next';

const DEFAULT_FILTER_TABS = ['All Events'];

const toStr = (value) => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  return '';
};

const stripHtml = (value) => toStr(value)
  .replace(/<[^>]*>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

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
  type: event.category?.name || event.type || 'Event',
  status: event.type,
  duration: event.time || event.duration || event.history,
  date: event.history || event.date,
  description: event.small_description || stripHtml(event.description),
  image: event.image || event.banner_image,
});

function Events() {
  const { t, i18n } = useTranslation();
  const allEventsLabel = t('events.allEvents');
  const [activeFilter, setActiveFilter] = useState('All Events');
  const [events, setEvents] = useState([]);
  const [filterTabs, setFilterTabs] = useState(DEFAULT_FILTER_TABS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef(0);
  const translateXRef = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getAllEvents();
        const eventsData = res.data?.events || res.data?.data || res.data || [];
        const normalizedEvents = Array.isArray(eventsData) ? eventsData.map(normalizeEvent) : [];
        const categories = [...new Set(normalizedEvents.map(event => event.type).filter(Boolean))];

        setEvents(normalizedEvents);
        setFilterTabs([allEventsLabel, ...categories]);
        setActiveFilter(allEventsLabel);
      } catch (err) {
        console.error(err);
        setError(t('messages.failedToLoadEvents'));
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [allEventsLabel, t]);

  const filteredEvents = activeFilter === allEventsLabel || activeFilter === 'All Events'
    ? events
    : events.filter(event => event.type === activeFilter);

  const upcomingEvent = events.find(event => event.status === 'Up-coming')
    || events.find(event => toStr(event.status).toLowerCase().includes('up'))
    || events[0];

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
    const boundedIndex = Math.max(0, Math.min(filteredEvents.length - 1, slideIndex));
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

  return (
    <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">
        <div className="mb-6 text-left">
          <h1 className="md:text-2xl text-xl font-bold text-gray-900 mt-14 leading-tight">
            {t('events.heroTitle')}
          </h1>
          <p className="text-sm text-gray-500 my-2 max-w-3xl">
            {t('events.heroDescription')}
          </p>
        </div>

        <div className="flex-wrap gap-2 mb-8 md:flex hidden">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-3 rounded-[14px] text-sm border transition-all duration-200 ${
                activeFilter === tab
                  ? 'bg-primary text-white border-primary'
                  : 'bg-primary/10 text-primary border-gray-200 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="mb-10">
          <h2 className="md:text-3xl text-xl text-left font-semibold text-gray-900 my-6">{t('events.upcomingEvents')}</h2>
          {upcomingEvent ? (
            <div className="border bg-gray-50 border-gray-200 md:h-[266px] rounded-2xl overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-58 md:w-92 md:p-2 w-full h-64 sm:h-auto flex-shrink-0">
                <img
                  src={upcomingEvent.banner_image || upcomingEvent.image}
                  alt={upcomingEvent.title}
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
              <div className="md:p-6 p-3 flex flex-col justify-center gap-2 space-y-2">
                <h3 className="md:text-4xl text-xl text-left font-semibold text-gray-900">{upcomingEvent.title}</h3>
                <div className="flex flex-wrap gap-4 text-gray-500">
                  <span className="flex text-base items-center gap-1">
                    <MapPin size={24} className="text-gray-400" />
                    {upcomingEvent.location || t('common.location')}
                  </span>
                  <span className="flex items-center gap-1 text-base">
                    <Calendar size={24} className="text-gray-400 " />
                    {formatDate(upcomingEvent.date, i18n.language === 'ar' ? 'ar-EG' : 'en-US', t('common.date'))}
                  </span>
                  <span className="flex items-center gap-1 text-base">
                    <Clock size={24} className="text-gray-400" />
                    {upcomingEvent.time || t('common.time')}
                  </span>
                </div>
                <p className="text-lg text-left text-gray-500 leading-relaxed max-w-2xl line-clamp-2">
                  {upcomingEvent.description}
                </p>
                <button
                  onClick={() => navigate(`/events-detail/${upcomingEvent.id}`)}
                  className="mt-2 self-start flex items-center gap-2 bg-transparent border border-bg-gray-50 text-primary text-[16px] font-medium px-4 py-3 rounded-2xl hover:bg-gray-50 transition"
                >
                  {t('common.viewDetails')} <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-2xl py-12 text-center text-gray-400">
              {t('messages.noUpcomingEvents')}
            </div>
          )}
        </section>

        <TabSlider
          tabs={filterTabs}
          activeTab={activeFilter}
          setActiveTab={setActiveFilter}
          className="md:hidden mb-4"
        />

        <section className="mb-18">
          <h2 className="md:text-3xl text-2xl text-left font-bold text-gray-900 mb-4">{t('events.allEvents')}</h2>

          <div className="hidden">
            <div
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ transform: `translateX(${translateX}%)` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredEvents.length ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-400">
                {t('messages.noEventsFound')}
              </div>
            )}
          </div>
        </section>

        <Subscribet />
        <Footer />
      </div>
    </div>
  );
}

export default Events;
