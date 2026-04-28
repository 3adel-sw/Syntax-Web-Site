/* eslint-disable react-hooks/static-components */
import { useState } from 'react';
import { MapPin, Calendar, Clock, Download, Share2, User, X } from 'lucide-react';
import Footer from '../../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { ALL_EVENTS, EventCard } from './Events';



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

const EXPERIENCE_OPTIONS = ['Junior', 'Senior', 'Lead', 'Director'];

// ─── Component ───────────────────────────────────────────────────────────────

const EventsDetails = () => {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', experience: '', country: '',
  });
  const [showSuccess, setShowSuccess] = useState(false); 

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true); 
  };


const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-2xl p-8 md:w-[400px] w-[250px] md:h-96  text-center shadow-2xl relative animate-in fade-in zoom-in duration-200 flex flex-col">

  {/* Close */}
  <button
    onClick={onClose}
    className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center transition"
  >
    <X size={18} className="text-gray-900 hover:text-red-500" />
  </button>

  {/* Icon — top */}
  <div className="flex-1 flex items-center justify-center">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-2 border-primary/10 scale-110" />
      <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-125" />
      <span className="absolute -top-1 -right-1 text-primary text-sm">✦</span>
      <span className="absolute top-1 -left-2 text-primary/50 text-xs">✦</span>
      <span className="absolute top-0 left-0 text-primary/90 text-xs">✦</span>
      <span className="absolute bottom-0 left-0 text-primary/50 text-xs">✦</span>
      <div className="w-full h-full rounded-full border-2 border-primary flex items-center justify-center bg-white">
        <svg width="62" height="62" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="#2D3389"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>

  {/* Text + Button — bottom */}
  <div className="flex flex-col items-center my-4 md:my-1">
    <p className="md:text-base text-sm font-bold text-gray-900 mb-1">
      🎉 Registration Successful
    </p>
    <p className="text-xs text-gray-400 mb-4">
      Great! You're now registered for the event.
    </p>
    <button
      onClick={onClose}
      className="w-42 h-12 bg-primary hover:bg-primary/90 text-white text-sm font-semibold py-2.5 rounded-xl transition"
    >
      OK
    </button>
  </div>

</div>
  </div>
);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-start justify-center max-w-6xl mx-auto px-4 py-10">
      <div className="sm:max-w-5xl md:max-w-6xl lg:w-full text-left mx-1">
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8 border border-gray-200 rounded-2xl p-4 my-8 ">

  {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
          {/* ── LEFT: Content + Form ── */}
          <div>
             {/* ── Title ── */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {EVENT.title}
        </h1>
        {/* ── Meta Bar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-gray-500">
          <span className="flex items-center gap-1"><MapPin size={12} /> {EVENT.location}</span>
          <span className="w-px h-3 bg-gray-300" />
          <span className="flex items-center gap-1"><Calendar size={12} /> {EVENT.date}</span>
          <span className="w-px h-3 bg-gray-300" />
          <span className="flex items-center gap-1"><Clock size={12} /> {EVENT.time}</span>
          <span className="w-px h-3 bg-gray-300" />
          <span className="flex items-center gap-1"><Download size={12} /> {EVENT.mode}</span>
          <span className="w-px h-3 bg-gray-300" />
          <button className="flex items-center gap-1 hover:text-gray-800 transition">
            <Share2 size={12} /> Share
          </button>
        </div>

            {/* Event Image (mobile only) */}
            <div className="md:hidden rounded-2xl overflow-hidden mb-6 h-48">
              <img src={EVENT.image} alt="event" className="w-full h-full object-cover" />
            </div>

            {/* Event Description */}
            <h2 className="text-sm font-bold text-gray-900 mb-2">Event Description</h2>
            {EVENT.description.split('\n\n').map((para, i) => (
              <p key={i} className="text-xs text-gray-500 leading-relaxed mb-4">{para}</p>
            ))}

            {/* More About Speakers */}
            <h2 className="text-sm font-bold text-gray-900 mb-2">More About Speakers</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-8">{EVENT.aboutSpeakers}</p>

            {/* ── Registration Form ── */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Registration</h2>
            <div className="space-y-3 bg-gray-50 rounded-2xl p-5">
              {/* Full Name */}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Full name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-indigo-400 transition"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-3 ">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              {/* Experience + Country */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Experience Level</label>
                  <div className="relative">
                    <select
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-400 focus:outline-none focus:border-indigo-400 transition bg-white"
                    >
                      <option value="" disabled>Junior, Senior, Lead, Director</option>
                      {EXPERIENCE_OPTIONS.map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Country</label>
                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition mt-2"
              >
                Register Now
                <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
              </button>
            </div>
          </div>

          {/* ── RIGHT: Event Card + Speakers ── */}
          <div className="space-y-6">
            {/* Event Poster Card */}
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