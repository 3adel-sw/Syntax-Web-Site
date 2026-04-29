
import { useState } from 'react';
import CardBlog from '../../components/Ui/CardBlog'; 
import Subscribe from '../../components/Ui/Subscribe';
import Footer from '../../components/layout/Footer';
import TabSlider from '../../components/Ui/TabSlider';

const tabs = [
  "All Blogs",
  "UI Design",
  "Soft skills",
  "UX Principles",
  "Personal Branding",
  "Graphic Design",
];

const Blogs = () => {
  const [activeTab, setActiveTab] = useState("All Blogs");

  return (
 <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl    mx-auto ">
      <div className="  sm:max-w-5xl md:max-w-6xl w-[98%] lg:w-full text-center mx-1">

      {/* Header */}
      <h1 className="text-3xl  text-left font-bold  text-gray-900 mb-2 md:my-4">
        Welcome to the Syntax Blog
      </h1>
      <p className="text-[16px] text-left  text-gray-500 mb-8 ">
        Stay informed with our latest design topics, articles, industry insights, and expert tips.
      </p>

      {/* Desktop Tabs */}
      <div className="hidden md:flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-3 rounded-xl text-base border transition-all duration-200 ${
              activeTab === tab
                ? "bg-primary text-white border-primary"
                : "bg-primary/10 text-primary border-primary/10 hover:bg-gray-100 hover:text-gray-800"
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

      {/* Cards */}
      <CardBlog activeCategory={activeTab} />
       {/* Subscribe */}
        <Subscribe />
        {/* Footer */}
        <Footer />
    </div>
    </div>
  );
};

export default Blogs;