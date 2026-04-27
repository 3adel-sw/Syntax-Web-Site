import imgHome from '../assets/homeBg.svg';
import { Sparkle, LoaderCircle, MessageSquare } from 'lucide-react';
import CardAcademyEvents from '../components/Ui/CardAcademyEvents';
import CardCourses from '../components/Ui/CardCourses';
import CardGraduated from '../components/Ui/CardGraduated';
import CardsTestimonials from '../components/Ui/CardsTestimonials';
import CardBlog from '../components/Ui/CardBlog';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center max-w-6xl mx-auto ">

      <div className="  sm:max-w-5xl md:max-w-6xl lg:w-full text-center mx-1">

        {/* Badge */}
        <div className="flex items-center mx-auto gap-3 justify-center w-80 h-14 px-4 py-1 mb-4 text-sm rounded-full border border-gray-300 bg-white shadow-sm ">
          <Sparkle />
          Welcome to Syntax Community
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-5xl sm:text-4xl font-semibold text-gray-800 leading-snug">
          Learn, <span className="text-black">Create</span>, and Stay Inspired
        </h1>

        {/* Description */}
        <p className="text-gray-700 mt-3 max-w-2xl mx-auto text-sm md:text-lg sm:text-base">
          Join a vibrant community where you can connect, collaborate, and unlock your full potential.
          Let’s shape the future of design together!
        </p>

        {/* Button */}
        <div className="mt-5">
          <button className="px-6 py-2.5 flex gap-2 mx-auto bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 transition">
            Start Learning
            <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          </button>
        </div>

        {/* Image */}
        <div className="mt-8 md:w-full w-full bg-gray-500 md:h-[28rem] md:mx-auto rounded-4xl shadow-lg">
          <img
            src={imgHome}
            alt="community"
            className="rounded-2xl shadow-lg w-full h-full object-cover"
          />
        </div>
        {/* Cards  */}
        <CardAcademyEvents />
        {/* Courses */}
        <div className='md:my-22 sm:my-16 my-10 lg:my-24'>
          <div className=' space-y-5'>
            <span className=' border border-gray-200  gap-2 mx-auto w-32 h-12 rounded-full  text-xl flex justify-center items-center'>
              <MessageSquare size={16} />
              Courses
            </span>
            <h3 className='text-3xl font-bold text-gray-800 leading-snug'>Top Courses</h3>
            {/* Cards */}
            <CardCourses />
            {/* Button */}
            <div className="mt-y">
              <button className="px-6 py-2.5 flex gap-2 mx-auto bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 transition">
                Show All Courses
                <LoaderCircle />
              </button>
            </div>
          </div>
        </div>
        {/* Graduates */}
        <div className='md:my-22 sm:my-16 my-10 lg:my-24'>
          <div className=' space-y-5'>
            <h3 className='text-2xl  text-gray-500 leading-snug'> Our Graduated Working On</h3>
            {/* Cards */}
            <CardGraduated />
          </div>
        </div>
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
        {/* Latest Blog */}
        <div className='md:my-22 sm:my-16 my-10 lg:my-24'>
          <div className=' space-y-5'>
            <span className=' border border-gray-200  gap-2 mx-auto w-38 h-12 rounded-full  text-xl flex justify-center items-center'>
              <MessageSquare size={20} />
              Blog
            </span>
            <h3 className='text-3xl font-bold text-gray-800 leading-snug'>Latest Blog</h3>
            {/* Cards */}
            <CardBlog activeCategory="All Blogs" limit={3} showButton />
          </div>
        </div>
        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
};

export default Home;