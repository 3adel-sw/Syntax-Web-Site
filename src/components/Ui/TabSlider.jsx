// eslint-disable-next-line no-unused-vars
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line no-unused-vars
const TabSlider = ({ tabs, activeTab, setActiveTab, className = "" }) => {
  const { i18n } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const isRTL = i18n.language === 'ar';

 
  const containerRef = useRef(null);


useEffect(() => {
  const activeBtn = containerRef.current?.querySelector('[data-active="true"]');
  if (activeBtn) {
    activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
}, [activeTab]);

  return (
   <div className="overflow-x-auto md:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
  <div className="flex gap-2 w-max px-1">
          {tabs.map((tab) => {
            const value = typeof tab === "object" ? tab.value : tab;
            const label = typeof tab === "object" ? tab.label : tab;
            return (
            <button
              key={value}
              data-active={activeTab === value}
              onClick={() => setActiveTab(value)}
              className={`px-4 py-3 rounded-xl text-sm border transition-all duration-200 whitespace-nowrap ${
                activeTab === value
                  ? "bg-primary text-white border-primary"
                  : "bg-primary/10 text-primary border-gray-200 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          )})}
        </div>
      </div>
  
  );
};

export default TabSlider;
