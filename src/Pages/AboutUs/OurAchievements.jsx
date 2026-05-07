// import { useState, useEffect } from "react";

// const OurAchievements = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("https://your-api.com/api/achievements")
//       .then((r) => r.json())
//       .then(setData);
//   }, []);

//   if (!data) return null;

//   return ( 
    
//    );
// };
const achievementsData = {
  badge: "Our Achievements",
  title: "Transforming Lives Through Education: Our Impact Creative Industry",
  stats: [
    { id: 1, value: "12+", unit: "Years", label: "Education Experience" },
    { id: 2, value: "50K+", unit: "Students", label: "Enrolled" },
    { id: 3, value: "50K+", unit: "Hours", label: "Workshops Hours" },
  ],
};

const OurAchievements = () => {
  return (
     <section className="w-full my-12 md:my-25 text-left">
      <div
        className="rounded-3xl px-8 py-10 flex flex-col gap-8"
        
      >
        {/* Badge */}
        <span className="md:text-xl  text-lg  font-semibold text-[#B71C41]  tracking-wide">
          {achievementsData.badge}
        </span>

        {/* Title */}
        <h2 className="md:text-5xl  text-2xl  font-semibold text-gray-900 leading-tight max-w-3xl -mt-3">
          {achievementsData.title}
        </h2>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
          {achievementsData.stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#F6F7FB] overflow-hidden rounded-2xl p-4 md:py-8 md:px-4 flex flex-col gap-4 items-start"
            >
              <p className="lg:text-3xl sm:text-2xl text-xl font-semibold text-gray-900">
                {stat.value}
                <span className="lg:text-5xl md:text-3xl sm:text-2xl text-xl font-semibold">{stat.unit}</span>
              </p>
              <p className="lg:text-lg md:text-md sm:text-sm text-sm font-medium text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAchievements;