
import { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Clock, Download, Share2, User } from 'lucide-react';
import Footer from '../../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { ALL_EVENTS } from './Events';
import EventCard from '../../components/Ui/EventCard';
import RegistrEvents from './RegistrEvents';
import VideosYouTube from './VideosYouTube';
import EventGallery from './EventGallery';
import { LuLoaderCircle } from "react-icons/lu";



// ─── Mock Data ───────────────

const EVENT = {
  title: 'The Psychology Behind UX Design',
  location: 'Cairo',
  date: '24/07/2024',
  time: '2 PM – 6 PM',
  mode: 'Online',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=280&fit=crop',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.dolor sit amet, consectetur adipiscing elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.dolor sit amet, consectetur adipiscing elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  aboutSpeakers: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.dolor sit amet, consectetur adipiscing elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
};

const SPEAKERS = [
  { id: 1, name: 'Yousef Abdelmoaty', role: 'Senior UI/ UX Designer', avatar: 'https://i.pravatar.cc/48?img=11' },
  { id: 2, name: 'Yousef Abdelmoaty', role: 'Senior UI/ UX Designer', avatar: 'https://i.pravatar.cc/48?img=12' },
  { id: 3, name: 'Yousef Abdelmoaty', role: 'Senior UI/ UX Designer', avatar: 'https://i.pravatar.cc/48?img=13' },
];

// ─── Component ────

const EventsDetails = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  // Slider State
  const otherEvents = ALL_EVENTS.slice(0, 3);
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
    const boundedIndex = Math.max(0, Math.min(otherEvents.length - 1, slideIndex));
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
    <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl    mx-auto ">
      <div className="  sm:max-w-5xl md:max-w-6xl w-[98%] lg:w-full text-center mx-1">

      <div className="py-2 px-4 border bg-white border-gray-200 rounded-2xl">
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8  my-8 ">
          {/* ── LEFT: Content + Form ── */}
          <div>
             {/* ── Title ── */}
        <h1 className="text-[40px] font-semibold text-left text-gray-900 mb-6">
          {EVENT.title}
        </h1>
        {/* ── Meta Bar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-gray-500">
          <span className="flex items-center gap-1 px-3 py-2.5 border border-gray-100 rounded-lg"><MapPin size={12} /> {EVENT.location}</span>
          
          <span className="flex items-center gap-1 px-3 py-2.5 border border-gray-100 rounded-lg"><Calendar size={12} /> {EVENT.date}</span>
          
          <span className="flex items-center gap-1 px-3 py-2.5 border border-gray-100 rounded-lg"><Clock size={12} /> {EVENT.time}</span>
          
          <button className="flex items-center gap-1 px-3 py-2.5 border border-gray-100 rounded-lg hover:text-gray-800"><Download size={12} /> {EVENT.mode}</button>
          <button className="flex items-center px-3 py-2.5 border border-gray-100 rounded-lg gap-1 hover:text-gray-800 transition">
            <Share2 size={12} /> Share
          </button>
        </div>
            {/* Event Image (mobile only) */}
            <div className="md:hidden rounded-2xl overflow-hidden mb-6 h-48">
              <img src={EVENT.image} alt="event" className="w-full h-full object-cover" />
            </div>
            {showVideo && <VideosYouTube />}
            <h2 className="text-lg text-left font-bold text-gray-900 mb-2">Event Description</h2>
            {EVENT.description.split('\n\n').map((para, i) => (
              <p key={i} className="text-base text-left text-gray-500 leading-relaxed mb-4">{para}</p>
            ))}

            {/* More About Speakers */}
            <h2 className="text-lg text-left font-bold text-gray-900 mb-2">More About Speakers</h2>
            <p className="text-base text-left  text-gray-500 leading-relaxed mb-8">{EVENT.aboutSpeakers}</p>
            {/* ── Registration Form ── */}
            <h2 className="text-xl text-left font-semibold text-gray-900 mb-4">Event Registration</h2> 
             <RegistrEvents />
            
          </div>
          {/* ── RIGHT: Event Card + Speakers ── */}
          <div className="space-y-6">
            {/* Event Poster Card */}
            <button
              onClick={() => setShowVideo(!showVideo)}
              className='py-2.5 px-4 text-sm flex items-center justify-center gap-2 border border-primary bg-primary rounded-lg hover:bg-primary/90 w-full text-white transition'
            >
              {showVideo ? 'Hide Session' : 'Watch Session'}
              <LuLoaderCircle size={22} className="" />
            </button>

            

            <div className="rounded-2xl overflow-hidden hidden md:block">
              <img
                src={EVENT.image}
                alt="event poster"
                className="w-full h-90 object-cover rounded-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg,#312e81,#1e1b4b)';
                  e.target.parentElement.style.height = '12rem';
                }}
              />
            </div>

            {/* Speakers */}
            <div>
              <h2 className="text-2xl text-left font-medium text-gray-900 mb-3">Speakers</h2>
              <div className="space-y-3">
                {SPEAKERS.map((s) => (
                  <div
                    key={s.id}
                    className="flex bg-gray-100  items-center gap-3 border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition"
                  >
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-1"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <span
                      className="w-10 h-10 rounded-full bg-indigo-100 text-primary items-center justify-center flex-shrink-0 hidden"
                    >
                      <User size={18} />
                    </span>
                    <div>
                      <p className="text-xl font-semibold text-gray-800">{s.name}</p>
                      <p className="text-base text-gray-400">{s.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        {/* Event Gallery */}
        <EventGallery />
        {/* ── Footer ── */}
      </div>
                {/* Other Events */}
                <div className="my-10">
        <div className="flex items-center justify-between md:my-6 sm:my-4 mb-3">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Other Events</h2>
          <button onClick={() => navigate('/events')}
           className="text-sm text-primary border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition">View All</button>
        </div>
        
        {/* Mobile Slider */}
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
                transition: isDragging ? 'none' : 'transform 0.3s ease-in-out'
              }}
            >
              {otherEvents.map((event) => (
                <div key={event.id} className="min-w-full flex-shrink-0 px-2">
                  <EventCard event={event} />
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

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-1 mx-2 sm:grid-cols-3 gap-4 mb-4">
          {otherEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
              </div>
        <Footer />
      </div>
    </div>
  );
};

export default EventsDetails;