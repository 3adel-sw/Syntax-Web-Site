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
      <SEO
        title="مدونة تصميم UX/UI - مقالات ونصائح من خبراء"
        description="مدونة Syntax Academy: مقالات عربية متخصصة في تصميم تجربة المستخدم UX، واجهة المستخدم UI، Figma، نظرية الألوان، وأحدث اتجاهات التصميم."
        keywords="مدونة تصميم UX UI, مقالات تجربة المستخدم, نصائح تصميم واجهات, Figma عربي, نظرية الألوان"
        url="/blogs"
        type="website"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'مدونة Syntax Academy',
          description: 'مقالات عربية متخصصة في تصميم UX/UI',
          url: 'https://onsyntax.mhwaralabtikar.com/blogs',
          inLanguage: 'ar',
          publisher: {
            '@type': 'EducationalOrganization',
            name: 'Syntax Academy',
            url: 'https://onsyntax.mhwaralabtikar.com/',
          },
        }}
        breadcrumb={[
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://onsyntax.mhwaralabtikar.com/' },
          { '@type': 'ListItem', position: 2, name: 'المدونة', item: 'https://onsyntax.mhwaralabtikar.com/blogs' },
        ]}
      />
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">

        {/* Header */}
        {loading ? (
          <div className="animate-pulse space-y-3 mt-4">
            <div className="h-8 bg-gray-200 rounded w-2/3" />
            <div className="h-5 bg-gray-200 rounded w-full" />
          </div>
        ) : (
          <>
            <h1 className="md:text-[30px] text-base mt-4 text-start font-bold  text-gray-800">
              {aboutBlog?.name || t('blogs.welcome')}
            </h1>
           <p className="text-gray-500 md:text-[22px] max-w-5xl text-sm mb-2 text-start">
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
