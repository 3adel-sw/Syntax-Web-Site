import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { registerInCourse } from '../../services/courses/registrationService';
import { useTranslation } from 'react-i18next';

const RegisterModal = ({ isOpen, onClose, courseName }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      setError(t('registerModal.required'));
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const data = {
        name: form.name,
        phone: form.phone,
        subject: courseName,
        message: form.message,
      }
      await registerInCourse(data);
      setSuccess(true);
      setForm({ name: '', phone: '', subject: '', message: '' });
      setTimeout(() => { onClose(); setSuccess(false); }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || t('messages.registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">{t('registerModal.title')}</h2>
          <button
            aria-label={t('registerModal.closeMenu')}
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center">
            {t('registerModal.success')}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-start text-sm font-medium text-gray-700 mb-1">{t('registerModal.name')}</label>
            <input
              type="text"
              placeholder={t('registerModal.name')}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-start text-sm font-medium text-gray-700 mb-1">{t('registerModal.phone')}</label>
            <input
              type="tel"
              placeholder={t('registerModal.phone')}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-start text-sm font-medium text-gray-700 mb-1">{t('registerModal.courseName')}</label>
          <input
            type="text"
            placeholder={t('registerModal.coursePlaceholder')}
            disabled
            value={courseName}
            // onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div className="mb-6">
          <label className="block text-start text-sm font-medium text-gray-700 mb-1">
            {t('registerModal.question')}
          </label>
          <textarea
            placeholder={t('registerModal.messagePlaceholder')}
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary flex items-center justify-center gap-2 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? t('registerModal.sending') : t('registerModal.bookCall')}
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
