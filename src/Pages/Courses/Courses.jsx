
import { useState } from 'react';
import CardCourses from '../../components/Ui/CardCourses';
import Subscribe from '../../components/Ui/Subscribe';
import Footer from '../../components/layout/Footer';

const tabs = [
  "All Events",
  "Online Workshop",
  "Offline Meetup",
  "Mega Event",
];

const Courses = () => {
  const [activeTab, setActiveTab] = useState("All Events");

  return (
    <div className="min-h-screen flex items-center justify-center max-w-6xl mx-auto ">
      <div className="  sm:max-w-5xl md:max-w-6xl lg:w-full text-center mx-1">
        {/* Header */}
        <div className='text-center md:text-left space-y-3'>
          
          <h1 className='text-3xl font-bold text-gray-800'>Master Design Skills with Expert-Led Courses</h1>
          <p className='text-gray-500 text-base max-w-xl'>
            Explore a range of UX, and GFX design courses crafted to help you build a strong foundation and master advanced techniques.
          </p>
        </div>

        {/* All Courses section */}
        <div>
          <h1 className="text-2xl font-bold text-start text-gray-900 mb-2 md:mb-4">All Courses</h1>

          {/* Filter Tabs */}
          <div className='flex gap-2 flex-wrap mb-2'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                 className={`px-4 py-3 rounded-xl text-sm border transition-all duration-200 ${
              activeTab === tab
                ? "bg-primary text-white primary"
                : "bg-primary/10 text-primary border-gray-200 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <CardCourses activeCategory={activeTab} />
            {/* Subscribe */}
        <Subscribe />
        {/* Footer */}
        <Footer />

        
        
      </div>
    </div>
  );
};

export default Courses;