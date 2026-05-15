import {  FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { ImBehance2 } from "react-icons/im";
import hero from "../../../public/images/heroContact.webp";
import { useTranslation } from "react-i18next";

const CardContact = () => {
  const { t } = useTranslation();
  const socials = [
    { label: <CiYoutube size={18} />,    bg: "#FFFFFF" ,link:"https://x.com/onsyntax0"},
    { label: <FaFacebook size={18} />, bg: "#FFFFFF" ,link:"https://www.facebook.com/onsyntax0/"},
    { label: <FaTwitter size={18} />,  bg: "#FFFFFF" ,link:"https://x.com/onsyntax0"},
    { label: <FaInstagram size={18} />,bg: "#FFFFFF" ,link:"https://www.instagram.com/onsyntax0/"},
    { label: <FaLinkedin size={18} />, bg: "#FFFFFF" ,link:"https://www.linkedin.com/company/onsyntax/"},
    { label: <ImBehance2 size={18} />, bg: "#FFFFFF" ,link:"https://www.behance.net/onsyntax/"},
  ];

  return (
    <div className="rounded-4xl w-[99%] md:w-full mt-12 md:mt-14 flex flex-col md:flex-row items-stretch overflow-hidden md:h-[32rem]">

      {/* Left — Text */}
      <div className="flex flex-col justify-center items-center md:items-start px-6 md:px-16 py-10 bg-[#282828] w-full md:w-[52%] text-center md:text-start">
        
        <p className="text-xs text-slate-300 mb-3 flex items-center gap-1">
          {t("nav.home")} <span className="text-slate-400 mx-1 text-base">›</span> {t("menu.pagesList.contactUs")}
        </p>

        <h1 className="font-bold text-2xl sm:text-3xl md:text-[2.8rem] text-white leading-[1.15] mb-3">
          {t("contact.haveIdea")}<br />{t("contact.letsConnect")}
        </h1>

        <p className="text-slate-300 font-semibold text-base md:text-xl mb-6">
          {t("contact.getInTouchAnyTime")}
        </p>

        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          {socials.map((s, i) => (
            <a
              key={i}
              href="#"
              style={{ background: s.bg }}
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Right — Image */}
      <div className="bg-[#202020] w-full md:flex-1 md:h-56 h-full sm:h-72 md:h-auto">
        <img
        loading="eager"
        fetchPriority="high"
          src={hero}
          alt={t("contact.heroAlt")}
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
};

export default CardContact;
