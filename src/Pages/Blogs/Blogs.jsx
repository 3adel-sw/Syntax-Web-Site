
import { useState } from 'react';
import CardBlog from '../../components/Ui/CardBlog'; 
import Subscribe from '../../components/Ui/Subscribe';
import Footer from '../../components/layout/Footer';

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
   <div className="min-h-screen flex items-center justify-center max-w-6xl mx-auto md:pt-16 sm:pt-10 pt-6 ">
      
      <div className="  sm:max-w-5xl md:max-w-6xl lg:w-full text-left mx-1">
      {/* Header */}
      <h1 className="text-2xl font-bold  text-gray-900 mb-2 md:mb-4">
        Welcome to the Syntax Blog
      </h1>
      <p className="text-base text-gray-500 mb-6 ">
        Stay informed with our latest design topics, articles, industry insights, and expert tips.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 rounded-xl text-sm border transition-all duration-200 ${
              activeTab === tab
                ? "bg-primary text-white border-gray-900"
                : "bg-primary/10 text-primary border-gray-200 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <CardBlog activeCategory={activeTab} />
       {/* Subscribe */}
        <Subscribe />
        <Footer />
    </div>
    </div>
  );
};

export default Blogs;