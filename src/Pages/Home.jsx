import { useEffect, useState } from 'react';
// import imgHome from '../../public/images/homeBg.webp';
import { Sparkle, MessageSquare } from 'lucide-react';
import { LuLoaderCircle } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import CardAcademyEvents from '../components/Ui/CardAcademyEvents';
import CardCourses from '../components/Ui/CardCourses';
import CardGraduated from '../components/Ui/CardGraduated';
import CardsTestimonials from '../components/Ui/CardsTestimonials';
import CardBlog from '../components/Ui/CardBlog';
import Footer from '../components/layout/Footer';
import { useTranslation } from 'react-i18next';


import {
  getHeroSection,
  getCounters,
  getOrganizations,
  getLatestCourses,
  getLatestBlogs,
  getTestimonials,
  getAllProducts,
  getSetting,
} from '../services/home/homeService';

const Home = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const [hero, setHero] = useState(null);
  const [counters, setCounters] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [latestCourses, setLatestCourses] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [setting, setSetting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.background = "#FFFFFF";
    return () => {
      document.body.style.background = "#FCFCFB";
    };
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          heroRes,
          countersRes,
          orgsRes,
          coursesRes,
          blogsRes,
          testimonialsRes,
          productsRes,
          settingRes,
        ] = await Promise.all([
          getHeroSection(),
          getCounters(),
          getOrganizations(),
          getLatestCourses(),
          getLatestBlogs(),
          getTestimonials(),
          getAllProducts(),
          getSetting(),
          
        ]);

        setHero(heroRes.data.heroSection);
        setCounters(countersRes.data);
        setOrganizations(orgsRes.data?.organizations || orgsRes.data || []);
        setLatestCourses(coursesRes.data);
        setLatestBlogs(blogsRes.data);
        setTestimonials(
          (testimonialsRes.data?.testimonials || testimonialsRes.data || [])
            .filter((testimonial) => Number(testimonial.show_in_home) !== 0)
        );
        setProducts(productsRes.data);
        setSetting(settingRes.data?.settings || settingRes.data || null);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><LuLoaderCircle size={70} className="animate-spin text-primary" /></div>;



  return (
    <div className="min-h-screen home-page flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">

        {/* Badge */}
        <div className="flex items-center sticky mx-auto md:mt-24 gap-4 justify-center md:w-72 w-65 h-12 md:h-14 py-2 mb-4 md:text-[16px] text-sm rounded-full border border-primary bg-white">
          <Sparkle size={20} className="fill-primary text-primary animate-pulse" />
          {setting?.badge_text || t('home.badge')}
        </div>
        
    {hero?.map((item, index) => (
  <div key={index}>

    {/* Title */}
    <h1 className="text-2xl md:text-5xl sm:text-4xl font-semibold text-gray-800 leading-snug">
      {item?.title || '  '}
      <span className="text-black">{item?.highlight || t('home.highlight')}</span>
      {item?.subtitle || t('home.subtitle')}
    </h1>

    {/* Description */}
    <p className="text-gray-700 mt-3 max-w-2xl mx-auto text-sm md:text-lg sm:text-base">
      {item?.description || t('home.description')}
    </p>
            {/* Button */}
        <div className="mt-5">
          <button
          onClick={() => navigate('/courses')}
          className="px-6 py-2.5 flex gap-2 mx-auto bg-primary text-white rounded-2xl shadow-md hover:bg-primary/90 transition">
            {t('home.startLearning')}
                {/* <LuLoaderCircle size={22} className="animate-spin" /> */}
                <LuLoaderCircle size={22} className="" />
          </button>
        </div>
    {/* Image */}
    <div className="mt-8 md:w-full w-full bg-gray-500 md:h-[28rem] md:mx-auto rounded-4xl">
      <img
        src={item?.image }
        alt="community"
        loading="eager"
        fetchPriority="high"
        className="rounded-2xl shadow-lg w-full h-full object-cover"
      />
    </div>
  </div>
))}
        {/* Counters */}
        {counters.length > 0 && (
          <div className="flex justify-center gap-8 my-10">
            {counters.map((counter) => (
              <div key={counter.id}>
                <h3 className="text-3xl font-bold text-primary">{counter.number}</h3>
                <p className="text-gray-600">{counter.label}</p>
              </div>
            ))}
          </div>
        )}
        {/* Organizations */}
        {organizations.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 my-10">
            {organizations.map((org) => (
              <img key={org.id} src={org.logo} alt={org.name} className="h-10 object-contain" />
            ))}
          </div>
        )}
        {/* Cards */}
        <CardAcademyEvents />
        {/* Courses */}
        <div className='md:my-22 sm:my-16 my-10 lg:my-24'>
          <div className='space-y-5'>
            <span className='border text-primary border-primary gap-2 mx-auto md:w-32 w-28 h-12 rounded-full md:text-xl text-base flex justify-center items-center'>
              <MessageSquare size={16} />
              {t('home.courses')}
            </span>
            <h3 className='md:text-3xl text-xl font-bold text-gray-800 leading-snug'>{t('home.topCourses')}</h3>
            <CardCourses data={latestCourses} activeCategory="All Courses" limit={3} showButton />
          </div>
        </div>

        {/* Graduates */}
        <div className='md:my-22 sm:my-16 my-16 lg:my-24'>
          <div className='space-y-5'>
            <h3 className='md:text-2xl text-xl text-gray-500 leading-snug'>{t('home.graduates')}</h3>
            <CardGraduated data={organizations} />
          </div>
        </div>

        {/* Testimonials */}
        <div className='md:my-22 sm:my-16 my-12 lg:my-24'>
          <div className='space-y-2'>
            <span className='border text-primary border-primary gap-2 mx-auto w-38 h-12 rounded-full text-xl flex justify-center items-center'>
              <MessageSquare size={20} />
              {t('home.testimonials')}
            </span>
            <h3 className='md:text-3xl text-2xl font-bold text-gray-800 leading-snug'>{t('home.whatPeopleSay')}</h3>
            <CardsTestimonials testimonials={testimonials} showButton />
            
          </div>
        </div>

        {/* Latest Blog */}
        <div className='md:my-22 sm:my-16 my-10 lg:my-24'>
          <div className='space-y-5'>
            <span className='border text-primary border-primary gap-2 mx-auto w-28 h-12 rounded-full text-xl flex justify-center items-center'>
              <MessageSquare size={20} />
              {t('home.blog')}
            </span>
            <h3 className='text-3xl font-bold text-gray-800 leading-snug'>{t('home.latestBlog')}</h3>
            <CardBlog data={latestBlogs} activeCategory="All Blogs" limit={3} showButton showSlider />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
