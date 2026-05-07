
import weight from "../../assets/weight.svg";
import penTool from "../../assets/penTool.svg";
import ranking from "../../assets/ranking.svg";
import lampcharge from "../../assets/lampcharge.svg";
import emojihappy from "../../assets/emojihappy.svg";
import cup from "../../assets/cup.svg";
//   img —    API
const IMG_Map = {
  grow: { img: cup, bg: "bg-[#5B49E9]", color: "text-indigo-600" },
  scrappy: { img: weight, bg: "bg-[#33CFFF]", color: "text-cyan-600" },
  hardwork: { img: ranking, bg: "bg-[#40C4AA]", color: "text-teal-600" },
  details: { img: penTool, bg: "bg-[#FFBE4C]", color: "text-amber-600" },
  hard: { img: lampcharge, bg: "bg-[#ED8296]", color: "text-rose-600" },
  fun: { img: emojihappy, bg: "bg-[#1A1B25]", color: "text-white" },
};

// API
const coreValuesData = [
  {
    id: 1,
    iconKey: "grow",
    title: "Grow 1% Everyday",
    description:
      "By focusing on daily growth, we foster a culture of learning, adaptability, and innovation ensuring that we are always moving forward improving...",
  },
  {
    id: 2,
    iconKey: "scrappy",
    title: "Be Scrappy",
    description:
      "We believe in being agile, adaptable, and always ready to tackle challenges head-on.",
  },
  {
    id: 3,
    iconKey: "hardwork",
    title: "Embrace Hard Work",
    description:
      "We believe that dedication and perseverance are key to overcoming obstacles and reaching new heights.",
  },
  {
    id: 4,
    iconKey: "details",
    title: "Be in The Details",
    description:
      "Focusing on the finer points, we ensure high-quality results and exceed expectations.",
  },
  {
    id: 5,
    iconKey: "hard",
    title: "Do Hard Things",
    description:
      "This value drives us to achieve the extraordinary and continuously grow as individuals and as a team.",
  },
  {
    id: 6,
    iconKey: "fun",
    title: "Be Fun to Work",
    description:
      "We believe that a happy team is a productive team, and we strive to make our work environment enjoyable for everyone.",
  },
];
// CoreValues.jsx
// useEffect(() => {
//   fetch("https://your-api.com/api/core-values")
//     .then((r) => r.json())
//     .then(setCoreValuesData);
// }, []);

const CoreValues = () => {
  return (
    <section className="w-full my-12 md:my-25 text-left">
      {/* Badge */}
      <span className="md:text-base text-sm mb-3 md:mb-5 font-semibold text-[#00895C] tracking-wide">
        Values
      </span>

      {/* Title */}
      <h2 className="text-2xl md:text-5xl font-semibold text-gray-900 md:my-5 my-3">
        Core Values
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:my-16 my-10">
        {coreValuesData.map((value) => {
          const iconConfig = IMG_Map[value.iconKey] ?? {
            img: weight,
            bg: "bg-gray-100",
            color: "text-gray-600",
          };

          return (
            <div key={value.id} className="flex flex-col gap-3 md:p-8 p-5
             bg-white hover:scale-105 transition-all
             duration-300 ease-in-out hover:shadow-md 
               rounded-3xl border border-[#DFE1E7]">
              {/* Icon Box */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconConfig.bg}`}
              >
               <img src={iconConfig.img} alt={value.title} />
              </div>

              {/* Text */}
              <h3 className="md:text-2xl text-xl font-semibold text-gray-900">{value.title}</h3>
              <p className="md:text-base text-sm text-gray-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default CoreValues;