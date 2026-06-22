
import { useState, useEffect, useRef } from "react";
import { ArrowRight,Mail ,Phone,X } from "lucide-react";
import but from "../../assets/buttonOur.svg";
import {InboxAboutService} from "../../services/contact/contactService";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

const InboxAbout = () => {
   const location = useLocation();
  const firstInputRef = useRef(null);
  
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleSubmit = async () => {
  setLoading(true);
  try {
    await InboxAboutService({
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
    });
    setShowModal(true);
    setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
    
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    setLoading(false);
  }
};

    const [form, setForm] = useState({
    fullName: "", email: "", phone: "", subject: "", message: "",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
     useEffect(() => {
    if (location.state?.focusForm) {
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
        firstInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  return (
    <>
         {/* ── MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 h-[35%] w-full max-w-sm flex flex-col justify-center items-center gap-4 relative">
            {/* close button*/}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="text-black" size={24} />
            </button>
              <div className="flex flex-col items-center w-[90%] space-y-4 justify-end py-6">
            {/* icon email*/}
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <Mail size={28} className="text-white" />
            </div>

            {/*  text*/}
            <p className="text-lg font-semibold text-slate-800">{t("messages.thanksForRegistering")}</p>
              </div>
          </div>
        </div>
      )}
       {/* ── FORM + SIDEBAR ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start ">
          {/* Form */}
          <div id="contact-form" className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-7 md:pt-12 md:pb-8 sm:py-8  ">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-4">
              {[
                { label: t("forms.fullName"), name: "fullName", type: "text", placeholder: t("forms.fullNamePlaceholder"), ref: firstInputRef },
                { label: t("forms.email"), name: "email", type: "email", placeholder: t("forms.emailPlaceholder") },
                { label: t("forms.phone"), name: "phone", type: "text", placeholder: "(+00)" },
                { label: t("forms.subject"), name: "subject", type: "text", placeholder: t("forms.subject") },
              ].map(({ label, name, type, placeholder, ref }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className="text-[14px] text-start font-semibold text-slate-700 uppercase tracking-wide">{label}</label>
                  <input
                   ref={ref}
                    type={type} name={name} placeholder={placeholder}
                    value={form[name]} onChange={handleChange}
                    className="border border-slate-200 rounded-xl px-3.5 py-3 text-sm  outline-none focus:border-[#6C4EF3] focus:bg-white focus:ring-2 focus:ring-[#6C4EF3]/20 transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[13px] text-start font-semibold text-slate-700 uppercase  tracking-wide">{t("forms.myMessage")}</label>
              <textarea
                name="message" placeholder={t("forms.writeYourMessage")} rows={4}
                value={form.message} onChange={handleChange}
                className="border border-slate-200 min-h-[7.5rem] max-h-[8.8rem] rounded-xl px-3.5 py-2.5 text-sm  outline-none focus:border-[#6C4EF3] focus:bg-white focus:ring-2 focus:ring-[#6C4EF3]/20 transition-all resize-none"
              />
            </div>
          <button
  onClick={handleSubmit}
  disabled={loading}
  className="bg-primary hover:bg-primary/90 disabled:opacity-60 w-full md:w-[30%] sm:w-[30%] text-white rounded-2xl px-5 py-4.5 my-8 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
>
  {loading ? t("registerModal.sending") : <> {t("forms.sendMessage")} <ArrowRight size={14} /> </>}
</button>
          </div>

         {/* Sidebar */}
<div className="flex flex-col gap-3 border border-slate-200 rounded-2xl p-4 md:p-7 px-7 h-full">

  {/* Email Card */}
  <div className="bg-[#F6F8FB] rounded-2xl border border-slate-200 p-5 flex flex-col items-center justify-center text-center gap-2 min-h-[140px]">
    <Mail size={20} className=" bg-white w-12 text-black  h-12 p-3 rounded-xl flex items-center justify-center" />
    <p className="text-sm text-slate-700 font-medium">welcome@onsyntax.com</p>
  </div>

  {/* Phone Card */}
  <div className="bg-[#F6F8FB] rounded-2xl border border-slate-200 p-5 flex flex-col items-center justify-center text-center gap-2 min-h-[140px]">
    <Phone size={20} className=" bg-white w-12 text-black  h-12 p-3 rounded-xl flex items-center justify-center" />
    <p className="text-sm text-slate-700 font-medium">+01 00000 00000</p>
  </div>

  {/* Podcast Card */}
  <div className="bg-[#432772] rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-1 min-h-[100px]">
  <img src={but} alt={t("footer.podcast")} className="w-40 h-20 object-cover" />
    <a
      href="https://7orofcast.onsyntax.com/"
      target="_blank" rel="noopener noreferrer"
     className="bg-transparent text-white rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-1">
      {t("contact.ourPodcast")}
    </a>
  </div>

</div>
        </div>
    </>
  )
}

export default InboxAbout
