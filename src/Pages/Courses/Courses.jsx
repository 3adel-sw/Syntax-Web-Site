
import { useState } from 'react';
import CardCourses from '../../components/Ui/CardCourses';
import Subscribe from '../../components/Ui/Subscribe';
import Footer from '../../components/layout/Footer';
import TabSlider from '../../components/Ui/TabSlider';

const tabs = [
  "All Events",
  "Online Workshop",
  "Offline Meetup",
  "Mega Event",
];

const Courses = () => {
  const [activeTab, setActiveTab] = useState("All Events");

  return (
 <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">

        {/* Header */}
        <div className='text-center md:text-left space-y-3'>
          
          <h1 className='md:text-[30px] text-base mt-4 font-bold text-gray-800'>Master Design Skills with Expert-Led Courses</h1>
          <p className='text-gray-500 md:text-[22px] max-w-5xl text-left text-sm mb-2  '>
            Explore a range of UX, and GFX design courses crafted to help you build a strong foundation and master advanced techniques.
          </p>
        </div>

        {/* All Courses section */}
        <div className='mt-12 md:mt-12 md:mb-6'>
          <h1 className="md:text-4xl text-base font-bold text-start text-gray-900 mb-2">All Courses</h1>

          {/* Desktop Filter Tabs */}
          <div className='hidden md:flex gap-2 flex-wrap mb-2'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                 className={`px-4 py-3 rounded-[14px] text-sm border transition-all duration-200 ${
              activeTab === tab
                ? "bg-primary text-white border-primary"
                : "bg-primary/10 text-primary border-gray-200 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
                {tab}
              </button>
            ))}
          </div>

          {/* Mobile Tab Slider */}
          <TabSlider
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="md:hidden mb-4"
          />
        </div>

        {/* Cards */}
        <CardCourses activeCategory={activeTab} />
            {/* Subscribe */}
            <div className='md:my-24 my-30'>
              <Subscribe />
            </div>
        
        {/* Footer */}
        <Footer />

        
        
      </div>
    </div>
  );
};

export default Courses;