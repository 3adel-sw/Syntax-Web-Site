import { useState } from 'react';

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
import RegisterModal from '../../components/Ui/RegisterModal';
import Questions from '../../components/Ui/Questions';
import { FaBook } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { GoFileDirectory } from "react-icons/go";
import { GrCertificate } from "react-icons/gr";
import { LuLanguages } from "react-icons/lu";


const DetailCourses = () => {
  const [activeTab, setActiveTab] = useState('overview');
  // Register Modal
const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
   <div className="min-h-screen flex items-center justify-center md:max-w-5xl lg:max-w-6xl mx-auto ">
      <div className="sm:max-w-5xl md:max-w-6xl w-[92%] lg:w-full text-center mx-1">
    <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      {/* Course Title */}
    <h1 className="md:text-2xl text-xl text-left md:font-bold font-semibold text-gray-900 mb-5 mt-16 md:mt-10">
        The Psychology Behind UX Design
      </h1>

      {/* Hero Banner */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden mb-5 h-82 md:h-[28rem] bg-gray-50">
     {/* image */}
        <img src={detailsCourses} alt="detailsCourses" className="w-full h-full object-fill " />
      </div>

      {/* Meta Bar */}
      <div className=" grid grid-cols-2 md:grid-cols-5  gap-4 mb-5 pb-4 md:mx-0 mx-auto mb-16 md:mb-4  ">
        {[
          { icon: <GoFileDirectory />, label: 'Category', value: 'UX Design' },
          { icon: <GrCertificate />, label: 'Certification', value: 'Yes' },
          { icon: <LuLanguages />, label: 'Languages', value: 'English' },
        ].map((item) => (
          <span key={item.label} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-lg md:px-12 px-4 py-2.5">
            {item.icon} {item.label}: <strong className="text-gray-800 md:text-sm text-xs">{item.value}</strong>
          </span>
        ))}
        <button className="flex items-center justify-center gap-1 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-lg md:px-12 px-4 py-2.5 hover:bg-gray-200">
          <CiShare2 /> Share
        </button>
        <button className="flex items-center justify-center gap-1 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-lg md:px-12 px-4 py-2.5 hover:bg-gray-200">
          <FaRegCopy /> Copy Link
        </button>
      </div>
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:mb12 md:grid-cols-[1fr_320px] gap-6 text-left">
         {/* Tabs */}
         <div className="flex flex-col w-full">
      <div className="flex flex-row max-w-3xl gap-2 bg-gray-100 p-3 h-16  mb-6 rounded-xl">
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
           <div className=" bg-gray-100 p-4  rounded-2xl overflow-hidden h-fit">
          {/* Course Image */}
            <img src={Rectangle} alt="detailsCourses" className="w-full h-[250px] object-cover rounded-2xl " />
          <div className="p-4">
            {/* Level */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <img src={Reports} alt="reports" />
              Course Level <span className="w-2 h-2  rounded-full bg-primary inline-block" />
              <span className="text-gray-700 font-medium text-xs ">Entry to Intermediate</span>
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
            <button 
            onClick={() => setIsRegisterOpen(true)} 
            className="w-full py-3 bg-primary text-white rounded-2xl text-sm font-semibold mb-2 hover:bg-primary/90 transition">
              Register Now
            </button>
            <button className="w-full py-3 text-primary rounded-2xl text-sm font-semibold hover:bg-primary hover:text-white my-4 transition">
              Download Course File
            </button>
          </div>
        </div>
      </div>

      {/* Sections below (Only on Overview) */}
      {activeTab === 'overview' && (
        <>
      {/* Why Choose Us */}
          <ChooseUs />
    {/* Testimonials */}
        <div className='md:my-22 sm:my-16 my-10 lg:my-24'>
          <div className=' space-y-5'>
            <span className=' border border-primary text-primary  gap-2 mx-auto w-40 h-12 rounded-full  text-xl flex justify-center items-center'>
              <MessageSquare size={20} />
              Testimonials
            </span>
            <h3 className='md:text-3xl text-2xl font-semibold text-gray-800 leading-snug'>What are people saying</h3>
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
        </>
      )}
    </div>
    </div>
  );
};

export default DetailCourses;