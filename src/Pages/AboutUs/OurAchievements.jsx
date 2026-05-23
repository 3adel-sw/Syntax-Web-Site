import {getHistories}  from "../../services/about/aboutService" 
import { useState, useEffect } from "react";
const OurAchievements = () => {
  const [historiesData, setHistoriesData] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
      const response = await getHistories();
setHistoriesData(response.data.histories);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };
    fetchAchievements();
  }, []);
  if (!historiesData) {
    return null;
  }
if (historiesData.length === 0) {
  return null;
}

  return (
     <section className="w-full my-12 md:my-25 text-start">
      <div
        className="rounded-3xl px-8 py-10 flex flex-col gap-8"
        
      >
        {/* Badge */}
        <span className="md:text-xl  text-lg  font-semibold text-[#B71C41]  tracking-wide">
          {historiesData.badge || " Our Achievements"}
        </span>

        {/* Title */}
        <h2 className="md:text-5xl  text-2xl  font-semibold text-gray-900 leading-tight max-w-3xl -mt-3">
          {historiesData.title || " Transforming Lives Through Education: Our Impact Creative Industry"}
        </h2>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
          {historiesData.map((item) => (
            <div
              key={item.id}
              className="bg-[#F6F7FB] overflow-hidden rounded-2xl p-4 md:py-8 md:px-4 flex flex-col gap-4 items-start"
            >
              <p className="lg:text-3xl sm:text-2xl text-xl font-semibold text-gray-900">
               
                <span className="lg:text-5xl md:text-3xl sm:text-2xl text-xl font-semibold">{item.year}</span>
                 {item.title}
              </p>
              <p className="lg:text-lg md:text-md sm:text-sm text-sm font-medium text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAchievements;