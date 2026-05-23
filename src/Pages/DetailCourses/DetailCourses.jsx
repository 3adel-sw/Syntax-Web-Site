import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../../services/courses/coursesService';
import Curriculum from "./Curriculum";
import Overview from "./Overview";
import { MessageSquare, Loader2, Check } from 'lucide-react';
import Reports from "../../assets/reports.svg"
import ChooseUs from '../../components/Ui/ChooseUs';
import CardsTestimonials from '../../components/Ui/CardsTestimonials';
import CapturedVideos from '../../components/Ui/CapturedVideos';
import MainFooter from '../../components/Ui/MainFooter';
import Footer from "../../components/layout/Footer";
import RegisterModal from '../../components/Ui/RegisterModal';
import Questions from '../../components/Ui/Questions';
import { FaBook } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { GoFileDirectory } from "react-icons/go";
import { GrCertificate } from "react-icons/gr";
import { MdOutlinePaid } from "react-icons/md";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { X } from 'lucide-react';
// import { LuLanguages } from "react-icons/lu";

import { useTranslation } from 'react-i18next';
import {
  getTestimonials,
} from '../../services/home/homeService';
const DetailCourses = () => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language == 'ar';

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const links = {
      twitter: `https://twitter.com/intent/tweet?url=${url}`,
      instagram: `https://www.instagram.com/`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
  window.open(links[platform], '_blank');
  setShowShareMenu(false);
};

  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const toStr = (val) => {
    if (!val) return '';
    if (typeof val === 'object') return val?.name || val?.title || '';
    return val;
  };


  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Register Modal
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  



  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const [res, testimonialsRes] = await Promise.all([
          getCourseById(id),
          getTestimonials(),
        ]);
        setTestimonials(testimonialsRes.data?.testimonials || testimonialsRes.data || []);
       
        setCourse(res.data?.course || res.data);
      } catch (err) {
        setError(t('messages.failedToLoadCourse'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, isRTL, t]);
  

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={48} className="animate-spin text-primary" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">{error}</div>
  );

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">{t('courseDetails.courseNotFound')}</div>
  );
  
    const handleDownload = async () => {
  if (course?.file) {
    try {
      const response = await fetch(course.file);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${course.name || 'course-file'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.open(course.file, '_blank');
    }
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">
        <RegisterModal courseName={course?.name} isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        {/* Course Title */}
        <h1 className="md:text-2xl text-xl text-start md:font-bold font-semibold text-gray-900 mb-5 mt-16 md:mt-10">
          {course?.name || t('common.unavailable')}
        </h1>
        {/* Hero Banner */}
        <div className="rounded-4xl border border-gray-200 overflow-hidden mb-5 h-82 md:h-[28rem] bg-gray-50">
          {/* image */}
          <img src={course.banner_image || course.img } alt={course.title} className="w-full h-full object-cover " />
        </div>
        {/* Meta Bar */}
        <div className="  grid grid-cols-2 md:grid-cols-5 sm:grid-cols-4  gap-4  pb-4 md:mx-0 mx-auto mb-16 md:mb-4">
          {[
            { icon: <GoFileDirectory />, label: t('common.category'), value: toStr(course.category) || toStr(course.tag) || t('common.unavailable') },
            { icon: <GrCertificate />, label: t('courses.certificate'), value: toStr(course.certification) || t('common.Yes') },
            // { icon: <LuLanguages />, label: 'Languages', value: toStr(course.languages) || toStr(course.language) || 'English' },
            { icon: <MdOutlinePaid />, label: t('common.type'), value: toStr(course.type) || toStr(course.name) || t('common.unavailable') },
          ].map((item) => (
            <span key={item.label} className="flex items-center justify-center gap-2 lg:text-sm md:text-[10px] text-[9px] text-gray-600  border border-gray-200 rounded-lg md:px-14 p-1">
              {item.icon} {item.label}: <strong className="text-gray-800 lg:text-sm md:text-[10px] text-[9px]">{item.value}</strong>
            </span>
          ))}
          <button
            onClick={() => setShowShareMenu((prev) => !prev)}
            className="flex items-center justify-center gap-2 lg:text-sm md:text-xs text-[9px] text-gray-600 cursor-pointer border border-gray-200 rounded-lg px-12 p-1 hover:bg-gray-200"
          >
            <CiShare2 /> {t('common.share')}
          </button>
          <button onClick={handleCopyLink} className="flex items-center justify-center gap-1 gap-2 lg:text-sm md:text-xs text-[9px] text-gray-600  cursor-pointer border border-gray-200 rounded-lg p-1 hover:bg-gray-200">
            {linkCopied ? <Check size={14} className="text-green-600" /> : <FaRegCopy />} {linkCopied ? t('common.copied') || 'Copied!' : t('common.copyLink')}
          </button>
          </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:mb12 md:grid-cols-[1fr_320px] gap-6 text-start">
          {/* Tabs */}
          <div className="flex flex-col w-full">
            <div className="flex flex-row max-w-4xl gap-2 bg-gray-100 p-3 h-16 mb-6 rounded-xl">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 gap-1 flex justify-center items-center py-2.5 text-sm font-medium border-black border rounded-lg transition-all ${activeTab === 'overview'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-gray-500 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <FaBook /> {t('courses.overview')}
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`flex-1 gap-1 flex justify-center items-center py-2.5 text-sm font-medium border-black border rounded-lg transition-all ${activeTab === 'curriculum'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-gray-500 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <FaBook /> {t('courses.curriculum')}
              </button>
            </div>
            <div>
              {activeTab === 'overview' && <Overview course={course} />}
              {activeTab === 'curriculum' && <Curriculum course={course} />}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-2xl overflow-hidden h-fit">
            {/* Course Image */}
            <img src={course.image || course.img } alt={course.title} className="w-full h-[250px] object-cover rounded-2xl " />
            <div className="p-4">
              {/* Level */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <img src={Reports} alt={t('courses.certificate')} />
                {t('courseDetails.courseLevel')} <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                <span className="text-gray-700 font-medium text-xs ">{toStr(course.level) || t('courseDetails.entryToIntermediate')}</span>
              </div>
              <hr className="my-2 text-gray-300" />
              {/* Price */}
              <div className="flex border border-gray-200 p-3 rounded-lg flex-row justify-between text-sm text-gray-500 my-4">
                <span className="text-gray-400 font-semibold">{t('courseDetails.standardPrice')}</span>
                <span className="text-gray-400 font-semibold">USD {toStr(course.price) || 310}</span>
              </div>

              {/* Group Pricing */}
              <div className="flex border border-gray-200 p-3 bg-white rounded-lg flex-row justify-between text-sm text-gray-500 my-4">
                <span className="text-gray-800 font-bold">{t('courseDetails.groupPricing')}</span>
                <span className="text-gray-800 font-bold">{toStr(course.discount) || t('courseDetails.defaultDiscount')}</span>
              </div>

              {/* Buttons */}
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="w-full py-3 bg-primary text-white rounded-2xl text-sm font-semibold mb-2 hover:bg-primary/90 transition">
                {t('courses.registerNow')}
              </button>
        <button
  onClick={handleDownload}
  className="w-full py-3 text-primary rounded-2xl text-sm font-semibold hover:bg-primary hover:text-white my-4 transition"
>
  {t('courseDetails.downloadCourseFile')}
</button>
            </div>
          </div>
        </div>
        {/* Sections below (Only on Two Taps) */}
        
          <>
            {/* Why Choose Us */}
            <ChooseUs course={course} />
            {/* Testimonials */}
            <div className='md:my-22 sm:my-16 my-10 lg:my-24'>
              <div className=' space-y-5'>
                <span className=' border border-primary text-primary gap-2 mx-auto w-40 h-12 rounded-full text-xl flex justify-center items-center'>
                  <MessageSquare size={20} />
                  {t('home.testimonials')}
                </span>
                <h3 className='md:text-3xl text-2xl font-semibold text-gray-800 leading-snug'>{t('courseDetails.whatPeopleSay')}</h3>
                {/* Cards Testimonials */}
                <CardsTestimonials testimonials={testimonials} />
              </div>
            </div>
            {/* Questions */}
            <Questions faqs={course?.faqs || course?.questions || []} />
            {/* Captured Videos */}
            <CapturedVideos course={course} />
            {/* Footer */}
            <div className="lg:max-w-7xl max-w-5xl mx-auto py-10 mb-14  md:mb-25 lg:mb-27 ">
              <Footer />
            </div>
            {/*Main Footer */}
           <MainFooter
  courseName={course?.name || course?.title || t('common.course')}
  onDownload={handleDownload}
/>
          </>
        

 {showShareMenu && (
  <>
   
    <div
      className="fixed inset-0 z-40"
      onClick={() => setShowShareMenu(false)}
    />

    <div className="absolute z-40 fixed flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-2xl shadow-lg p-2 md:flex-row flex-col gap-1 w-fit md:p-8 max-w-[90%] h-fit">
      
      
      <button
        onClick={() => setShowShareMenu(false)}
        className="absolute top-0 right-0 p-2 text-gray-400 hover:text-red-600 cursor-pointer"
      >
        <X size={16} />
      </button>

      <button
        onClick={() => handleShare('twitter')}
        className="flex items-center mt-2 gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
      >
        <FaXTwitter size={16} /> {t('common.x')}
      </button>
      <button
        onClick={() => handleShare('instagram')}
        className="flex items-center mt-2 gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
      >
        <FaInstagram size={16} /> {t('common.instagram')}
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="flex items-center mt-2 gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
      >
        <FaLinkedin size={16} /> {t('common.linkedin')}
      </button>
    </div>
  </>
)}
      </div>

    </div>
  );
};

export default DetailCourses;
