import { useState } from 'react';
import RegisterModal from './RegisterModal';


const MainFooter = ({ courseName }) => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);


  return (
    <div className="lg:w-full w-[92%] md:w-full  z-50 mx-auto  bottom-0 md:left-0   fixed  my-10">
      <RegisterModal courseName={courseName} isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      
      <div className="bg-primary max-w-6xl mx-auto  rounded-2xl md:rounded-2xl px-6 md:px-12 py-6 md:py-12 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Text */}
        <h2 className="text-white text-2xl md:text-3xl font-semibold lg:w-1/2">
          Your Next Step Awaits!
        </h2>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row w-full justify-center md:justify-end items-center gap-3">
          
          {/* Outline Button */}
          <button className="px-5 py-2.5 w-full md:w-auto text-sm md:text-base border border-white text-white rounded-xl hover:bg-white hover:text-primary transition">
            Download Brochure
          </button>

          {/* Green Button */}
          <button
            onClick={() => setIsRegisterOpen(true)}
           className="px-5 py-2.5 w-full md:w-auto text-sm md:text-base bg-[#A6D65B] text-[#313896] rounded-xl font-medium hover:opacity-90 transition"
          
          >
            talk with advisor
          </button>

        </div>
      </div>

    </div>
  );
};

export default MainFooter;