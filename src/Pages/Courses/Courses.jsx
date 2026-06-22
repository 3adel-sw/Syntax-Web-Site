
import { useState, useEffect } from 'react';
import CardCourses from '../../components/Ui/CardCourses';
import Subscribe from '../../components/Ui/Subscribe';
import Footer from '../../components/layout/Footer';
import TabSlider from '../../components/Ui/TabSlider';
import SEO from '../../components/SEO';
import { useTranslation } from 'react-i18next';
import { getAboutCourses, getCoursesByCategory } from "../../services/courses/coursesService";



const ALL_TAB = { id: null, name: null, labelKey: 'courses.tabs.all' };
const Courses = () => {
  const { t, i18n } = useTranslation();
const isAr = i18n.language === 'ar';

   const [activeTab, setActiveTab]     = useState(ALL_TAB);
  const [tabs, setTabs]               = useState([ALL_TAB]);
  const [aboutCourse, setAboutCourse] = useState(null);
  const [headerLoading, setHeaderLoading] = useState(true);
   const tabLabel = (tab) => tab.labelKey ? t(tab.labelKey) : tab.name;
  const tabToValue = (tab) => tab.id ?? 'all';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, categoriesRes] = await Promise.all([
          getAboutCourses(),
           getCoursesByCategory(),
        ]);
 
        // About 
        const about = aboutRes?.data?.about_courses?.[0];
        if (about) setAboutCourse(about);
 
        // Categories → tabs
        const cats = categoriesRes?.data?.category || [];
        const categoryTabs = cats.map((cat) => ({
          id: cat.id,          
          name: cat.name,
          labelKey: null,
        }));
        setTabs([ALL_TAB, ...categoryTabs]);
      } catch (err) {
        console.error('Error fetching header/categories:', err);
      } finally {
        setHeaderLoading(false);
      }
    };
 
    fetchData();
  }, []);

  return (
 <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <SEO
        title="كورسات تصميم UX/UI - تعلم من المبتدئ للاحتراف"
        description="اكتشف كورسات تصميم UX/UI باللغة العربية مع Syntax Academy. دورات شاملة في تجربة المستخدم، واجهات التطبيقات، Figma، وDesign Systems للمبتدئين والمحترفين."
        keywords="كورسات UX UI, تعلم تصميم واجهات, دورات Figma, تجربة المستخدم, واجهة المستخدم, Design System, كورسات تصميم عربية"
        url="/courses"
        type="website"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'كورسات تصميم UX/UI - Syntax Academy',
          description: 'قائمة كورسات تصميم تجربة المستخدم وواجهة المستخدم باللغة العربية',
          url: 'https://onsyntax.mhwaralabtikar.com/courses',
        }}
        breadcrumb={[
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://onsyntax.mhwaralabtikar.com/' },
          { '@type': 'ListItem', position: 2, name: 'الكورسات', item: 'https://onsyntax.mhwaralabtikar.com/courses' },
        ]}
      />
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">

     <div className={`space-y-3 ${isAr ? 'text-right' : 'text-start'}`}>
          {headerLoading ? (
            <div className="animate-pulse space-y-2 mt-4">
              <div className="h-8 bg-gray-200 rounded w-2/3" />
              <div className="h-5 bg-gray-200 rounded w-full" />
            </div>
          ) : (
            <>
              <h1 className="md:text-[30px] text-base mt-4 font-bold  text-gray-800">
                {aboutCourse?.name }
              </h1>
              <p className="text-gray-500 md:text-[22px] max-w-5xl text-sm mb-2">
                {aboutCourse?.description || t('courses.header.subtitle')}
              </p>
            </>
          )}
        </div>

          {/* ── Filter Tabs ── */}
        <div className="mt-12 md:mt-12 md:mb-6">
          <h2 className="md:text-4xl text-base font-bold text-start text-gray-900 mb-2 md:mb-6">
            {t('courses.tabs.all')}
          </h2>
 
          {/* Desktop */}
          <div className="hidden md:flex gap-2 flex-wrap mb-2">
            {tabs.map((tab) => (
              <button
                key={tabToValue(tab)}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 rounded-[14px] text-sm border transition-all duration-200 ${
                  activeTab.id === tab.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-primary/10 text-primary border-gray-200 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                {tabLabel(tab)}
              </button>
            ))}
          </div>
 
          {/* Mobile */}
          <TabSlider
            tabs={tabs.map((tab) => ({ value: tabToValue(tab), label: tabLabel(tab) }))}
            activeTab={tabToValue(activeTab)}
            setActiveTab={(val) => {
              const found = tabs.find((tab) => tabToValue(tab) === val);
              if (found) setActiveTab(found);
            }}
            className="md:hidden mb-4"
          />
        </div>
        {/* Cards */}
          <CardCourses activeCategory={activeTab.id} activeCategoryName={activeTab.name} />
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
