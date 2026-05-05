import {Mic,Users,Mail,Layers} from 'lucide-react';
import meetupImage from "../../assets/meetup.svg";
import Invitemembers from "../../assets/Invitemembers.svg";
import { useState } from 'react';
import { useNavigate } from 'react-router';


const CardAcademyEvents = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      icon: <Mic className='text-white text-center bg-primary rounded-full w-11 h-11 p-3' />,
      title: 'Podcast',
      description: 'Streamline and automate your payments to vendors and suppliers'
    },
    {
      icon: <Users className='text-white text-center bg-primary rounded-full w-11 h-11 p-3' />,
      title: 'Our Community',
      description: 'Simplify your purchasing process with efficient and integrated solutions'
    },
    {
      icon: <Mail className='text-white text-center bg-primary rounded-full w-11 h-11 p-3' />,
      title: 'Newsletter',
      description: 'Automate repetitive tasks to enhance accuracy and efficiency in accounting'
    }
  ];
  const handleCardEventClick = () => {
       navigate('/events'); // Navigate to the events page
    // if (thumb) {
    //   const blogUrl = `/blogs/${id}`;

    //   window.open(blogUrl, '_blank'); // Open in new tab
    // }
  };
  const handleCardAcademyClick = () => {
       navigate('/courses'); // Navigate to the events page
    // if (thumb) {
    //   const blogUrl = `/blogs/${id}`;

    //   window.open(blogUrl, '_blank'); // Open in new tab
    // }
  };

  return (
    <div className='md:my-10 my-12'>
        {/* Cards Our Academy & Meetups & Events  */}
            <div className="my-12  grid grid-cols-1 md:mx-0 mx-2  md:grid-cols-2 gap-6">
                {/* <Card Our Academy/> */}
                <div
                onClick={handleCardAcademyClick}
                className="bg-white pb-12  cursor-pointer rounded-2xl h-[29rem] md:h-[28rem] border overflow-hidden hover:shadow-sm [#E5E5E5] border-gray-300   ">
                  <div className="w-full h-80 bg-gray-300 mb-4">
                     <img 
                     loading="eager"
                     fetchPriority="high"
                     src={Invitemembers}
                      className='w-full h-full object-cover' alt="meet" /> 
                      {/* You can replace this with an actual image or icon */}
                  </div>
                    <div className="px-4">
                    <h3 className="text-2xl text-left font-semibold mb-2">Our Academy</h3>
                    <p className="text-gray-600 text-left ">Automated expense management software built into your corporate card, reimbursements, and more</p>
                    </div>
                </div>
                {/* <Card Meetups & Events/> */}
               <div
               onClick={handleCardEventClick}
               className="bg-white pb-12 cursor-pointer  rounded-2xl h-[29rem] md:h-[28rem] border overflow-hidden hover:shadow-sm border-gray-300  ">
                  <div className="w-full h-80 bg-gray-300 mb-4">
                     <img 
                     loading="eager"
                     fetchPriority="high"
                     src={meetupImage}
                      className='w-full h-full object-cover' alt="invite" /> 
                      {/* You can replace this with an actual image or icon */}
                  </div>
                    <div className="px-4">
                    <h3 className="text-2xl text-left font-semibold mb-2">Meetups & Events</h3>
                    <p className="text-gray-600 text-left">Effortlessly handle cross-border payments and currency conversions with our global corporate card</p>
                    </div>
                </div>
            </div>





            {/* Cards Podcast, Interviews, News */}
            {/* Desktop Grid */}
            <div className="my-12 hidden md:grid grid-cols-1 sm:grid-cols-2 md:mx-0 mx-2 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl h-54 py-6 px-4 border overflow-hidden hover:shadow-sm border-gray-300 relative">
                   <span className="absolute flex items-center justify-center w-14 h-14 top-8 left-8 text-sm border border-primary text-white rounded-full">
                      <Mic className='text-white text-center bg-primary rounded-full w-11 h-11 p-3' />
                    </span>
                      <div className="max-2xl text-end relative mb-4 mt-4 flex items-start justify-end flex-col">
                    <h3 className="text-lg text-left font-semibold mb-2 mt-16 px-4">Podcast</h3>
                    <p className="text-gray-600 text-left px-4 max-w-2xl">Streamline and automate your payments to vendors and suppliers
                    </p>
                      </div>
                  </div>
                <div className="bg-white rounded-2xl h-54 py-6 px-4 border overflow-hidden hover:shadow-sm border-gray-300 relative">
                     <span className="absolute flex items-center justify-center w-14 h-14 top-8 left-8 text-sm border border-primary text-white rounded-full">
                      <Users className='text-white text-center bg-primary rounded-full w-11 h-11 p-3' />
                    </span>
                      <div className="max-2xl text-end relative mb-4 mt-4 flex items-start justify-end flex-col">
                    <h3 className="text-lg text-left font-semibold mb-2 mt-16 px-4">Our Community</h3>
                    <p className="text-gray-600 text-left px-4 max-w-2xl">Simplify your purchasing process with efficient and integrated solutions
                    </p>
                      </div>
                  </div>
                <div className="bg-white rounded-2xl h-54 py-6 px-4 border overflow-hidden hover:shadow-sm border-gray-300 relative">
                    <span className="absolute flex items-center justify-center w-14 h-14 top-8 left-8 text-sm border border-primary text-white rounded-full">
                      <Mail className='text-white text-center bg-primary rounded-full w-11 h-11 p-3' />
                    </span>
                      <div className="max-2xl text-end relative mb-4 mt-4 flex items-start justify-end flex-col">
                    <h3 className="text-lg text-left font-semibold mb-2 mt-16 px-4">Newsletter</h3>
                    <p className="text-gray-600 text-left px-4 max-w-2xl">Automate repetitive tasks to enhance accuracy and efficiency in accounting
                    </p>
                      </div>
                  </div>
            </div>
        


           {/* Mobile Slider */}
<div className="my-12 md:hidden mx-2 ">
  <div className="relative">
    <div className="overflow-hidden rounded-2xl">
      {/* Wrapper  */}
      <div
        className="flex"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {slides.map((slide, index) => (
         
          <div
            key={index}
            className="min-w-full bg-white py-6 px-4 border shadow border-gray-300 rounded-2xl relative"
          >
            <span className="absolute flex items-center justify-center w-14 h-14 top-8 left-8 text-sm border border-primary text-white rounded-full">
              {slide.icon}
            </span>
            <div className="text-end relative mb-4 mt-4 flex items-start justify-end flex-col">
              <h3 className="text-lg text-left font-semibold mb-2 mt-16 px-4">{slide.title}</h3>
              <p className="text-gray-600 text-left px-4 max-w-2xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Navigation Dots */}
    <div className="flex justify-center gap-2 mt-4">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-2 h-2 rounded-full transition-all ${
            index === currentSlide ? 'bg-primary w-6' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  </div>
</div>


                {/* Layers */}
               <div className="md:my-20  sm:my-12 my-14 grid grid-cols-2 md:mx-0 mx-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
  {[
    { label: "Soft Skills" ,student:"+120 Students"},
    { label: "UI Design" ,student:"+80 Students"},
    { label: "UX Design" ,student:"+60 Students"},
    { label: "UX Principles" ,student:"+40 Students"},
  ].map((item) => (
    <div
      key={item.label}
      className="bg-[#F6F7FB] rounded-2xl py-3 md:py-4 px-3 md:px-4  relative"
    >
      <div className="flex flex-row items-start sm:items-center gap-2">
        <Layers className="text-primary bg-[#EDEFF9] rounded-full w-10 h-10 md:w-14 md:h-14 p-2 md:p-3 shrink-1" />
        <div>
          <h3 className="text-sm md:text-base text-left font-semibold text-gray-900">
            {item.label}
          </h3>
          <p className="text-xs md:text-sm text-left font-medium text-gray-500">
            {item.student}
          </p>
        </div>
      </div>
    </div>
  ))}

</div>



                
    </div>
  )
}

export default CardAcademyEvents