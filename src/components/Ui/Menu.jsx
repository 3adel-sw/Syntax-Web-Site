import { useState, useEffect } from "react";
import { X, Menu as MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SlSocialYoutube } from "react-icons/sl";
import LogoMenu from "../../assets/LogoMenu.svg"
import { BsArrowUpRightCircle } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import LogoMenuMobile from "../../assets/LogoMenuMobile.svg";

const projects = [
  {
    id: 1,
    name: "Syntax Academy",
    desc: "Learn with expert-led courses",
    path: "/courses",
    icon: (
      <img src={LogoMenu} alt="LogoMenu" />
    ),
  },
  {
    id: 2,
    name: "Syntax Meetup",
    desc: "Connect with designers and innovators.",
    path: "/events",
    active: true,
    icon: (
      <img src={LogoMenu} alt="LogoMenu" />
    ),
  },
  {
    id: 3,
    name: "Syntax Community",
    desc: "Engage, share, and grow together.",
    path: "/community",
   icon: (
      <img src={LogoMenu} alt="LogoMenu" />
    ),
  },
  {
    id: 4,
    name: "Syntax Podcast",
    desc: "UX insights from industry leaders.",
    path: "/podcast",
   icon: (
      <img src={LogoMenu} alt="LogoMenu" />
    ),
  },
];

const pages = [
  { label: "About Syntax", path: "/about" },
  { label: "Contact US", path: "/contact" },
  { label: "Resources", path: "/resources" },
  { label: "Blogs", path: "/blogs" },
  { label: "B2B Training", path: "/b2b" },
];



const Menu = ({ isScrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // 
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ── Button Menu  */}
      <button
        className={`relative md:w-26 md:h-11 sm:w-22 sm:h-8 w-10 px-2 h-8 text-xs
          flex md:gap-4 gap-1 items-center justify-center text-white rounded-xl
          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors
          ${isScrolled ? "bg-gray-500" : "bg-primary"}`}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={16} /> : <MenuIcon size={16} />}
        <span className="hidden md:inline text-sm">Menu</span>
      </button>

      {/* ── Overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ══════════════════════
          DESKTOP DROPDOWN
      ══════════════════════ */}
      <div
        className={`
          hidden md:flex
          fixed right-2 top-0 z-50
          bg-[#FFFFFF]  shadow-2xl border border-[#B2B9C6]  
          p-6 pb-16 gap-6 w-[70%] h-full
          transition-all duration-200 origin-top-right
          ${menuOpen  
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          <X size={24} />
        </button>

        {/* Our Projects */}
        <div className="flex-1">
          <p className="text-[11px] text-gray-400 tracking-widest uppercase mb-3">Our Projects</p>
          <div className="flex flex-col gap-2">
            {projects.map((p) => (
              <Link
                key={p.id}
                to={p.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors
                  ${location.pathname === p.path || p.active
                    ? "bg-primary text-white"
                    : "border border-gray-100 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                    ${location.pathname === p.path || p.active ? "bg-white/20" : "bg-gray-100"}`}>
                    <span className={location.pathname === p.path || p.active ? "text-white" : "text-gray-600"}>
                      {p.icon}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium leading-none mb-1
                      ${location.pathname === p.path || p.active ? "text-white" : "text-gray-800"}`}>
                      {p.name}
                    </p>
                    <p className={`text-xs
                      ${location.pathname === p.path || p.active ? "text-white/75" : "text-gray-500"}`}>
                      {p.desc}
                    </p>
                  </div>
                </div>
                {location.pathname === p.path || p.active ? (
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <BsArrowUpRightCircle  color="white" />
                  </div>
                ) : (
                  <FaArrowRightLong />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-100 self-stretch" />

        {/* Pages */}
        <div className="w-[50%] shrink-1">
          <p className="text-[11px] text-gray-400 tracking-widest uppercase mb-3">Pages</p>
          <div className="flex flex-col gap-1">
            {pages.map((pg) => (
              <Link
                key={pg.path}
                to={pg.path}
                onClick={() => setMenuOpen(false)}
                className={`py-1.5 text-sm transition-colors
                  ${location.pathname === pg.path
                    ? "text-primary font-medium"
                    : "text-gray-800 hover:text-primary"
                  }`}
              >
                {pg.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer row */}
        <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between pt-4 border-t border-gray-100">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <SlSocialYoutube />
            Youtube Channel
          </a>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-800 hover:text-primary transition-colors"
          >
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ══════════════════════
          MOBILE SLIDE-IN
      ══════════════════════ */}
      <div
        className={`
          md:hidden fixed right-0 top-0 h-full w-full z-50
          bg-white shadow-2xl
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className=" h-full flex flex-col overflow-y-auto">
          <div className=" flex justify-between  bg-primary ">
            <img src={LogoMenuMobile} alt="LogoMenuMobile " />
          <button
            className="self-end text-gray-400 hover:text-gray-700 mb-4 transition-colors"
            onClick={() => setMenuOpen(false)}
            >
            <X size={22} />
          </button>
            </div>

          <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-3">Our Projects</p>
          <div className="flex flex-col gap-2 mb-5">
            {projects.map((p) => (
              <Link
                key={p.id}
                to={p.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-colors
                  ${location.pathname === p.path || p.active
                    ? "bg-primary text-white"
                    : "border border-gray-100 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                    ${location.pathname === p.path || p.active ? "bg-white/20" : "bg-gray-100"}`}>
                    <span className={location.pathname === p.path || p.active ? "text-white" : "text-gray-600"}>
                      {p.icon}
                    </span>
                  </div>
                  <div>
                    <p className={`text-xs font-medium
                      ${location.pathname === p.path || p.active ? "text-white" : "text-gray-800"}`}>
                      {p.name}
                    </p>
                    <p className={`text-[10px]
                      ${location.pathname === p.path || p.active ? "text-white/75" : "text-gray-500"}`}>
                      {p.desc}
                    </p>
                  </div>
                </div>
                <BsArrowUpRightCircle color={location.pathname === p.path || p.active ? "white" : "#9ca3af"} />
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-3">Pages</p>
            <div className="flex flex-col gap-1">
              {pages.map((pg) => (
                <Link
                  key={pg.path}
                  to={pg.path}
                  onClick={() => setMenuOpen(false)}
                  className={`py-1.5 text-sm transition-colors
                    ${location.pathname === pg.path
                      ? "text-primary font-medium"
                      : "text-gray-800 hover:text-primary"
                    }`}
                >
                  {pg.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile footer */}
          {/* <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-3">
            
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
              </svg>
              Youtube Channel
            </a>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-800 hover:text-primary transition-colors"
            >
              Get in Touch
              <GoArrowUpRight />
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Menu;