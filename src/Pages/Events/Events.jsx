import { useState } from 'react';

import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import Subscribet from '../../components/Ui/Subscribe';
import Footer from '../../components/layout/Footer';
import { useNavigate } from 'react-router-dom';

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
  image: `https://images.unsplash.com/photo-${
    ['1581291518857-4d27a13647c6', '1587614382346-4ec70e388b28', '1593642632559-0c6d3fc62b89',
     '1581291518857-4d27a13647c6', '1587614382346-4ec70e388b28', '1593642632559-0c6d3fc62b89',
     '1581291518857-4d27a13647c6', '1587614382346-4ec70e388b28', '1593642632559-0c6d3fc62b89',
     '1581291518857-4d27a13647c6', '1587614382346-4ec70e388b28', '1593642632559-0c6d3fc62b89'][i]
  }?w=300&h=180&fit=crop`,
}));

// ─── Event Card (grid) ───────────────────────────────────────────────────────

export const EventCard = ({ event }) => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
    <div className="bg-gray-50 p-2 flex items-center justify-center h-56">
      {/* Placeholder illustration – replace with real images */}
      <div className="w-full h-full rounded-lg overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `
              <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#f3f4f6;border-radius:8px;">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <rect x="4" y="12" width="40" height="32" rx="4" fill="#6366f1" opacity="0.15"/>
                  <rect x="8" y="16" width="32" height="24" rx="3" fill="#6366f1" opacity="0.3"/>
                  <circle cx="20" cy="24" r="4" fill="#6366f1" opacity="0.6"/>
                  <rect x="48" y="20" width="12" height="20" rx="3" fill="#22c55e" opacity="0.4"/>
                  <rect x="50" y="23" width="8" height="3" rx="1" fill="#22c55e"/>
                  <rect x="50" y="29" width="8" height="3" rx="1" fill="#22c55e"/>
                </svg>
              </div>`;
          }}
        />
      </div>
    </div>
    <div className="p-3 text-left space-y-2">
      <span className="text-[10px]  font-semibold text-gray-700 tracking-wider bg-gray-100 p-1 rounded-lg uppercase">{event.type}</span>
      <h3 className="text-lg font-semibold text-black mt-2">{event.title}</h3>
      <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
        <Clock size={11} />
        <span>{event.duration}</span>
      </div>
    </div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

function Events() {

  const [activeFilter, setActiveFilter] = useState('All Events');

  const mappedCategory = categoryMap[activeFilter];
  const filteredEvents = activeFilter === 'All Events'
    ? ALL_EVENTS
    : ALL_EVENTS.filter(event => event.type === mappedCategory);
  const navigate = useNavigate();
  return (
   <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl    mx-auto ">
      <div className="  sm:max-w-5xl md:max-w-6xl w-[98%] lg:w-full text-center mx-1">

      {/* ── Hero Header ── */}
      <div className="mb-6 text-left">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          Connect, Learn, and Grow with the Community
        </h1>
        <p className="text-sm text-gray-500 mt-1 max-w-3xl">
          Join our vibrant Design community through engaging events and meetups. Network with industry experts,
          exchange ideas, and stay ahead of trends in design, technology, and user experience.
        </p>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150 ${
              activeFilter === tab
                ? 'bg-primary text-white border-gray-300'
                : 'bg-primary/10 text-primary border-gray-300 hover:border-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Upcoming Events ── */}
      <section className="mb-10 ">
        <h2 className="text-3xl text-left font-semibold text-gray-900 mb-5">Upcoming Events</h2>
        <div className="border bg-gray-50 border-gray-200 md:h-62  rounded-2xl overflow-hidden flex flex-col sm:flex-row">
          {/* Image */}
          <div className="sm:w-48 md:w-82 md:p-5 w-full h-54 sm:h-auto flex-shrink-0">
            <img
              src={UPCOMING_EVENT.image}
              alt={UPCOMING_EVENT.title}
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
          {/* Details */}
          <div className="p-5 flex flex-col  justify-center gap-2">
            <h3 className="text-base text-left font-bold text-gray-900">{UPCOMING_EVENT.title}</h3>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-gray-400" />
                {UPCOMING_EVENT.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} className="text-gray-400" />
                {UPCOMING_EVENT.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-gray-400" />
                {UPCOMING_EVENT.time}
              </span>
            </div>
            <p className="text-sm text-left text-gray-500 leading-relaxed max-w-md">
              {UPCOMING_EVENT.description}
            </p>
            <button
                onClick={() => navigate('/events-details')}
            className="mt-2 self-start flex items-center gap-1.5 bg-white border border-bg-gray-50 text-primary text-xs font-medium px-4 py-3 rounded-lg hover:bg-gray-50 transition">
              View Details <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>
      {/* ── All Events Grid ── */}
      <section>
        <h2 className="text-3xl text-left font-bold text-gray-900 mb-4">All Events</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
{/* Subscribe  */}
<Subscribet />
{/* Footer */}
<Footer />
      
    </div>
    </div>
  );
}

export default Events;