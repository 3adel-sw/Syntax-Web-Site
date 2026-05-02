import { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import Subscribet from '../../components/Ui/Subscribe';
import TabSlider from '../../components/Ui/TabSlider';
import Footer from '../../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import EventCard from '../../components/Ui/EventCard';
import CourseCard from '../../assets/CourseCard.svg';

// ─── Data ────────────────────────────────────────────────────────────────────

const FILTER_TABS = ['All Events', 'Online Workshop', 'Offline Meetup', 'Mega Event'];

const UPCOMING_EVENT = {
  id: 0,
  title: 'UX Meetup - Cairo 2024',
  location: 'Nasr City, Cairo',
  date: '24/07/2024',
  time: '2 PM – 6 PM',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
};

const categoryMap = {
  "Online Workshop": "ONLINE WORKSHOP",
  "Offline Meetup": "OFFLINE MEETUP",
  "Mega Event": "MEGA EVENT",
};

export const ALL_EVENTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: 'UX Design Foundation',
  type: ['ONLINE WORKSHOP', 'OFFLINE MEETUP', 'MEGA EVENT', 'ONLINE WORKSHOP'][i % 4],
  duration: '16 hours',
  image: CourseCard
}));

// ─── Main Component ──────────────────────────────────────────────────────────

function Events() {
  const [activeFilter, setActiveFilter] = useState('All Events');
  const navigate = useNavigate();

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef(0);
  const translateXRef = useRef(0);
  const containerRef = useRef(null);

  const mappedCategory = categoryMap[activeFilter];
  const filteredEvents = activeFilter === 'All Events'
    ? ALL_EVENTS
    : ALL_EVENTS.filter(event => event.type === mappedCategory);

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
      setTranslateX(-currentSlide * 100);
    }
  }, [currentSlide, isDragging]);

  return (
   <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">

      {/* ── Hero Header ── */}
      <div className="mb-6 text-left">
        <h1 className="md:text-2xl text-xl font-bold text-gray-900 mt-14 leading-tight">
          Connect, Learn, and Grow with the Community
        </h1>
        <p className="text-sm text-gray-500 my-2 max-w-3xl">
          Join our vibrant Design community through engaging events and meetups. Network with industry experts,
          exchange ideas, and stay ahead of trends in design, technology, and user experience.
        </p>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex-wrap gap-2 mb-8 md:flex hidden">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-3 rounded-[14px] text-sm border transition-all duration-200 ${
              activeFilter === tab
                ? "bg-primary text-white border-primary"
                : "bg-primary/10 text-primary border-gray-200 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    
      {/* ── Upcoming Events ── */}
      <section className="mb-10">
        <h2 className="md:text-3xl text-xl text-left font-semibold text-gray-900 my-6">Upcoming Events</h2>
        <div className="border bg-gray-50 border-gray-200 md:h-[266px] rounded-2xl overflow-hidden flex flex-col sm:flex-row">
          {/* Image */}
          <div className="sm:w-58 md:w-92 md:p-2 w-full h-64 sm:h-auto flex-shrink-0">
            <img
              src={UPCOMING_EVENT.image}
              alt={UPCOMING_EVENT.title}
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
          {/* Details */}
          <div className=" md:p-6 p-3 flex flex-col justify-center gap-2 space-y-2">
            <h3 className="md:text-4xl text-xl text-left font-semibold text-gray-900">{UPCOMING_EVENT.title}</h3>
            <div className="flex flex-wrap gap-4  text-gray-500">
              <span className="flex text-base items-center gap-1">
                <MapPin size={24} className="text-gray-400" />
                {UPCOMING_EVENT.location}
              </span>
              <span className="flex items-center gap-1 text-base">
                <Calendar size={24} className="text-gray-400 " />
                {UPCOMING_EVENT.date}
              </span>
              <span className="flex items-center gap-1 text-base">
                <Clock size={24} className="text-gray-400  " />
                {UPCOMING_EVENT.time}
              </span>
            </div>
            <p className="text-lg text-left text-gray-500 leading-relaxed max-w-2xl">
              {UPCOMING_EVENT.description}
            </p>
            <button
              onClick={() => navigate('/events-details')}
              className="mt-2 self-start flex items-center gap-2 bg-transparent border border-bg-gray-50 text-primary text-[16px] font-medium px-4 py-3 rounded-2xl hover:bg-gray-50 transition"
            >
              View Details <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>
        {/* Mobile Tab Slider */}
      <TabSlider
        tabs={FILTER_TABS}
        activeTab={activeFilter}
        setActiveTab={setActiveFilter}
        className="md:hidden mb-4"
      />

      {/* ── All Events ── */}
      <section className="mb-18">
        <h2 className="md:text-3xl text-2xl text-left font-bold text-gray-900 mb-4">All Events</h2>
        
        {/* Mobile Slider */}
        {/* <div className="md:hidden">
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
                transition: isDragging ? 'none' : 'transform 0.3s ease-in-out'
              }}
            >
              {filteredEvents.map((event) => (
                <div key={event.id} className="min-w-full flex-shrink-0 px-2">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {filteredEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-primary w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div> */}

        {/* Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <Subscribet />
      {/* Footer */}
      <Footer />
    </div>
  </div>
  );
}

export default Events;
