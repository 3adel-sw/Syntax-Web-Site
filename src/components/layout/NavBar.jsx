import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import  Logo  from "@/assets/logoo.svg";
import  {Menu , X ,ArrowRight} from "lucide-react";
import LanguageDropdown from "@/components/Ui/LanguageDropdown";
import UserDropdown from "@/components/Ui/UserDropdown";




const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Blogs", path: "/blogs" },
    { label: "Contact", path: "/contact" },
    // { label: "DetailCourses", path: "/courses/1" },
    { label: "Courses", path: "/courses" },
    { label: "Events", path: "/events" },
  ];

  return (
    <>
      
      <nav className={`syntax-navbar  md:py-4 sm:py-3 py-2 md:px-6 sm:px-6 px-4 top-0 left-0 sticky z-50
      flex items-center justify-between transition-all duration-300 ${
        isScrolled ? "bg-[#FFFFFB] shadow-md" : "bg-transparent"
      }`}
      >
        {/* Logo */}
        <Link to="/" className="">
          <div className="md:w-32 md:h-10 sm:w-24 sm:h-8 w-20 h-8 ">
            <img src={Logo} alt="Syntax Logo" />
          </div>
        </Link>
        {/* Right side */}
        <div className="syntax-nav-right">
          {/* Language dropdown */}
          <div className="bg-gray-200 md:w-12 md:h-12 sm:w-10 sm:h-10 w-8 h-8 rounded-full flex items-center justify-center relative">
            <LanguageDropdown />
          </div>
          {/* User dropdown */}
          <UserDropdown  className="text-[#F7F4F2]"/>
          {/* Menu button */}
     <button
  className="relative md:w-26 md:h-11 sm:w-22 sm:h-8 w-10 px-2 h-8 text-xs flex md:gap-4 gap-1 items-center justify-center text-white rounded-xl focus:outline-none focus:ring-2 bg-primary focus:ring-inset focus:ring-primary"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? <X size={16} /> : <Menu size={16} />}
  <span className="hidden md:inline">Menu</span>
</button>
        </div>
        {/* Dropdown */}
        {menuOpen && (
          <>
            <div className="syntax-overlay text-white" onClick={() => setMenuOpen(false)} />
            <div className="syntax-dropdown">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={location.pathname === link.path ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  <span className="arrow cursor-pointer">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;