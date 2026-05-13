import { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const toStr = (val) => {
  if (!val) return '';
  if (typeof val === 'object') return val?.name || val?.title || '';
  return val;
};

// Default FAQs in case course data doesn't have any
const Questions = ({ faqs = [] }) => {
  const { t } = useTranslation();
  const defaultFaqs = [
    { question: t("questions.default.courseAbout.question"), answer: t("questions.default.courseAbout.answer") },
    { question: t("questions.default.priorExperience.question"), answer: t("questions.default.priorExperience.answer") },
    { question: t("questions.default.certificate.question"), answer: t("questions.default.certificate.answer") },
  ];
  const data = faqs.length ? faqs : defaultFaqs; // Use provided FAQs or fallback to default
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex items-center md:flex-row flex-col justify-between md:my-14 my-12">
      <div className="w-full md:w-1/3 text-left flex flex-col items-start">
        <h2 className="md:text-4xl text-2xl font-bold text-gray-900 text-left">{t("questions.title")}</h2>
        <p className="text-gray-500 mt-4 md:mx-4 mx-0 text-left md:text-sm text-[14px]">
          {t("questions.subtitle")}
        </p>
        <button className="flex my-4 items-center justify-center md:text-lg text-sm text-white bg-black border border-gray-200 rounded-2xl md:px-8 w-42 h-14 hover:bg-gray-200">
          {t("contact.title")}
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
                {toStr(item.question) || t("questions.questionNumber", { number: index + 1 })}
              </h3>
              <div className="w-10 h-10 flex items-center text-xl justify-end text-black font-semibold">
                {openIndex === index ? <FaAngleUp /> : <FaAngleDown />}
              </div>
            </div>
            {openIndex === index && (
              <div className="p-4 text-sm text-gray-500 border-t text-left border-gray-200">
                {toStr(item.answer) || t("questions.noAnswer")}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
