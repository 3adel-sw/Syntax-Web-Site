import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
// import Footer from "../../components/layout/Footer";
import hero from "../../assets/heroContact.svg";


const Contact = () => {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", subject: "", message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
     <div className=" min-h-screen flex items-center justify-center max-w-6xl mx-auto ">
      
      <div className=" sm:max-w-5xl md:max-w-5xl lg:w-full text-center ">


      {/* ── HERO ── */}
      <div className="bg-[#111118] rounded-4xl mx-5 mt-5 flex items-center justify-between relative overflow-hidden min-h-[220px]">
        <div>
          <p className="text-xs text-slate-500 mb-3">Home › Syntax Loft</p>
          <h1 className="font-extrabold text-4xl text-white leading-tight mb-2">
            Have an idea?<br />Let's connect.
          </h1>
          <p className="text-slate-400 text-sm mb-4">Get in Touch any time</p>
          <div className="flex gap-2">
            {["in", "𝕏", "f", "▶", "ig"].map((s) => (
              <a key={s}
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white text-xs hover:bg-[#6C4EF3] transition-colors"
              >{s}</a>
            ))}
          </div>
        </div>

        {/* Orbit decoration */}
   
      <img src={hero} className="img-fluid rounded-top" alt="Contact Hero" />
 
   
      </div>

      <div className="mx-5 mt-5 space-y-4">

        {/* ── FORM + SIDEBAR ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

          {/* Form */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                { label: "Full name", name: "fullName", type: "text", placeholder: "Full Name" },
                { label: "Email", name: "email", type: "email", placeholder: "Full Name" },
                { label: "Phone", name: "phone", type: "text", placeholder: "(+00)" },
                { label: "Subject", name: "subject", type: "text", placeholder: "Subject" },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{label}</label>
                  <input
                    type={type} name={name} placeholder={placeholder}
                    value={form[name]} onChange={handleChange}
                    className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50 outline-none focus:border-[#6C4EF3] focus:bg-white focus:ring-2 focus:ring-[#6C4EF3]/20 transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">My Message</label>
              <textarea
                name="message" placeholder="Write your Message" rows={4}
                value={form.message} onChange={handleChange}
                className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50 outline-none focus:border-[#6C4EF3] focus:bg-white focus:ring-2 focus:ring-[#6C4EF3]/20 transition-all resize-none"
              />
            </div>
            <button className="bg-[#6C4EF3] hover:bg-[#5038d0] text-white rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center gap-2 transition-colors">
              Send Message <Send size={14} />
            </button>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-3.5">
            {[
              { icon: "✉", label: "Email", value: "welcome@syntaxloft.com" },
              { icon: "📞", label: "Phone", value: "+010000 000000" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#6C4EF3] rounded-xl flex items-center justify-center text-white text-base flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">{label}</p>
                  <p className="text-sm font-semibold text-slate-800">{value}</p>
                </div>
              </div>
            ))}
            <div className="bg-[#6C4EF3] rounded-2xl p-4 text-center text-white">
              <p className="text-lg font-extrabold mb-1">سينتكس لوفت</p>
              <p className="text-xs opacity-80 mb-3">Our Podcast</p>
              <button className="bg-white text-[#6C4EF3] rounded-lg px-4 py-1.5 text-xs font-bold">
                Our Podcast
              </button>
            </div>
          </div>
        </div>

        {/* ── COMMUNITY ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="rounded-2xl overflow-hidden relative min-h-[160px] flex flex-col justify-end p-5"
            style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)" }}>
            <div className="absolute inset-0 opacity-30"
              style={{ background: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80') center/cover" }} />
            <h3 className="relative text-white font-bold text-base mb-1">Connect with Communites</h3>
            <p className="relative text-slate-400 text-xs leading-relaxed">
              Discover communities of amazing coders, designers, and creators.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-[#111118] rounded-2xl flex flex-col items-center justify-center p-6 text-center min-h-[160px]">
            <div className="w-11 h-11 bg-[#6C4EF3] rounded-full flex items-center justify-center text-white text-xl mb-3">💬</div>
            <h3 className="text-white font-bold text-sm mb-3">Join Our<br />Community</h3>
            <button className="bg-[#6C4EF3] text-white rounded-lg px-5 py-2 text-xs font-semibold flex items-center gap-1">
              Join Now <ArrowRight size={12} />
            </button>
          </div>
          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center min-h-[160px]">
            <div className="w-11 h-11 bg-[#25d366] rounded-full flex items-center justify-center text-white text-xl mb-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h3 className="font-bold text-sm mb-1">Contact<br />via Whatsapp</h3>
            <p className="text-slate-400 text-xs mb-3">Send us a message anytime</p>
            <button className="bg-[#6C4EF3] text-white rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1">
              Send Message <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* ── SUBSCRIBE ── */}
        <div className="bg-[#6C4EF3] rounded-2xl p-9 text-center mb-5">
          <h2 className="text-white font-extrabold text-2xl mb-2">Subscribe now!</h2>
          <p className="text-purple-200 text-sm mb-5 max-w-md mx-auto">
            Don't miss the opportunity to be part of our active community in the Creativs field. Subscribe now and start your journey towards excellence!
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email" placeholder="Your E-Mail"
              className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none border-none"
            />
            <button className="bg-white text-[#6C4EF3] rounded-xl px-4 py-2.5 text-sm font-bold whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>

      </div>
    </div>
    </div>
    
  );
};

export default Contact;