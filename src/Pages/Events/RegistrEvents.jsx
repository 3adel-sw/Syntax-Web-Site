/* eslint-disable react-hooks/static-components */


import { useState } from 'react';
import {  X } from 'lucide-react';

const EXPERIENCE_OPTIONS = ['Junior', 'Senior', 'Lead', 'Director'];
const RegistrEvents = () => {
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

    
  return (
   <div className="space-y-3 bg-gray-100 rounded-2xl p-5">
              {/* Full Name */}
              <div>
                <label className="text-xs md:text-sm text-left text-gray-500 mb-1 block">Full name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-indigo-400 transition"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-3 ">
                <div>
                  <label className="text-xs md:text-sm text-left  text-gray-500 mb-1 block">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border border-gray-200 rounded-lg px-3 bg-white py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
                <div>
                  <label className="text-xs md:text-sm text-left  text-gray-500 mb-1 block">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              {/* Experience + Country */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs md:text-sm text-left  text-gray-500 mb-1 block">Experience Level</label>
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
                  <label className="text-xs md:text-sm text-left  text-gray-500 mb-1 block">Country</label>
                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white text-sm font-semibold px-6 py-3 md:mt-2.5mt-3 rounded-2xl transition my-4"
              >
                Register Now
                <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
              </button>
               
                {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
            </div>
  )
}

export default RegistrEvents