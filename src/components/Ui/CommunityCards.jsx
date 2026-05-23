
import cardplus from "../../assets/cardplus.svg";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
const CommunityCards = () => {
  const navigate = useNavigate(); 
  const { t } = useTranslation();
  return (
    <>
    <div className="flex gap-4 mb-5 mt-12 md:my-15 flex-col md:flex-row">

  {/* Card 1 — Image 47% */}
  <div className="rounded-2xl md:w-[47%] w-full overflow-hidden relative flex flex-col justify-center  p-5 min-h-[220px]"
    >
    <div className="absolute inset-0"
      style={{ background: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80') center/cover" }} />
    <div className="absolute inset-0 bg-black/50" />
    <h3 className="relative text-start text-white font-semibold  text-3xl md-mb-3  md:top-13 top-6">{t("community.connectTitle")}</h3>
    <p className="relative text-start text-slate-300 text-base leading-relaxed md:top-14 top-7">
      {t("community.connectDescription")}
    </p>
  </div>

  {/* Card 2 — Join 35% */}
  <div className="bg-[#202020] rounded-2xl md:w-[33%] w-full overflow-hidden flex flex-col items-center justify-center p-8 text-center relative min-h-[220px]"
    >
    {/* Icon with lines */}
  <div className="relative flex items-center justify-center w-full mb-2 -mt-2  ">
              <img
                loading="eager"
            fetchPriority="high"
              src={cardplus} alt={t("community.joinNow")} className="absolute w-full top-0 -right-8 rounded-2xl" />
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
      {t("community.joinOur")}<br />{t("community.community")}
    </h3>
   <a
  href="https://www.facebook.com/groups/onsyntax"
  target="_blank"
  rel="noopener noreferrer"
  className="z-20 border-white/30 border-2 text-white rounded-xl px-4 py-4 text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors">
  {t("community.joinNow")} <ArrowRight size={14} />
</a>
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
<div
  onClick={() => window.open("https://api.whatsapp.com/send/?phone=%2B201141554176&text&type=phone_number&app_absent=0", "_blank")}
  className="w-12 h-12 bg-primary rounded-full flex items-center justify-center cursor-pointer">
  <FaWhatsapp size={34} className="text-white" />
</div>
      </div>
    </div>

    {/* Right line */}
    <div className="flex-1 w-full h-px bg-[#D0D5DD]" />
  </div>

  <h3 className="font-bold text-2xl text-slate-900 my-8 leading-snug">
    {t("community.contact")}<br />{t("community.viaWhatsapp")}
  </h3>

 <button
  onClick={() => window.open("https://api.whatsapp.com/send/?phone=%2B201141554176&text&type=phone_number&app_absent=0", "_blank")}
  className="bg-[#AFD75A] text-white rounded-2xl w-full px-4 py-4 text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-colors">
  {t("forms.sendMessage")} <ArrowRight size={14} />
</button>

</div>

</div>
    </>
  )
}

export default CommunityCards
