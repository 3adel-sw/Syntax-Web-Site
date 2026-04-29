import {Mic,Users,Mail ,Layers} from 'lucide-react';
import meetupImage from "../../assets/meetup.svg";
import Invitemembers from "../../assets/Invitemembers.svg";

const CardAcademyEvents = () => {
  return (
    <>
        {/* Cards Our Academy & Meetups & Events  */}
       
            <div className="my-10  grid grid-cols-1 md:mx-0 mx-2  md:grid-cols-2 gap-6">
                {/* <Card Our Academy/> */}
                <div className="bg-white pb-12  rounded-2xl h-[29rem] md:h-[28rem] border overflow-hidden shadow-[#E5E5E5] border-gray-300   ">
                  <div className="w-full h-80 bg-gray-300 mb-4">
                     <img src={Invitemembers} className='w-full h-full object-cover' alt="meet" /> 
                      {/* You can replace this with an actual image or icon */}
                  </div>
                    <div className="px-4">
                    <h3 className="text-2xl text-left font-semibold mb-2">Our Academy</h3>
                    <p className="text-gray-600 text-left ">Automated expense management software built into your corporate card, reimbursements, and more</p>
                    </div>
                </div>
                {/* <Card Meetups & Events/> */}
               <div className="bg-white pb-12  rounded-2xl h-[29rem] md:h-[28rem] border overflow-hidden shadow-sm border-gray-300  ">
                  <div className="w-full h-80 bg-gray-300 mb-4">
                     <img src={meetupImage} className='w-full h-full object-cover' alt="invite" /> 
                      {/* You can replace this with an actual image or icon */}
                  </div>
                    <div className="px-4">
                    <h3 className="text-2xl text-left font-semibold mb-2">Meetups & Events</h3>
                    <p className="text-gray-600 text-left">Effortlessly handle cross-border payments and currency conversions with our global corporate card</p>
                    </div>
                </div>
            </div>
            {/* Cards Podcast, Interviews, News */}
            <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:mx-0 mx-2  md:grid-cols-3 gap-6">
                {/* <Card  Podcast/> */}
                  <div className="bg-white rounded-2xl  h-54 py-6  px-4 border overflow-hidden shadow-sm border-gray-300 relative">
                   <span className="absolute flex items-center justify-center w-14 h-14 top-8 left-8 text-sm border border-primary  text-white  rounded-full">
                      <Mic className='text-white text-center bg-primary
                       rounded-full w-11 h-11 p-3' />
                    </span>
                      <div className="max-2xl text-end relative mb-4 mt-4 flex  items-start justify-end flex-col">
                    <h3 className="text-lg text-left font-semibold mb-2 mt-16 px-4">Podcast</h3>
                    <p className="text-gray-600 text-left px-4  max-w-2xl">Streamline and automate your payments to vendors and suppliers
                      
                    </p>
                      </div>
                  </div>
               
                {/* <Card Our Community/> */}
                  <div className="bg-white rounded-2xl h-54 py-6 px-4 border overflow-hidden shadow-sm border-gray-300 relative">
                     <span className="absolute flex items-center justify-center w-14 h-14 top-8 left-8 text-sm border border-primary  text-white  rounded-full">
                      <Users className='text-white text-center bg-primary
                       rounded-full w-11 h-11 p-3' />
                    </span>
                      <div className="max-2xl text-end relative mb-4 mt-4 flex  items-start justify-end flex-col">
                    <h3 className="text-lg text-left font-semibold mb-2 mt-16 px-4">Our Community</h3>
                    <p className="text-gray-600 text-left px-4 max-w-2xl">Simplify your purchasing process with efficient and integrated solutions
                    </p>
                      </div>
                  </div>
               
                {/* <Card Newsletter/> */}
                  <div className="bg-white rounded-2xl h-54 py-6 px-4 border overflow-hidden shadow-sm border-gray-300 relative">
                    <span className="absolute flex items-center justify-center w-14 h-14 top-8 left-8 text-sm border border-primary  text-white  rounded-full">
                      <Mail className='text-white text-center bg-primary
                       rounded-full w-11 h-11 p-3' />
                    </span>
                      <div className="max-2xl text-end relative mb-4  mt-4 flex  items-start justify-end flex-col">
                    <h3 className="text-lg text-left font-semibold mb-2 mt-16 px-4">Newsletter</h3>
                    <p className="text-gray-600 text-left px-4 max-w-2xl">Automate repetitive tasks to enhance accuracy and efficiency in accounting
                    </p>
                      </div>
                  </div>
               
                </div>

                {/* Layers */}
                <div className="md:my-20 sm:my-12 my-10 grid grid-cols-1 md:mx-0 mx-2 sm:grid-cols-3  md:grid-cols-4 gap-6">
                {/* <Card Soft Skills/> */}
                    <div className="bg-[#F6F7FB] rounded-2xl h-24 py-4 px-4 border overflow-hidden  border-gray-300 relative">
                        <div className="flex items-center justify-start ">
                            <span className="  text-sm   text-white  rounded-full">
                                <Layers className='text-primary text-lg text-center bg-[#EDEFF9]   
                       rounded-full w-14 h-14 p-3' />
                                </span> 
                          <div >
                        <h3 className="text-base text-left font-semibold text-gray-900 px-4">Soft Skills</h3>
                        <p className="text-sm text-left font-medium  px-4 text-gray-500">+120 Students</p>
                        </div>      
                        </div>
                </div>  
                {/* <Card UI Design /> */}
                    <div className="bg-[#F6F7FB] rounded-2xl h-24 py-4 px-4 border overflow-hidden  border-gray-300 relative">
                        <div className="flex items-center justify-start ">
                            <span className="  text-sm   text-white  rounded-full">
                                <Layers className='text-primary text-lg text-center bg-[#EDEFF9]   
                       rounded-full w-14 h-14 p-3' />
                                </span> 
                          <div >
                        <h3 className="text-base text-left font-semibold text-gray-900 px-4">UI Design</h3>
                        <p className="text-sm text-left font-medium  px-4 text-gray-500">+120 Students</p>
                        </div>      
                        </div>
                </div>  
                {/* <Card /> */}
                    <div className="bg-[#F6F7FB] rounded-2xl h-24 py-4 px-4 border overflow-hidden  border-gray-300 relative">
                        <div className="flex items-center justify-start ">
                            <span className="  text-sm   text-white  rounded-full">
                                <Layers className='text-primary text-lg text-center bg-[#EDEFF9]   
                       rounded-full w-14 h-14 p-3' />
                                </span> 
                          <div >
                        <h3 className="text-base text-left font-semibold text-gray-900 px-4">UX Design</h3>
                        <p className="text-sm text-left font-medium  px-4 text-gray-500">+120 Students</p>
                        </div>      
                        </div>
                </div>  
                {/* <Card UX Principles /> */}
                    <div className="bg-[#F6F7FB] rounded-2xl h-24 py-4 px-4 border overflow-hidden  border-gray-300 relative">
                        <div className="flex items-center justify-start ">
                            <span className="  text-sm   text-white  rounded-full">
                                <Layers className='text-primary text-lg text-center bg-[#EDEFF9]   
                       rounded-full w-14 h-14 p-3' />
                                </span> 
                          <div >
                        <h3 className="text-base text-left font-semibold text-gray-900 px-4">UX Principles</h3>
                        <p className="text-sm text-left font-medium  px-4 text-gray-500">+120 Students</p>
                        </div>      
                        </div>
                </div>  
                </div>
    </>
  )
}

export default CardAcademyEvents