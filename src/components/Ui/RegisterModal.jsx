import { useState } from 'react';
import { X } from 'lucide-react';

const RegisterModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: '', phone: '', comment: '' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Register in Course</h2>
          <button
            aria-label="Close Menu"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-left text-sm font-medium text-gray-700 mb-1">
            Any Comment or Additional Question?
          </label>
          <textarea
            placeholder="Placeholder"
            rows={4}
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <button className="bg-primary flex items-center justify-start text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition">
          Book a call
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;