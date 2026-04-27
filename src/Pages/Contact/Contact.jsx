import { useState } from "react";
import { ArrowRight,Mail ,Phone } from "lucide-react";
// import Footer from "../../components/layout/Footer";
import hero from "../../assets/heroContact.svg";
import but from "../../assets/buttonOur.svg";
import Subscribe from "../../components/Ui/Subscribe";

const Contact = () => {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", subject: "", message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
      <div className="min-h-screen flex items-center justify-center max-w-6xl mx-auto ">
      
      <div className="  sm:max-w-5xl md:max-w-6xl lg:w-full text-center mx-1">

{/* ── HERO ── */}
<div className="rounded-3xl mt-5 flex items-stretch relative overflow-hidden max-h-[320px]">

  {/* Left — Text */}
  <div className="flex-1 bg-[#1c1c22] px-10 py-8 flex flex-col justify-center">
    <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
      Home <span className="text-slate-600 mx-1">›</span> Contact US
    </p>
    <h1 className="font-extrabold text-[2.6rem] text-white leading-[1.1] mb-3">
      Have an idea?<br />Let's connect.
    </h1>
    <p className="text-slate-400 text-sm mb-6">Get in Touch any time</p>
    <div className="flex gap-2">
      {[
        { label: "f",   bg: "#1877F2" },
        { label: "𝕏",   bg: "#1a1a1a" },
        { label: "in",  bg: "#0A66C2" },
        { label: "𝕏",   bg: "#1a1a1a" },
        { label: "in",  bg: "#0A66C2" },
      ].map((s, i) => (
          <a
          key={i}
          href="#"
          style={{ background: s.bg }}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold hover:opacity-75 transition-opacity"
        >
          {s.label}
        </a>
      ))}
    </div>
  </div>

  {/* Divider line */}
  <div className="w-px bg-white/10 flex-shrink-0" />

  {/* Right — Orbit Image */}
  <div className="bg-[#111118] flex items-center justify-center flex-shrink-0 w-[45%]">
    <img
      src={hero}
      alt="Contact Hero"
      className="w-full h-full object-cover"
      style={{ maxHeight: '280px' }}
    />
  </div>

</div>

      <div className=" mt-5 space-y-4">
        {/* ── FORM + SIDEBAR ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start ">
          {/* Form */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-7 md:pt-12 md:pb-8 sm:py-8  ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                { label: "Full name", name: "fullName", type: "text", placeholder: "Full Name" },
                { label: "Email", name: "email", type: "email", placeholder: "Full Name" },
                { label: "Phone", name: "phone", type: "text", placeholder: "(+00)" },
                { label: "Subject", name: "subject", type: "text", placeholder: "Subject" },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className="text-[14px] text-start font-semibold text-slate-700 uppercase tracking-wide">{label}</label>
                  <input
                    type={type} name={name} placeholder={placeholder}
                    value={form[name]} onChange={handleChange}
                    className="border border-slate-200 rounded-xl px-3.5 py-3 text-sm  outline-none focus:border-[#6C4EF3] focus:bg-white focus:ring-2 focus:ring-[#6C4EF3]/20 transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[12px] text-start font-semibold text-slate-700  tracking-wide">My Message</label>
              <textarea
                name="message" placeholder="Write your Message" rows={4}
                value={form.message} onChange={handleChange}
                className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm  outline-none focus:border-[#6C4EF3] focus:bg-white focus:ring-2 focus:ring-[#6C4EF3]/20 transition-all resize-none"
              />
            </div>
            <button className=" bg-primary   hover:bg-primary/90  text-white rounded-xl px-5 py-4 my-8 text-sm font-semibold flex items-center gap-2 transition-colors">
              Send Message <ArrowRight size={14} />
            </button>
          </div>

         {/* Sidebar */}
<div className="flex flex-col gap-3 border border-slate-200 rounded-2xl py-3 px-7 h-full">

  {/* Email Card */}
  <div className="bg-slate-100 rounded-2xl border border-slate-200 p-5 flex flex-col items-center justify-center text-center gap-2 min-h-[140px]">
    <Mail size={20} className="text-slate-500 bg-white w-12 text-black  h-12 p-3 rounded-xl flex items-center justify-center" />
    <p className="text-sm text-slate-700 font-medium">welcome@onsyntax.com</p>
  </div>

  {/* Phone Card */}
  <div className="bg-slate-100 rounded-2xl border border-slate-200 p-5 flex flex-col items-center justify-center text-center gap-2 min-h-[140px]">
    <Phone size={20} className="text-slate-500 bg-white w-12 text-black  h-12 p-3 rounded-xl flex items-center justify-center" />
    <p className="text-sm text-slate-700 font-medium">+01 00000 00000</p>
  </div>

  {/* Podcast Card */}
  <div className="bg-[#432772] rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-1 min-h-[100px]">
  <img src={but} alt="Podcast" className="w-40 h-20 object-cover" />
    <button className="bg-transparent text-white rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-1">
      Our Podcast
    </button>
  </div>

</div>
        </div>

 {/* ── COMMUNITY ── */}
<div className="flex gap-4 mb-5 md:my-15">

  {/* Card 1 — Image 47% */}
  <div className="rounded-2xl overflow-hidden relative flex flex-col justify-end p-5 min-h-[220px]"
    style={{ width: '47%' }}>
    <div className="absolute inset-0"
      style={{ background: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80') center/cover" }} />
    <div className="absolute inset-0 bg-black/50" />
    <h3 className="relative text-white font-bold text-lg mb-1">Connect with Communites</h3>
    <p className="relative text-slate-300 text-xs leading-relaxed">
      Discover communities and learn together, share question, problem, issues. Anything!
    </p>
  </div>

  {/* Card 2 — Join 35% */}
  <div className="bg-[#1e1e28] rounded-2xl flex flex-col items-center justify-center p-8 text-center relative min-h-[220px]"
    style={{ width: '33%' }}>
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 text-lg">
      +
    </div>
    <h3 className="font-bold text-2xl text-white my-8 leading-snug">
      Join Our<br />Community
    </h3>
    <button className="border border-white/30 text-white rounded-xl px-4 py-4 text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors">
      Join Now <ArrowRight size={14} />
    </button>
  </div>

  {/* Card 3 — WhatsApp 30% */}
  <div className="bg-[#F2F4F7] border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center relative min-h-[220px]"
    style={{ width: '25%' }}>
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-11 h-11 bg-primary rounded-full flex items-center justify-center">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#FCFCFD" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </div>
    <h3 className="font-bold text-2xl text-slate-900 my-8 leading-snug">
      Contact<br />via Whatsapp
    </h3>
    <button className="bg-[#AFD75A] text-white rounded-xl px-4 py-4 text-sm font-semibold flex items-center gap-2 hover:bg-[#1ebe5d] transition-colors">
      Send Message <ArrowRight size={14} />
    </button>
  </div>

</div>
       <Subscribe/>
      </div>
    </div>
    </div>
    
  );
};

export default Contact;