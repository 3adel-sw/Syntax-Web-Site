import { useState } from "react";
import { ArrowRight,Mail ,Phone } from "lucide-react";
// import Footer from "../../components/layout/Footer";
import but from "../../assets/buttonOur.svg";
import cardplus from "../../assets/cardplus.svg";
import Subscribe from "../../components/Ui/Subscribe";
import CardContact from "../../components/Ui/CardContact";
import Footer from "../../components/layout/Footer";
import { FaWhatsapp } from "react-icons/fa";
import { GoPlus } from "react-icons/go";



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
<CardContact/>
      <div className=" mt-5 space-y-4 w-full ">
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
<div className="flex gap-4 mb-5 md:my-15 flex-col md:flex-row">

  {/* Card 1 — Image 47% */}
  <div className="rounded-2xl md:w-[47%] w-full overflow-hidden relative flex flex-col justify-end p-5 min-h-[220px]"
    >
    <div className="absolute inset-0"
      style={{ background: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80') center/cover" }} />
    <div className="absolute inset-0 bg-black/50" />
    <h3 className="relative text-white font-bold text-lg mb-1">Connect with Communites</h3>
    <p className="relative text-slate-300 text-xs leading-relaxed">
      Discover communities and learn together, share question, problem, issues. Anything!
    </p>
  </div>

  {/* Card 2 — Join 35% */}
  <div className="bg-[#202020] rounded-2xl md:w-[33%] w-full overflow-hidden flex flex-col items-center justify-center p-8 text-center relative min-h-[220px]"
    >
    {/* Icon with lines */}
  <div className="relative flex items-center justify-center w-full mb-2 -mt-2  ">
              <img src={cardplus} alt="cardplus" className="absolute w-full top-0 -right-8 rounded-2xl" />
    {/* Left line */}
    <div className="flex-1 w-full h-px bg-[#3E3E3F]" />

    {/* Icon circle */}
    <div className="relative flex-shrink-0">
      {/* Outer light ring */}
      <div className="w-16 h-16 rounded-full border-2 border-[#3E3E3F] flex items-center justify-center">
        {/* Inner dark circle */}
        <div className="w-12 h-12 bg-[#393939] rounded-full flex items-center justify-center">
          <GoPlus  size={24} className="text-white/80 " />
        </div>
      </div>
    </div>

    {/* Right line */}
    <div className="flex-1 w-full h-px bg-[#3E3E3F]" />
  </div>
    <h3 className="font-bold text-2xl text-white my-8 leading-snug">
      Join Our<br />Community
    </h3>
    <button className="border border-white/30 text-white rounded-xl px-4 py-4 text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors">
      Join Now <ArrowRight size={14} />
    </button>
  </div>

 {/* Card 3 — WhatsApp */}
<div className="bg-[#F2F4F7] border md:w-[25%] w-full border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center relative min-h-[220px]">
  
  {/* Icon with lines */}
  <div className="relative flex items-center justify-center w-full mb-2 -mt-2 w-full">
    
    {/* Left line */}
    <div className="flex-1 w-full h-px bg-[#D0D5DD]" />

    {/* Icon circle */}
    <div className="relative flex-shrink-0">
      {/* Outer light ring */}
      <div className="w-16 h-16 rounded-full border-2 border-[#D0D5DD] flex items-center justify-center">
        {/* Inner dark circle */}
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <FaWhatsapp size={34} className="text-white" />
        </div>
      </div>
    </div>

    {/* Right line */}
    <div className="flex-1 w-full h-px bg-[#D0D5DD]" />
  </div>

  <h3 className="font-bold text-2xl text-slate-900 my-8 leading-snug">
    Contact<br />via Whatsapp
  </h3>

  <button className="bg-[#AFD75A] text-white rounded-2xl w-full px-4 py-4 text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-colors">
    Send Message <ArrowRight size={14} />
  </button>

</div>

</div>
       <Subscribe/>
      </div>
      <Footer/>
    </div>
    </div>
    
  );
};

export default Contact;