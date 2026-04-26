import {Mic,Users,Mail} from 'lucide-react';

const CardAcademyEvents = () => {
  return (
    <>
        {/* Cards  */}
            <div className="my-10 grid grid-cols-1 md:mx-0 mx-2  md:grid-cols-2 gap-6">
                {/* <Card /> */}
                <div className="bg-white rounded-2xl h-98 border overflow-hidden shadow-2xl border-gray-300   ">
                  <div className="w-full h-68 bg-gray-300 mb-4">
                      {/* You can replace this with an actual image or icon */}
                  </div>
                    <div className="px-4">
                    <h3 className="text-lg text-left font-semibold mb-2">Card Title 1</h3>
                    <p className="text-gray-600 text-left">This is a description for card 1.</p>
                    </div>
                </div>
                {/* <Card /> */}
               <div className="bg-white rounded-2xl h-98 border overflow-hidden shadow-2xl border-gray-300  ">
                  <div className="w-full h-68 bg-gray-300 mb-4">
                      {/* You can replace this with an actual image or icon */}
                  </div>
                    <div className="px-4">
                    <h3 className="text-lg text-left font-semibold mb-2">Card Title 1</h3>
                    <p className="text-gray-600 text-left">This is a description for card 1.</p>
                    </div>
                </div>
            </div>
            {/* Cards */}
            <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:mx-0 mx-2  md:grid-cols-3 gap-6">
                {/* <Card /> */}
                  <div className="bg-white rounded-2xl h-54 py-6 px-4 border overflow-hidden shadow-2xl border-gray-300 relative">
                    <span className="absolute w-14 h-14 top-8 left-8 text-sm border border-primary  text-white  rounded-full">
                      <Mic className='text-white text-center bg-primary
                       rounded-full w-11 h-11  translate-x-1 p-2 translate-y-1' />
                    </span>
                      <div className="max-2xl text-end relative mb-4 mt-4 flex  items-start justify-end flex-col">
                    <h3 className="text-lg text-left font-semibold mb-2 mt-16 px-4">Card Title 1</h3>
                    <p className="text-gray-600 text-left px-4 max-w-2xl">This is a description for card 1.
                      This is a description for card 1.
                    </p>
                      </div>
                  </div>
               
                {/* <Card /> */}
                  <div className="bg-white rounded-2xl h-54 py-6 px-4 border overflow-hidden shadow-2xl border-gray-300 relative">
                    <span className="absolute w-14 h-14 top-8 left-8 text-sm border border-primary  text-white  rounded-full">
                      <Users className='text-white text-center bg-primary
                       rounded-full w-11 h-11  translate-x-1 p-2 translate-y-1' />
                    </span>
                      <div className="max-2xl text-end relative mb-4 mt-4 flex  items-start justify-end flex-col">
                    <h3 className="text-lg text-left font-semibold mb-2 mt-16 px-4">Card Title 1</h3>
                    <p className="text-gray-600 text-left px-4 max-w-2xl">This is a description for card 1.
                      This is a description for card 1.
                    </p>
                      </div>
                  </div>
               
                {/* <Card /> */}
                  <div className="bg-white rounded-2xl h-54 py-6 px-4 border overflow-hidden shadow-2xl border-gray-300 relative">
                    <span className="absolute w-14 h-14 top-8 left-8 text-sm border border-primary  text-white  rounded-full">
                      <Mail className='text-white text-center bg-primary
                       rounded-full w-11 h-11  translate-x-1 p-2 translate-y-1' />
                    </span>
                      <div className="max-2xl text-end relative mb-4 mt-4 flex  items-start justify-end flex-col">
                    <h3 className="text-lg text-left font-semibold mb-2 mt-16 px-4">Card Title 1</h3>
                    <p className="text-gray-600 text-left px-4 max-w-2xl">This is a description for card 1.
                      This is a description for card 1.
                    </p>
                      </div>
                  </div>
               
                </div>

                {/*  */}
                <div className="my-10 grid grid-cols-2 md:mx-0 mx-2 sm:grid-cols-3  md:grid-cols-4 gap-6">
                {/* <Card /> */}
                    <div className="bg-gray-200 rounded-2xl h-24 py-1 px-2 border overflow-hidden shadow-2xl border-gray-300 relative">
                        <div className="max-2xl text-end relative  flex  items-center justify-center ">
                            <span className="  text-sm border border-primary  text-white  rounded-full">
                                
                                </span>

                          <div>
                        <h3 className="text-lg text-left font-semibold mb-2 mt-4 px-4">Card Title 1</h3>
                        <p className="text-lg text-left font-semibold mb-2 mt-4 px-4">Card Title 1</p>
                        </div>      
                        </div>

                </div>  
                </div>
    </>
  )
}

export default CardAcademyEvents