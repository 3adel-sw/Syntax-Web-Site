import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Curriculum from "./Curriculum";
import Overview from "./Overview";
import { MessageSquare } from 'lucide-react';
import detailsCourses from "../../assets/detailsCourses.svg"
import Rectangle from "../../assets/Rectangle.svg"
import Reports from "../../assets/reports.svg"
import ChooseUs from '../../components/Ui/ChooseUs';
import CardsTestimonials from '../../components/Ui/CardsTestimonials';
import CapturedVideos from '../../components/Ui/CapturedVideos';
import MainFooter from '../../components/Ui/MainFooter';
import Questions from '../../components/Ui/Questions';
import { FaBook } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { GoFileDirectory } from "react-icons/go";
import { GrCertificate } from "react-icons/gr";
import { LuLanguages } from "react-icons/lu";


const DetailCourses = () => {
  const [activeTab, setActiveTab] = useState('overview');


  return (
     <div className="min-h-screen flex items-center justify-center max-w-6xl mx-auto ">

      <div className="  sm:max-w-5xl md:max-w-6xl lg:w-full text-center mx-1">

      {/* Course Title */}
      <h1 className="text-2xl text-left font-bold text-gray-900 mb-5">
        The Psychology Behind UX Design
      </h1>

      {/* Hero Banner */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden mb-5 h-82 md:h-[28rem] bg-gray-50">
     {/* image */}
        <img src={detailsCourses} alt="detailsCourses" className="w-full h-full object-fill " />
      </div>

      {/* Meta Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-5 pb-4 md:mx-0 mx-auto justify-center ">
        {[
          { icon: <GoFileDirectory />, label: 'Category', value: 'UX Design' },
          { icon: <GrCertificate />, label: 'Certification', value: 'Yes' },
          { icon: <LuLanguages />, label: 'Languages', value: 'English' },
        ].map((item) => (
          <span key={item.label} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-lg md:px-12 px-4 py-2.5">
            {item.icon} {item.label}: <strong className="text-gray-800">{item.value}</strong>
          </span>
        ))}
        <button className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-lg md:px-12 px-4 py-2.5 hover:bg-gray-200">
          <CiShare2 /> Share
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-lg md:px-12 px-4 py-2.5 hover:bg-gray-200">
          <FaRegCopy /> Copy Link
        </button>
      </div>
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 text-left">
         {/* Tabs */}
         <div className="flex flex-col w-full">
      <div className="flex flex-row max-w-3xl gap-2 bg-gray-100 p-1 h-14  mb-6 rounded-xl">
        <button
          onClick={() => setActiveTab('overview')}
           className={`flex-1   gap-1 flex justify-center items-center py-2.5 text-sm font-medium border-black   border rounded-lg transition-all ${
            activeTab === 'overview'
              ? 'bg-primary text-white border-primary'
              : 'bg-transparent text-gray-500 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <FaBook /> Overview
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`flex-1   gap-1 flex justify-center items-center py-2.5 text-sm font-medium border-black   border rounded-lg transition-all ${
            activeTab === 'curriculum'
              ? 'bg-primary text-white border-primary'
              : 'bg-transparent text-gray-500 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <FaBook /> Curriculum
        </button>
      </div>
      <div >
         {activeTab === 'overview' && <Overview />}
      {activeTab === 'curriculum' && <Curriculum />}
      </div>
      </div>

        {/* Left: Content */}
      
        {/* Right: Course Card */}
        <div className="border border-gray-200 p-2 rounded-xl overflow-hidden h-fit">
          {/* Course Image */}
            <img src={Rectangle} alt="detailsCourses" className="w-full h-[150px] object-cover rounded-xl" />
          <div className="p-4">
            {/* Level */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              
              <img src={Reports} alt="reports" />
              Course Level <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span className="text-gray-700 font-medium">Entry to Intermediate</span>
            </div>
               <hr className="my-2 text-gray-300" />
            {/* Price */}
            <div className="flex border border-gray-200 p-3  rounded-lg flex-row justify-between text-sm text-gray-500 my-4">
              <span className="text-gray-400 font-semibold">Standard price</span>
              <span className="text-gray-400 font-semibold">USD 210</span>
            </div>

            {/* Group Pricing */}
            <div className="flex border border-gray-200 p-3  rounded-lg flex-row justify-between text-sm text-gray-500 my-4">
              <span className="text-gray-400 font-semibold">Group Pricing</span>
              <span className="text-gray-400 font-semibold">15% off</span>
            </div>

            {/* Buttons */}
            <button className="w-full py-3 bg-primary text-white rounded-lg text-sm font-semibold mb-2 hover:bg-primary/90 transition">
              Register Now
            </button>
            <button className="w-full py-3  text-primary rounded-lg text-sm font-semibold hover:bg-blue-50 my-4 transition">
              Download Course File
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
          <ChooseUs />
    {/* Testimonials */}
        <div className='md:my-22 sm:my-16 my-10 lg:my-24'>
          <div className=' space-y-5'>
            <span className=' border border-gray-200  gap-2 mx-auto w-38 h-12 rounded-full  text-xl flex justify-center items-center'>
              <MessageSquare size={20} />
              Testimonials
            </span>
            <h3 className='text-3xl font-bold text-gray-800 leading-snug'>What are people saying</h3>
            {/* Cards Testimonials */}
            <CardsTestimonials />
          </div>
        </div>
        {/* Questions */}
        <Questions />
        {/* Captured Videos */}
        <CapturedVideos />
        {/* Footer */}
        <MainFooter />
    </div>
    </div>
  );
};

export default DetailCourses;