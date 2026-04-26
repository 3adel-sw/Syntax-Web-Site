// import imgHome from '../assets/bg-home.png';
import { Sparkle ,LoaderCircle} from 'lucide-react';
import CardAcademyEvents from '../components/Ui/CardAcademyEvents';


const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center max-w-6xl mx-auto ">
      
      <div className="  sm:max-w-5xl md:max-w-5xl lg:w-full text-center">

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
            <LoaderCircle />
          </button>
        </div>

        {/* Image */}
        <div className="mt-8 mb-14 md:w-full sm:w-98 w-98 bg-gray-500 h-[28rem] mx-auto rounded-2xl shadow-lg">
          {/* <img
            src={imgHome}
            alt="community"
            className="rounded-2xl shadow-lg w-full object-cover"
          /> */}
        </div>
            
            {/* Cards  */}
            <CardAcademyEvents />

      </div>
    </div>
  );
};

export default Home;