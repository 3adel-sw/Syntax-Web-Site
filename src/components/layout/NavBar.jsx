import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/logoo.svg";
import LanguageDropdown from "@/components/Ui/LanguageDropdown";
import UserDropdown from "@/components/Ui/UserDropdown";
import MenuPanel from "@/components/Ui/Menu";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`syntax-navbar  md:py-4 mx-auto sm:py-3 py-2 rounded-2xl w-full lg:max-w-[98%]  2xl:max-w-[87%]   md:px-6 sm:px-6 px-4 z-50
        flex items-center justify-between transition-all duration-300
        sticky top-0 left-0  3xl:fixed 3xl:left-1/2 3xl:-translate-x-1/2 3xl:w-[90%]
        ${isScrolled ? "bg-white shadow-md" : "  bg-transparent "}`}
    >
      {/* Logo */}
      <Link to="/">
        <div className="md:w-32 md:h-10 sm:w-24 sm:h-8 w-20 h-8">
          <img src={Logo} alt="Syntax Logo" />
        </div>
      </Link>

      {/* Right side */}
      <div className="syntax-nav-right">
        <div className="bg-gray-200 md:w-12 md:h-12 sm:w-10 sm:h-10 w-8 h-8 rounded-full flex items-center justify-center relative">
          <LanguageDropdown />
        </div>
        <UserDropdown className="text-[#F7F4F2]" />

        {/* Menu component */}
        <MenuPanel isScrolled={isScrolled} />
      </div>
    </nav>
  );
};

export default NavBar;