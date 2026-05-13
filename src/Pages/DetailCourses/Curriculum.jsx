import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";


const Curriculum = ({ course }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const data = useMemo(() => {
    if (!course) return [];
    
    // Try multiple data structure patterns from API response
    const curriculumData =
      course?.main_topics ||
      course?.curriculum ||
      course?.syllabus ||
      course?.modules ||
      course?.chapters ||
      [];

    // Ensure data is always an array
    return Array.isArray(curriculumData) ? curriculumData : [];
  }, [course]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        {t("courseDetails.noCurriculum")}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div
          key={`curriculum-${index}`}
          className="border border-gray-200 rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div
            onClick={() => toggle(index)}
            className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50 transition"
          >
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">
                {item.name || item.title || t("courseDetails.topicNumber", { number: index + 1 })}
              </h3>
              {item.duration && (
                <p className="text-xs text-gray-500 mt-1">
                  {t("courses.duration")}: {new Date(item.created_at).toLocaleDateString()}
                </p>
              )}
            </div>

            <div className="w-10 h-10 flex items-center text-xl justify-center rounded-xl bg-primary text-white font-semibold shrink-1">
              {openIndex === index ? "-" : "+"}
            </div>
          </div>

          {/* Content */}
          {openIndex === index && (
            <div className="p-3.5 text-sm text-gray-600 border-t border-gray-200 bg-gray-50">
              <p
              dangerouslySetInnerHTML={{ __html: item.description || t("common.notFound") }}
              >
              </p>
              
              {/* Additional Details */}
              {item.lessons && Array.isArray(item.lessons) && item.lessons.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 mb-2">{t("courseDetails.lessons")}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {item.lessons.map((lesson, idx) => (
                      <li key={idx} className="text-gray-600">
                        {lesson.name || lesson.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.objectives && Array.isArray(item.objectives) && item.objectives.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 mb-2">{t("courseDetails.learningObjectives")}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {item.objectives.map((obj, idx) => (
                      <li key={idx} className="text-gray-600">
                        {obj.name || obj.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Curriculum;
