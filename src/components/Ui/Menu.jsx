import { useState, useEffect } from "react";
import { X, Menu as MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoMuneP from "../../assets/logoMuneP.svg"
import LogoMenuWhite from "../../assets/LogoMenuWhite.svg"
import { BsArrowUpRightCircle } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import LogoMenuMobile from "../../assets/LogoMenuMobile.svg";
import { useTranslation } from "react-i18next";

const projects = [
  { id: 1, nameKey: "menu.projects.academy.name", descKey: "menu.projects.academy.desc", path: "/courses" },
  { id: 2, nameKey: "menu.projects.meetup.name", descKey: "menu.projects.meetup.desc", path: "/events", active: true },
  { id: 3, nameKey: "menu.projects.community.name", descKey: "menu.projects.community.desc", path: "https://www.facebook.com/groups/eguxmeetup/?ref=share" },
  { id: 4, nameKey: "menu.projects.podcast.name", descKey: "menu.projects.podcast.desc", path: "https://7orofcast.onsyntax.com/" },
];
const pages = [
  { labelKey: "menu.pagesList.aboutSyntax", path: "/about" },
  { labelKey: "menu.pagesList.contactUs", path: "/contact" },
  { labelKey: "menu.pagesList.resources", path: "/resources" },
  { labelKey: "menu.pagesList.blogs", path: "/blogs" },
  { labelKey: "menu.pagesList.b2bTraining", path: "/b2b" },
  // { labelKey: "menu.pagesList.events", path: "/events" }
 
];



const Menu = ({ isScrolled }) => {
  const { t } = useTranslation();
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
        <span className="hidden md:inline text-sm">{t("menu.menu")}</span>
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
          bg-[#FFFFFF]   shadow-2xl  border-l border-t  border-[#B2B9C6]  
          p-6 pb-16 gap-6 md:w-[70%]  w-full lg:w-[68%]  h-full
          transition-all duration-200 origin-top-right
          ${menuOpen  
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-[#1D1C20] hover:text-red-500 transition-colors"
          onClick={() => setMenuOpen(false)}
          aria-label={t("registerModal.closeMenu")}
        >
          <X size={28} />
        </button>

        {/* Our Projects */}
        <div className="flex-1">
          <p className="text-xl text-[#1D1C20] font-semibold  tracking-widest  mb-3">{t("menu.ourProjects")}</p>
          <div className="flex flex-col gap-2">
            {projects.map((p) => {
  const isActive = location.pathname === p.path || 
  (!projects.some(p => location.pathname === p.path) && p.active);
  return (
    <Link
      key={p.id}
      to={p.path}
      onClick={() => setMenuOpen(false)}
      className={`flex items-center justify-between gap-2 lg:px-4 px-1 md:px-3 sm:px-2 sm:py-2 md:py-3 lg:py-7 py-1  rounded-xl transition-colors
        ${isActive
          ? "bg-primary text-white"
          : "border border-gray-100 hover:bg-gray-50"
        }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10  flex items-center justify-center shrink-0
  ${isActive ? "bg-transparent" : "bg-transparent"}`}>
  <img 
    src={isActive ? LogoMenuWhite : logoMuneP} 
    alt="LogoMenu" 
    className="w-10 h-10"
  />
</div>
        
        <div className="text-start">
          <p className={`md:text-base sm:text-sm lg:text-xl  text-xs font-medium leading-none mb-1
            ${isActive ? "text-white" : "text-black"}`}>
            {t(p.nameKey)}
          </p>
          <p className={`md:text-sm lg:text-xl sm:text-sm text-xs 
            ${isActive ? "text-white" : "text-black"}`}>
            {t(p.descKey)}
          </p>
        </div>
      </div>

      {isActive ? (
        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center shrink-0">
          <BsArrowUpRightCircle color="white" size={28} />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center shrink-0">
          <BsArrowUpRightCircle size={28} className="text-[#A0A3CF]" />
        </div>
      )}
    </Link>
  );
})}
          </div>
        </div>

        {/* Divider */}
        {/* <div className="w-px bg-gray-100 self-stretch" /> */}

        {/* Pages */}
        <div className="w-[45%] shrink-1">
          <p className="text-xl text-[#1D1C20] font-semibold tracking-widest  mb-3">{t("menu.pages")}</p>
          <div className="flex flex-col gap-1">
            {pages.map((pg) => (
              <Link
                key={pg.path}
                to={pg.path}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-2xl  transition-colors
                  ${location.pathname === pg.path
                    ? "text-primary font-medium"
                    : "text-gray-800 hover:text-primary"
                  }`}
              >
                {t(pg.labelKey)}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer row */}
        <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between pt-4 border-t border-gray-100">
          <a
            href="https://www.youtube.com/@onsyntax"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-2 w-72 h-14 bg-black rounded-2xl px-4 py-2 text-base text-white hover:bg-gray-200 hover:text-black transition-colors"
          >
            {t("menu.youtubeChannel")}
            <GoArrowUpRight className="w-6  p-0.5 h-6 rounded-full bg-white text-black" />
          </a>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-1.5 text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {t("menu.getInTouch")}
            <GoArrowUpRight />
          </Link>
        </div>
      </div>

      {/* ══════════════════════
          MOBILE SLIDE-IN
      ══════════════════════ */}
     <div className={`md:hidden fixed right-0 top-0 h-full w-full z-50 bg-white  transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
  <div className="h-full flex flex-col overflow-y-auto">

    {/* Header primary */}
    <div className="flex items-center justify-between bg-primary px-4 py-3">
      <img src={LogoMenuMobile} alt="Logo" className="w-40 h-14 " />
      <button onClick={() => setMenuOpen(false)} className="text-white hover:text-white/70 transition-colors">
        <X size={42} />
      </button>
    </div>

    <div className="flex flex-col flex-1 px-4 py-4">

      {/* Our Projects */}
      <p className="text-[16px] text-[#31373E] ml-4 font-semibold tracking-widest  mb-3">{t("menu.ourProjects")}</p>
      <div className="flex flex-col gap-2  mb-6">
        {projects.map((p) => {
          const isActive = location.pathname === p.path ||
            (!projects.some(proj => location.pathname === proj.path) && p.active);
          return (
            <Link
              key={p.id}
              to={p.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between p-4 rounded-xl transition-colors
                ${isActive ? "bg-primary" : "border border-gray-100 hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-2.5">
               
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                  ${isActive ? "bg-transparent " : "bg-transparent"}`}>
                  <img
                    src={isActive ? LogoMenuWhite : logoMuneP}
                    alt="LogoMenu"
                    className="w-10 h-10"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <div>
                  <p className={`text-base mb-1 font-medium ${isActive ? "text-white" : "text-gray-800"}`}>
                    {t(p.nameKey)}
                  </p>
                  <p className={`text-[12px] ${isActive ? "text-white/75" : "text-gray-500"}`}>
                    {t(p.descKey)}
                  </p>
                </div>
              </div>
           
              <div className={`w-10 h-10  flex items-center justify-center shrink-0
                ${isActive ? "bg-transparent" : "bg-bg-transparent"}`}>
                <BsArrowUpRightCircle
                  size={28}
                  color={isActive ? "white" : "#98A2B3"}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pages */}
      <div className=" px-2 pt-4">
        <p className="text-[16px] text-[#1D1C20] font-semibold tracking-widest  mb-3">{t("menu.pages")}</p>
        <div className="flex flex-col gap-1 pt-2">
          {pages.map((pg) => (
            <Link
              key={pg.path}
              to={pg.path}
              onClick={() => setMenuOpen(false)}
              className={`py-2.5 text-2xl transition-colors font-semibold
                ${location.pathname === pg.path ? "text-primary font-medium" : "text-gray-800 hover:text-primary"}`}
            >
              {t(pg.labelKey)}
            </Link>
          ))}
        </div>
      </div>

    </div>
  </div>
</div>
    </>
  );
};

export default Menu;
