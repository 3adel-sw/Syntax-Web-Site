
import { getB2bWhyUs } from "../../services/b2b/b2bService";
import { useEffect, useState } from "react";
import ImgChooseTraining from "../../../public/images/ChooseCardTraining.webp";
import { useTranslation } from "react-i18next";



const ChooseCardTraining = () => {
  const { t } = useTranslation();

  const [getB2bWhyUsData, setgetB2bWhyUsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getB2bWhyUs()
      .then((response) => setgetB2bWhyUsData(response.data.b2b_why_us))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>{t("common.loading")}</div>;
  if (error) return <div>{error}</div>;
  if (!getB2bWhyUsData) return null;

  return (
    <div className="mt-5 bg-[#111111] rounded-4xl md:py-24 md:px-18 py-6 px-4   h-fit w-full">
      {/* Header */}
      <div className="text-center  mb-10">
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-4">
          {t("b2b.whyChooseTraining")}
        </h1>
        <p className="text-[#888888] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {t("b2b.whyChooseTrainingDescription")}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center gap-12 md:w-[90%] w-full mx-auto">
        {/* Left: Image Panel */}
        <div className="flex-1 w-full md:w-fit rounded-2xl p-6 min-h-[340px] flex items-center justify-center relative overflow-hidden">
        
          {/* Image */}
          <div className="relative z-10 w-full ">
            <img
            loading="lazy"
              src={ImgChooseTraining}
              alt={t("b2b.trainingPreviewAlt")}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Right: Feature List */}
        <div className="flex flex-col gap-6 flex-1">
          {getB2bWhyUsData.map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              {/* Number Badge */}
              <div className="w-10 h-10 flex-shrink-0 mt-0.5 rounded-full bg-[#141E2A]  flex items-center justify-center text-xs text-[#1877F2]">
                {item.id}
              </div>
              {/* Text */}
              <div>
                <h3 className="text-white md:text-2xl text-left font-semibold text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-[#888888] text-xs md:text-sm text-left leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseCardTraining;
