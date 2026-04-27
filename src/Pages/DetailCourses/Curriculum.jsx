import { useState } from "react";
const Curriculum = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const data = [
    {
      title: "UX Fundamentals & Design Research",
      content:
        "Learn the basics of UX and research methods to understand user needs and behavior."
    },
    {
      title: "User Experience Strategy",
      content:
        "Yes. We have a dedicated team-building space designed to foster collaboration and creativity. However, we can also work with you to explore on-site options if that better suits your needs.Yes. We have a dedicated team-building space designed to foster collaboration and creativity. However, we can also work with you to explore on-site options if that better suits your needs. Yes. We have a dedicated team-building space designed to foster collaboration and creativity. However, we can also work with you to explore on-site options if that better suits your needs."
    },
    {
      title: "Usability Testing",
      content:
        "Advanced techniques for usability testing and user feedback."
    },
    {
      title: "Design Systems",
      content:
        "Learn how to build scalable and reusable design systems,Learn how to build scalable and reusable design systems."
    }
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
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
            <h3 className="text-sm font-medium text-gray-800">
              {item.title}
            </h3>

            <div className="w-10 h-10 flex items-center text-xl justify-center rounded-xl bg-primary text-white font-semibold">
              {openIndex === index ? "-" : "+"}
            </div>
          </div>

          {/* Content */}
          {openIndex === index && (
            <div className="p-4 text-sm text-gray-500 border-t border-gray-200">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Curriculum;
