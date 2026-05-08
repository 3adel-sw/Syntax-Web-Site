import { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const toStr = (val) => {
  if (!val) return '';
  if (typeof val === 'object') return val?.name || val?.title || '';
  return val;
};

// Default FAQs in case course data doesn't have any
const defaultFaqs = [
  { question: "What is this course about?", answer: "This course covers UX/UI design fundamentals." },
  { question: "Do I need prior experience?", answer: "No, this course is for beginners." },
  { question: "Will I get a certificate?", answer: "Yes, upon completion you will receive a certificate." },
];

const Questions = ({ faqs = [] }) => {
  const data = faqs.length ? faqs : defaultFaqs; // Use provided FAQs or fallback to default
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex items-center md:flex-row flex-col justify-between md:my-14 my-12">
      <div className="w-full md:w-1/3 text-left flex flex-col items-start">
        <h2 className="md:text-4xl text-2xl font-bold text-gray-900 text-left">Questions & answer</h2>
        <p className="text-gray-500 mt-4 md:mx-4 mx-0 text-left md:text-sm text-[14px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
        <button className="flex my-4 items-center justify-center md:text-lg text-sm text-white bg-black border border-gray-200 rounded-2xl md:px-8 w-42 h-14 hover:bg-gray-200">
          Contact us
        </button>
      </div>

      <div className="md:w-3/5 w-full space-y-3">
        {data.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
            <div
              onClick={() => toggle(index)}
              className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50 transition"
            >
              <h3 className="text-sm font-medium text-gray-800">
                {toStr(item.question) || `Question ${index + 1}`}
              </h3>
              <div className="w-10 h-10 flex items-center text-xl justify-end text-black font-semibold">
                {openIndex === index ? <FaAngleUp /> : <FaAngleDown />}
              </div>
            </div>
            {openIndex === index && (
              <div className="p-4 text-sm text-gray-500 border-t text-left border-gray-200">
                {toStr(item.answer) || 'No answer available.'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;