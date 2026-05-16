import { useState, useEffect } from 'react';
import CardBlog from '../../components/Ui/CardBlog'; 
import Subscribe from '../../components/Ui/Subscribe';
import Footer from '../../components/layout/Footer';
import TabSlider from '../../components/Ui/TabSlider';
import { useTranslation } from 'react-i18next';
import { getBlogAbout, getBlogCategories } from '../../services/blogs/blogsService';

const ALL_TAB = { id: null, name: null, labelKey: 'blogs.allBlogs' };

const Blogs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(ALL_TAB);
  const [tabs, setTabs] = useState([ALL_TAB]);
  const [aboutBlog, setAboutBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabLabel = (tab) => tab.labelKey ? t(tab.labelKey) : tab.name;
  const tabToValue = (tab) => tab.id ?? 'all';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, catsRes] = await Promise.all([
          getBlogAbout(),
          getBlogCategories(),
        ]);

        const about = aboutRes?.data?.about_blogs?.[0];
        if (about) setAboutBlog(about);

        const cats = catsRes?.data?.category || [];
        const categoryTabs = cats.map((cat) => ({
          id: cat.id,
          name: cat.name,
          labelKey: null,
        }));
        setTabs([ALL_TAB, ...categoryTabs]);
      } catch (err) {
        console.error('Error fetching blog data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">

        {/* Header */}
        {loading ? (
          <div className="animate-pulse space-y-2 mt-4">
            <div className="h-8 bg-gray-200 rounded w-2/3" />
            <div className="h-5 bg-gray-200 rounded w-full" />
          </div>
        ) : (
          <>
            <h1 className="text-3xl text-start font-bold text-gray-900 mb-2 md:my-4 mt-11 md:mt-4">
              {aboutBlog?.name || t('blogs.welcome')}
            </h1>
            <p className="text-[16px] text-start text-gray-500 mb-8">
              {aboutBlog?.description || t('blogs.intro')}
            </p>
          </>
        )}

        {/* Desktop Tabs */}
        <div className="hidden md:flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tabToValue(tab)}
              onClick={() => setActiveTab(tab)}
              className={`p-3 rounded-xl text-base border transition-all duration-200 ${
                activeTab.id === tab.id
                  ? "bg-primary text-white border-primary"
                  : "bg-primary/10 text-primary border-primary/10 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              {tabLabel(tab)}
            </button>
          ))}
        </div>

        {/* Mobile Tab Slider */}
        <TabSlider
          tabs={tabs.map((tab) => ({ value: tabToValue(tab), label: tabLabel(tab) }))}
          activeTab={tabToValue(activeTab)}
          setActiveTab={(val) => {
            const found = tabs.find((tab) => tabToValue(tab) === val);
            if (found) setActiveTab(found);
          }}
          className="md:hidden mb-4"
        />

        {/* Cards */}
        <CardBlog activeCategory={activeTab.name} showSlider={false} />
        {/* Subscribe */}
        <Subscribe />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Blogs;
