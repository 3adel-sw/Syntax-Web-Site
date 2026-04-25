// src/components/ui/LanguageDropdown.jsx
import { useState, useRef } from "react";

const LanguageDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("EN");
  const ref = useRef(null);

  const languages = ["EN", "AR", "FR", "ES"];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition cursor-pointer"
      >
        {selected}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-24 !px-3 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => { setSelected(lang); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${selected === lang ? "text-primary font-semibold" : "text-gray-700"}`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;