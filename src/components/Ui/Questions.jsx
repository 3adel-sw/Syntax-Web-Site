import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
const Questions = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const data = [
    {
      title: "Public or private event listings",
      content:
        "You can choose whether you want your event to be searchable and open for anyone to find, or whether you want to keep it private just for those invited."
    },
    {
      title: "Unlimited events",
      content:
        "Yes. We have a dedicated team-building space designed to foster collaboration and creativity. "
    },
    {
      title: "Usability Testing",
      content:
        "Advanced techniques for usability testing and user feedback."
    }
  ];
   const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

    return (
        <div className="flex items-center md:flex-row flex-col justify-between md:my-14 my-12">

            <div className="w-full md:w-1/3 text-left flex flex-col items-start ">
                <h2 className="md:text-4xl text-2xl font-bold text-gray-900 text-left">Questions & answer</h2>
                <p className="text-gray-500 mt-4 md:mx-4 mx-0 text-left md:text-sm text-[14px]  ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                <div className="flex justify-center  items-center mt-4">
                    <button className="flex my-4 items-center justify-center md:text-lg text-sm text-white bg-black border border-gray-200 rounded-2xl md:px-8 w-42 h-14 hover:bg-gray-200">
          Contact us
        </button>
                </div>
            </div>
         <div className="md:w-3/5 w-full space-y-3">
      {data.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div
            onClick={() => toggle(index)}
            className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50 transition"
          >
            <h3 className="text-sm font-medium text-gray-800 ">
              {item.title}
            </h3>

            <div className="w-10 h-10 flex items-center  text-xl justify-end rounded-xl  text-black font-semibold">
              {openIndex === index ? <FaAngleUp /> : <FaAngleDown />}
            </div>
          </div>

          {/* Content */}
          {openIndex === index && (
            <div className="p-4 text-sm text-gray-500 border-t text-left border-gray-200">
              {item.content}
            </div>
          )}
        </div>
      ))}
        </div>
        </div>
    );
};
export default Questions;  