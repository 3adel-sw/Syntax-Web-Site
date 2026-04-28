import { FaFigma, FaFacebook, FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import hero from "../../assets/heroContact.svg";

const CardContact = () => {
  const socials = [
    { label: <FaFigma size={18} />,    bg: "#FFFFFF" },
    { label: <FaFacebook size={18} />, bg: "#FFFFFF" },
    { label: <FaGithub size={18} />,   bg: "#FFFFFF" },
    { label: <FaTwitter size={18} />,  bg: "#FFFFFF" },
    { label: <FaInstagram size={18} />,bg: "#FFFFFF" },
    { label: <FaLinkedin size={18} />, bg: "#FFFFFF" },
  ];

  return (
    <div className="rounded-3xl w-[99%] md:w-full mt-6 md:mt-10 flex flex-col md:flex-row items-stretch overflow-hidden md:h-[32rem]">

      {/* Left — Text */}
      <div className="flex flex-col justify-center items-center md:items-start px-6 md:px-16 py-10 bg-[#282828] w-full md:w-[52%] text-center md:text-left">
        
        <p className="text-xs text-slate-300 mb-3 flex items-center gap-1">
          Home <span className="text-slate-400 mx-1 text-base">›</span> Contact US
        </p>

        <h1 className="font-bold text-2xl sm:text-3xl md:text-[2.8rem] text-white leading-[1.15] mb-3">
          Have an idea?<br />Let's connect.
        </h1>

        <p className="text-slate-300 font-semibold text-base md:text-xl mb-6">
          Get in Touch any time
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
      <div className="bg-[#202020] w-full md:flex-1 h-56 sm:h-72 md:h-auto">
        <img
          src={hero}
          alt="Contact Hero"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
};

export default CardContact;