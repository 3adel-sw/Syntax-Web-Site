import { useState } from "react";
import { User, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";

const UserDropdown = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleLogin = () => {
    setIsLoggedIn(true);
    setOpen(false);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="bg-gray-200 md:w-12 md:h-12 sm:w-10 sm:h-10 w-8 h-8 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={t("nav.userMenu")}
      >
        <User size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 !px-3 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-start px-4 py-2 text-sm h-8 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
             <LogIn size={16}  className=" bg-red-200 text-red-400  rounded-full"/>
              {t("nav.logout")}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              className="w-full text-start px-4 py-2 text-sm h-8 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <LogIn size={16}  className=" bg-green-200 text-green-400  rounded-full"/>
              {t("nav.login")}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
