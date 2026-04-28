/* eslint-disable react-hooks/static-components */

import { MapPin, Calendar, Clock, Download, Share2, User } from 'lucide-react';
import Footer from '../../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { ALL_EVENTS, EventCard } from './Events';
import RegistrEvents from './RegistrEvents';
import VideosYouTube from './VideosYouTube';
import EventGallery from './EventGallery';



// ─── Mock Data ───────────────────────────────────────────────────────────────

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



// ─── Component ───────────────────────────────────────────────────────────────

const EventsDetails = () => {


  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-start justify-center max-w-6xl mx-auto px-4 py-10">
      <div className="sm:max-w-5xl md:max-w-6xl lg:w-full text-left mx-1">
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 border border-gray-200 rounded-2xl p-4 my-8 ">


          {/* ── LEFT: Content + Form ── */}
          <div>
             {/* ── Title ── */}
        <h1 className="text-4xl font-semibold text-gray-900 mb-3">
          {EVENT.title}
        </h1>
        {/* ── Meta Bar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-gray-500">
          <span className="flex items-center gap-1 px-3 py-2.5 border border-gray-100 rounded-lg"><MapPin size={12} /> {EVENT.location}</span>
          <span className="w-px h-3 bg-gray-300" />
          <span className="flex items-center gap-1 px-3 py-2.5 border border-gray-100 rounded-lg"><Calendar size={12} /> {EVENT.date}</span>
          <span className="w-px h-3 bg-gray-300" />
          <span className="flex items-center gap-1 px-3 py-2.5 border border-gray-100 rounded-lg"><Clock size={12} /> {EVENT.time}</span>
          <span className="w-px h-3 bg-gray-300" />
          <button className="flex items-center gap-1 px-3 py-2.5 border border-gray-100 rounded-lg hover:text-gray-800"><Download size={12} /> {EVENT.mode}</button>
          
          <button className="flex items-center px-3 py-2.5 border border-gray-100 rounded-lg gap-1 hover:text-gray-800 transition">
            <Share2 size={12} /> Share
          </button>
        </div>

            {/* Event Image (mobile only) */}
            <div className="md:hidden rounded-2xl overflow-hidden mb-6 h-48">
              <img src={EVENT.image} alt="event" className="w-full h-full object-cover" />
            </div>
            {/* Videos */}
            <VideosYouTube />
            {/* Event Description */}
            <h2 className="text-sm font-bold text-gray-900 mb-2">Event Description</h2>
            {EVENT.description.split('\n\n').map((para, i) => (
              <p key={i} className="text-xs text-gray-500 leading-relaxed mb-4">{para}</p>
            ))}

            {/* More About Speakers */}
            <h2 className="text-sm font-bold text-gray-900 mb-2">More About Speakers</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-8">{EVENT.aboutSpeakers}</p>

            {/* ── Registration Form ── */}
            {/* <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Registration</h2> */}
            {/* <RegistrEvents /> */}
          
            <EventGallery />
          </div>

          {/* ── RIGHT: Event Card + Speakers ── */}
          <div className="space-y-6">
            {/* Event Poster Card */}
            <button
              className='py-2.5 px-4 text-sm flex items-center justify-center gap-2 border border-primary bg-primary rounded-lg hover:bg-primary/90 w-full text-white transition'
            >
              Watch Session
               <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            </button>

            <div className="rounded-2xl overflow-hidden hidden md:block">
              <img
                src={EVENT.image}
                alt="event poster"
                className="w-full h-60 object-cover rounded-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg,#312e81,#1e1b4b)';
                  e.target.parentElement.style.height = '12rem';
                }}
              />
            </div>

            {/* Speakers */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Speakers</h2>
              <div className="space-y-3">
                {SPEAKERS.map((s) => (
                  <div
                    key={s.id}
                    className="flex bg-gray-100 items-center gap-3 border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition"
                  >
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
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
                      <p className="text-sm font-semibold text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
                {/* Other Events */}
                <div className="my-10">
        <div className="flex items-center justify-between md:my-6 sm:my-4 mb-3">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Other Events</h2>
          <button onClick={() => navigate('/events')}
           className="text-sm text-primary border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {ALL_EVENTS.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
              </div>
        {/* ── Footer ── */}
        <Footer />
      </div>
    </div>
  );
};

export default EventsDetails;